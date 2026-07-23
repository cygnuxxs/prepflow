"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma";
import { cache } from "react";
import { InternType, JobType, UserRole } from "../../generated/prisma/client";
import { z } from "zod";
import redis from "@/lib/redis";

// --- Schemas for Validation ---

const JobSchema = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  jobtype: z.nativeEnum(JobType),
  location: z.string().min(1),
  salary: z.string().default(""),
  url: z.string().url(),
  experience: z.string().default(""),
  logo: z.string().default(""),
  about: z.string().default(""),
  responsibilities: z.string().transform((str) => str.split("\n").filter(Boolean)),
  requirements: z.string().transform((str) => str.split("\n").filter(Boolean)),
  skills: z.string().transform((str) => str.split(",").map((s) => s.trim()).filter(Boolean)),
  benefits: z.string().transform((str) => str.split("\n").filter(Boolean)),
});

const InternshipSchema = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  internType: z.nativeEnum(InternType),
  location: z.string().min(1),
  stipend: z.string().default(""),
  url: z.string().url(),
  logo: z.string().default(""),
  about: z.string().default(""),
  requirements: z.string().transform((str) => str.split("\n").filter(Boolean)),
  skills: z.string().transform((str) => str.split(",").map((s) => s.trim()).filter(Boolean)),
  benefits: z.string().transform((str) => str.split("\n").filter(Boolean)),
  duration: z.string().min(1),
});

// --- Actions ---

export async function changeToAdmin(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) return { error: "Email is required" };

  try {
    // TODO: Add Auth Check here (e.g. session.user.role !== 'SUPER_ADMIN')

    // We fetch first to determine the toggle state
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true }, // Optimization: Select only what is needed
    });

    if (!user) {
      return { error: "User not found." };
    }

    const newRole: UserRole = user.role === "USER" ? "ADMIN" : "USER";

    await prisma.user.update({
      where: { email },
      data: { role: newRole },
    });

    revalidatePath("/admin");
    return { success: `Role changed to ${newRole} successfully!` };
  } catch (error) {
    console.error("Error changing role:", error);
    return { error: "Failed to change role." };
  }
}

// NOTE: Keep cache() here as this is data fetching, not a mutation
export const getUserProgressQuestions = cache(async (userId: string, company: string) => {
  if (!userId) return [];

  try {
    return await prisma.userProgress.findMany({
      where: {
        userId,
        problem: {
          companyTags: {
            some: { slug: company },
          },
        },
      },
      include: {
        problem: {
          select: { topicTags: true },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return [];
  }
});

// REMOVED cache(): This is a write operation
export const jobPosting = async (prevState: unknown, formData: FormData) => {
  // Convert FormData to object for Zod
  const rawData = Object.fromEntries(formData.entries());

  // Validate
  const parsed = JobSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: "Validation failed", issues: parsed.error.flatten() };
  }

  try {
    await prisma.jobs.create({
      data: parsed.data,
    });
    revalidatePath("dashboard/post-job");
    return { success: "Job posted successfully" };
  } catch (error) {
    console.error("Job posting error:", error);
    return { error: "Database error" };
  }
};

// REMOVED cache(): This is a write operation
export const internshipPosting = async (prevState: unknown, formData: FormData) => {
  const rawData = Object.fromEntries(formData.entries());

  const parsed = InternshipSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: "Validation failed", issues: parsed.error.flatten() };
  }

  try {
    await prisma.internships.create({
      data: parsed.data,
    });
    revalidatePath("dashboard/post-internship");
    return { success: "Internship posted successfully" };
  } catch (error) {
    console.error("Internship posting error:", error);
    return { error: "Database error" };
  }
};

type CarouselCategoryResult = {
  name: string;
  sheet: { name: string };
  problems: Array<{
    title: string;
    url: string;
    topicTags: { name: string | null }[];
    slug: string;
    difficulty: string;
    platform: string;
    companyTags: { name: string; _count: unknown }[];
    UserProgress: { isCompleted: boolean } | null;
  }>;
  totalProblemsCount: number;
  solvedProblemsCount: number;
};

export const getCarouselCategoryData = cache(
  async (carouselSlug: string, categorySlug: string, userId?: string): Promise<CarouselCategoryResult | null> => {
    const key = `carousel:${carouselSlug}:category:${categorySlug}:user:${userId ?? "guest"}`;
    const cachedData = await redis.get<CarouselCategoryResult>(key);
    if (cachedData) {
      return cachedData;
    }
    const results = await prisma.sheetCategory.findFirst({
      where: {
        slug: categorySlug,
        sheet: { slug: carouselSlug }
      },
      include: {
        sheet: { select: { name: true } },
        problems: {
          orderBy: { difficulty: "asc" },
          select: {
            title: true,
            url: true,
            topicTags: {select : {name : true} },
            slug: true,
            difficulty: true,
            platform: true,
            companyTags: {
              select: { name: true, _count: true },
            },
            // Sub-query logic remains efficient for single user context
            UserProgress: userId ? {
              where: { userId, isCompleted: true },
              select: { isCompleted: true }, // Don't need userId back
              take: 1,
            } : false, // Do not query if no userId
          },
        },
      },
    });

    if (!results) return null;

    // Transformation logic
    let solvedProblemsCount = 0;

    const formattedProblems = results.problems.map((problem: typeof results.problems[number]) => {
      // UserProgress will be an array of 0 or 1 items due to `take: 1`
      const isCompleted = problem.UserProgress && problem.UserProgress.length > 0;

      if (isCompleted) solvedProblemsCount++;

      // Return cleaner object structure (flattening UserProgress array to boolean/obj)
      return {
        ...problem,
        UserProgress: isCompleted ? { isCompleted: true } : null,
      };
    });

    const result: CarouselCategoryResult = {
      name: results.name,
      sheet: results.sheet,
      problems: formattedProblems,
      totalProblemsCount: formattedProblems.length,
      solvedProblemsCount,
    };

    await redis.set(key, result, {
      ex: 60 * 60, // Cache for 1 hour
    });

    return result;
  }
);

export const submitUserProblem = async (
  prevState: { isCompleted?: boolean; path: string; status?: string; message?: string },
  formData: FormData
) => {
  const userId = formData.get("userid") as string;
  const problemSlug = formData.get("problemslug") as string;
  const path = prevState.path || "/";

  if (!userId || !problemSlug) {
    return { ...prevState, status: "Error", message: "Missing required fields" };
  }

  try {
    // 1. Get Problem ID (Lightweight query)
    const problem = await prisma.problem.findUnique({
      where: { slug: problemSlug },
      select: { id: true, title: true },
    });

    if (!problem) {
      return { ...prevState, status: "Error", message: "Problem not found." };
    }

    // 2. Transaction: Upsert logic manually to handle the toggle
    // We use a transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      const existingProgress = await tx.userProgress.findFirst({
        where: { userId, problemId: problem.id },
      });

      let isCompletedNow = true;

      if (!existingProgress) {
        // Create new
        await tx.userProgress.create({
          data: { userId, problemId: problem.id, isCompleted: true },
        });
      } else {
        // Toggle
        isCompletedNow = !existingProgress.isCompleted;
        await tx.userProgress.update({
          where: { id: existingProgress.id },
          data: { isCompleted: isCompletedNow },
        });
      }
      return isCompletedNow;
    });

    revalidatePath(path);

    return {
      isCompleted: result,
      status: "Success",
      path,
      message: result
        ? `Yay! You've completed ${problem.title}.`
        : `You've unmarked ${problem.title}.`,
    };

  } catch (err) {
    console.error("Submit Problem Error:", err);
    return {
      isCompleted: prevState.isCompleted,
      status: "Error",
      path,
      message: "Internal Server Error.",
    };
  }
};