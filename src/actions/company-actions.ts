"use server";

import redis from "@/lib/redis";
import { toSlug } from "@/lib/utils";
import prisma from "@/prisma";
import { cache } from "react";

export const getCompanyImg = cache(async (name: string) => {
  return prisma.problemCompany.findFirst({
    where: {
      slug: name,
    },
    include: {
      _count: {
        select: {
          problems: true,
        },
      },
    },
  });
});

export const getCompanies = cache(
  async (currentPage: number, searchValue?: string) => {

    const key = `companies:${currentPage}:${searchValue || ""}`;
    const cachedData = await redis.get(key);
    if (cachedData) {
      return cachedData
    }

    const companies = await prisma.problemCompany.findMany({
      where: searchValue
        ? {
            name: {
              contains: searchValue,
              mode: "insensitive",
            },
          }
        : undefined,
      orderBy: { problems: { _count: "desc" } },
      include: { _count: { select: { problems: true } } },
      take: 20,
      skip: (currentPage - 1) * 20,
    });
    await redis.set(key, JSON.stringify(companies), {
      ex: 60 * 60,
    });
    return companies;
  },
);


export const getCompanyPlatformProblems = cache(
  async (
    slug: string,
    platform: Platform,
    userId?: string,
  ): Promise<ProblemTopicResult[]> => {
    const key = `company:${slug}:${platform}:${userId ?? "guest"}`;

    // Check cache
    const cachedData = await redis.get<ProblemTopicResult[]>(key);
    if (cachedData) {
      return cachedData;
    }

    const problemFilter = {
      companyTags: { some: { slug } },
      platform,
    } as const;

    const solvedFilter = userId
      ? {
          ...problemFilter,
          UserProgress: {
            some: {
              userId,
              isCompleted: true,
            },
          },
        }
      : null;

    const [totalResults, solvedResults] = await Promise.all([
      prisma.problemTopic.findMany({
        where: {
          problems: {
            some: problemFilter,
          },
        },
        orderBy: {
          problems: {
            _count: "desc",
          },
        },
        select: {
          name: true,
          _count: {
            select: {
              problems: {
                where: problemFilter,
              },
            },
          },
        },
      }),

      solvedFilter
        ? prisma.problemTopic.findMany({
            where: {
              problems: {
                some: solvedFilter,
              },
            },
            select: {
              name: true,
              _count: {
                select: {
                  problems: {
                    where: solvedFilter,
                  },
                },
              },
            },
          })
        : Promise.resolve([]),
    ]);

    const solvedMap = new Map(
      solvedResults.map(({ name, _count }) => [name!, _count.problems]),
    );

    const result: ProblemTopicResult[] = totalResults.map(
      ({ name, _count }) => ({
        name: name!,
        count: _count.problems,
        ...(userId && {
          solvedCount: solvedMap.get(name!) ?? 0,
        }),
      }),
    );

    // Store in Redis
    await redis.set(key, result, {
      ex: 60 * 60, // 1 hour
    });

    return result;
  },
);
export async function getCompanyTopicProgress(
  userId: string,
  companySlug: string,
  platform: Platform,
) {
  return prisma.userProgress.findMany({
    where: {
      userId: userId,
      problem: {
        companyTags: { some: { slug: companySlug } },
        platform: platform,
      },
    },
  });
}

// Cygnuxxs Area

export const getCompanyTopicWiseProblems = cache(
  async (
    companySlug: string,
    topicSlug: string,
    platform: Platform,
    userId?: string,
  ) => {

    const key = `company:${companySlug}:topic:${topicSlug}:platform:${platform}:user:${userId ?? "guest"}`;
    const cachedResults = await redis.get(key);
    if (cachedResults) {
      return cachedResults
    }

    const results = await prisma.problem.findMany({
      where: {
        companyTags: { some: { slug: companySlug } },
        topicTags: { some: { name: topicSlug } },
        platform,
      },
      select: {
        title: true,
        slug: true,
        platform: true,
        topicTags: { select: { name: true } },
        companyTags: { select: { name: true } },
        UserProgress: {
          where: { userId: userId, isCompleted: true },
          select: { isCompleted: true, userId: true },
          take: 1,
        },
        difficulty: true,
        mainTopics: { select: { name: true } },
        url: true,
      },
      orderBy: { likes: "desc" }, // Add ordering to ensure consistent pagination
    });

    const total = await prisma.problem.count({
      where: {
        companyTags: { some: { slug: companySlug } },
        topicTags: { some: { name: topicSlug } },
        platform,
      },
    });

    const problems = results.map((problem) => ({
      ...problem,
      topicTags: problem.topicTags.filter(
        (t): t is { name: string } => t.name !== null,
      ),
      UserProgress: problem.UserProgress[0] || null,
    }));

    const solvedProblems = userId
      ? await prisma.userProgress.count({
          where: {
            userId: userId,
            isCompleted: true,
            problem: {
              platform,
              companyTags: { some: { slug: companySlug } },
              topicTags: { some: { name: topicSlug } },
            },
          },
        })
      : 0;

    // Count problems by difficulty
    const difficultyCount = results.reduce(
      (acc, problem) => {
        const status = problem.UserProgress[0]?.isCompleted
          ? "solved"
          : "unsolved";
        acc[problem.difficulty][status] += 1;
        return acc;
      },
      {
        SCHOOL: { solved: 0, unsolved: 0 },
        BASIC: { solved: 0, unsolved: 0 },
        EASY: { solved: 0, unsolved: 0 },
        MEDIUM: { solved: 0, unsolved: 0 },
        HARD: { solved: 0, unsolved: 0 },
      },
    );

    await redis.set(key, {
      totalProblems: total,
      solvedProblems,
      problems,
      difficultyCount,
    }, {
      ex: 60 * 60, // Cache for 1 hour
    });

    return {
      totalProblems: total,
      solvedProblems,
      problems,
      difficultyCount,
    };
  },
);
