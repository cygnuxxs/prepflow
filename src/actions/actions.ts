"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/prisma";
import { cache } from "react";
import { InternType, JobType } from "@prisma/client";

export async function changeToAdmin(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "User not found." };
    }

    const newRole = user.role === "USER" ? "ADMIN" : "USER";
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

export const getUserProgressQuuestions = cache(async (userId: string , company : string) => {
  if (!userId) {
    return []
  }
  const results = await prisma.userProgress.findMany({
    where: {
      userId,
      problem : {
        companyTags : {
          some : {
            slug : company
          }
        }
      }
    },
    include : {
      problem : {
        select : {
          topicSlugs : true
        }
      }
    }
  });
  return results;
});
export const jobPosting = cache(async (formData: FormData) => {
  const company = formData.get("company") as string;
  const title = formData.get("title") as string;
  const jobtype = formData.get("jobtype") as JobType;
  const location = formData.get("location") as string;
  const salary = formData.get("salary") as string;
  const url = formData.get("url") as string;
  const experience = formData.get("experience") as string;
  const logo = formData.get("logo") as string;
  const about = formData.get("about") as string;
  const responsibilities = (formData.get("responsibilities") as string).split(
    "\n"
  );
  const randomUrl = `${company}-${title}-${Math.random().toString(36).substring(7)}`.replaceAll(' ', '-');
  const requirements = (formData.get("requirements") as string).split("\n");
  const skills = (formData.get("skills") as string)
    .split(",")
    .map((skill) => skill.trim());
  const benefits = (formData.get("benefits") as string).split("\n");
  await prisma.jobs.create({
    data: {
      company,
      title,
      logo,
      location,
      salary,
      url,
      about,
      responsibilities,
      requirements,
      skills,
      benefits,
      jobtype,
      experience,
      slugUrl : randomUrl
    },
  });
  revalidatePath("dashboard/post-job");
});

export const internshipPosting = cache(async (formData: FormData) => {
  const company = formData.get("company") as string;
  const title = formData.get("title") as string;
  const internType = formData.get("internType") as InternType;
  const location = formData.get("location") as string;
  const stipend = formData.get("stipend") as string;
  const url = formData.get("url") as string;
  const logo = formData.get("logo") as string;
  const about = formData.get("about") as string;
  const requirements = (formData.get("requirements") as string).split("\n");
  const skills = (formData.get("skills") as string)
    .split(",")
    .map((skill) => skill.trim());
  const benefits = (formData.get("benefits") as string).split("\n");
  const duration = formData.get("duration") as string;
  const randomUrl = `${company}-${title}-${Math.random().toString(36).substring(7)}`.replaceAll(' ', '-');

  await prisma.internships.create({
    data: {
      company,
      title,
      internType,
      location,
      stipend,
      url,
      logo,
      about,
      requirements,
      skills,
      benefits,
      duration,
      slugUrl : randomUrl
    },
  });

  revalidatePath("dashboard/post-internship");
});

export const getCarouselCategoryData = cache(
  async (carouselSlug: string, categorySlug: string, userId?: string) => {
    const results = await prisma.sheetCategory.findFirst({
      where: { AND: [{ slug: categorySlug, sheet: { slug: carouselSlug } }] },
      include: {
        sheet: { select: { name: true } },
        problems: {
          select: {
            title: true,
            url : true,
            slug: true,
            difficulty: true,
            platform: true,
            UserProgress: {
              where: { userId: userId, isCompleted: true },
              select: { userId: true, isCompleted: true },
              take: 1, // Ensures we return a single object, not an array
            },
            companyTags: {
              select: { name: true, _count: true },
            },
          },
          orderBy: { difficulty: "asc" },
        },
      },
    });

    if (!results) {
      return null;
    }

    // Convert UserProgress from an array to an object for each problem
    const formattedProblems = results.problems.map((problem) => ({
      ...problem,
      UserProgress: problem.UserProgress[0] || null, // Convert array to single object or null
    }));

    const totalProblemsCount = formattedProblems.length;
    const solvedProblemsCount = formattedProblems.filter(
      (problem) => problem.UserProgress?.isCompleted
    ).length;

    return {
      ...results,
      problems: formattedProblems,
      totalProblemsCount,
      solvedProblemsCount,
    };
  }
);

export const submitUserProblem = async (prevState: { isCompleted?: boolean, path : string }, formData: FormData) => {
  try {
    const userId = formData.get("userid") as string;
    const problemSlug = formData.get("problemslug") as string;
    
    const problem = await prisma.problem.findUnique({
      where: { slug: problemSlug },
    });

    if (!problem) {
      return {
        isCompleted: prevState.isCompleted, // Keep previous state
        status: "Error",
        path : prevState.path,
        message: "Problem not found.",
      };
    }

    let userProgress = await prisma.userProgress.findFirst({
      where: {
        userId: userId,
        problemId: problem.id,
      },
    });

    let updatedIsCompleted: boolean;

    if (!userProgress) {
      userProgress = await prisma.userProgress.create({
        data: {
          userId: userId,
          problemId: problem.id,
          isCompleted: true,
        },
      });
      updatedIsCompleted = true;
    } else {
      updatedIsCompleted = !userProgress.isCompleted;
      userProgress = await prisma.userProgress.update({
        where: { id: userProgress.id },
        data: { isCompleted: updatedIsCompleted },
      });
    }

    return {
      isCompleted: updatedIsCompleted,
      status: "Success",
      path : prevState.path,
      message: updatedIsCompleted
        ? `Yay! You've completed ${problem.title}.`
        : `You've unmarked ${problem.title}.`,
    };
  } catch (err) {
    console.error(err);
    return {
      isCompleted: prevState.isCompleted, // Keep previous state in case of error
      status: "Error",
      path : prevState.path,
      message: "Internal Server Error.",
    };
  } finally {
    revalidatePath(prevState.path);
  }
};

