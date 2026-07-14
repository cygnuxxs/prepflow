"use server";

import prisma from "@/prisma";
import { JobType } from "../../generated/prisma/client";
import { cache } from "react";
import redis from "@/lib/redis";

export const getJobsCount = cache(async () => {
    const key = `jobs:count`;
    const cachedCount = await redis.get(key);
    if (cachedCount) {
        return cachedCount
    }
    const count = await prisma.jobs.count();
    await redis.set(key, count, {
        ex: 60 * 60, // Cache for 1 hour
    });
    return count;
});

export const getInternshipsCount = cache(async () => {
    const key = `internships:count`;
    const cachedCount = await redis.get(key);
    if (cachedCount) {
        return cachedCount
    }
    const count = await prisma.internships.count();
    await redis.set(key, count, {
        ex: 60 * 60, // Cache for 1 hour
    });
    return count;
})

const ITEMS_PER_PAGE = 10;

export const getJobs = cache(async (searchParams: IsearchParams, currentPage: number, searchValue?: string) => {
    const params = await searchParams;
    const experienceArray = params.experience ? (Array.isArray(params.experience) ? params.experience : [params.experience]) : [];
    const jobTypeArray = params.jobType ? (Array.isArray(params.jobType) ? params.jobType : [params.jobType]) : [];
    const salaryRangeArray = params.salaryRange ? (Array.isArray(params.salaryRange) ? params.salaryRange : [params.salaryRange]) : [];
    const key = `jobs:${currentPage}:${searchValue || ""}:${experienceArray.join(",")}:${jobTypeArray.join(",")}:${salaryRangeArray.join(",")}`;
    const cachedData = await redis.get(key);
    if (cachedData) {
        return cachedData
    }
     
    const where: any = {};
    if (searchValue) {
        where.OR = [
            { title: { contains: searchValue, mode: 'insensitive' } },
            { company: { contains: searchValue, mode: 'insensitive' } },

        ];
    }
    if (jobTypeArray.length > 0) {
        where.jobtype = {
            in: jobTypeArray.map(type => {
                if (type === "Full-time") return JobType.Full_time;
                if (type === "Part-time") return JobType.Part_time;
                if (type === "Contract") return JobType.Contract;
                if (type === "Freelance") return JobType.Remote;
                return null;
            }).filter(Boolean)
        };
    }

    const allJobs = await prisma.jobs.findMany({
        where: where,
        take: ITEMS_PER_PAGE,
        skip: (currentPage - 1) * ITEMS_PER_PAGE,
        orderBy: {
            createdAt: 'desc'
        }
    });

    let filteredJobs = allJobs;
    if (experienceArray.length > 0) {
        filteredJobs = filteredJobs.filter((job) => {
            const jobExp = parseExperience(job.experience);
            if (!jobExp) return false;

            return experienceArray.some((expRange) => {
                if (expRange.toLowerCase().includes('fresher')) {
                    return jobExp.min === 0 || jobExp.max === 0;
                }
                const [minStr, maxStr] = expRange.split('-');
                const rangeMin = parseInt(minStr);
                const rangeMax = maxStr ? parseInt(maxStr) : rangeMin + 3; // Default range of 3 years

                return jobExp.min <= rangeMax && jobExp.max >= rangeMin;
            });
        });
    }
    if (salaryRangeArray.length > 0) {
        filteredJobs = filteredJobs.filter((job) => {
            const jobSalary = parseSalary(job.salary);
            if (!jobSalary) return false;

            return salaryRangeArray.some((range) => {
                if (range === "25 LPA+") {
                    return jobSalary.min >= 25;
                }

                const [minStr, maxStr] = range.split('-');
                const rangeMin = parseInt(minStr);
                const rangeMax = parseInt(maxStr);

                return jobSalary.min >= rangeMin && jobSalary.max <= rangeMax;
            });
        });
    }
    await redis.set(key, filteredJobs, {
        ex: 60 * 60, // Cache for 1 hour
    });
    return filteredJobs;
});

const parseExperience = (expString: string) => {
    if (!expString) return null;

    // Handle "Fresher" case
    if (expString.toLowerCase().includes('fresher')) {
        return { min: 0, max: 0 };
    }

    // Extract numbers from string
    const numbers = expString.match(/\d+/g);
    if (!numbers) return null;

    if (expString.includes('+')) {
        // Handle "X+" format
        const min = parseInt(numbers[0]);
        return { min, max: min + 5 }; // Assume a range of 5 years for "X+" format
    }
    const min = parseInt(numbers[0]);
    const max = numbers.length > 1 ? parseInt(numbers[1]) : min;
    return { min, max };
};

const parseSalary = (salaryString: string) => {
    if (!salaryString) return null;
    const numbers = salaryString.match(/\d+/g);
    if (!numbers) return null;

    if (salaryString.includes('+')) {
        const min = parseInt(numbers[0]);
        return { min, max: min };
    }

    const min = parseInt(numbers[0]);
    const max = numbers.length > 1 ? parseInt(numbers[1]) : min;
    return { min, max };
}

export const getSingleJob = cache(async (id: string) => {
    const result = await prisma.jobs.findFirst({
        where: {
            id: id,
        },
    });
    return result;
});

export const getSingleIntern = cache(async (id: string) => {
    const results = await prisma.internships.findFirst({
        where: {
            id: id,
        },
    });
    return results;
});

export const getInternships = cache(async (searchParams: IsearchParams, searchValue?: string) => {
    const key = `internships:${searchValue || ""}:${JSON.stringify(searchParams)}`;
    const cachedData = await redis.get(key);
    if (cachedData) {
        return cachedData
    }
    if (!searchParams) {
        return [];
    }

    const workTypeArray = searchParams.workType
        ? (Array.isArray(searchParams.workType) ? searchParams.workType : [searchParams.workType])
        : [];
    const stipendArray = searchParams.stipend
        ? (Array.isArray(searchParams.stipend) ? searchParams.stipend : [searchParams.stipend])
        : [];
    const durationArray = searchParams.duration
        ? (Array.isArray(searchParams.duration) ? searchParams.duration : [searchParams.duration])
        : [];

     
    const where: any = {};

    if (searchValue) {
        where.OR = [
            { title: { contains: searchValue, mode: 'insensitive' } },
            { company: { contains: searchValue, mode: 'insensitive' } }
        ];
    }

    const allInternships = await prisma.internships.findMany({
        where: where
    });

    let filteredInternships = allInternships;

    // Filter by workType
    if (workTypeArray.length > 0) {
        filteredInternships = filteredInternships.filter((internship) =>
            workTypeArray.some(type => internship.internType.toLowerCase() === type.toLowerCase())
        );
    }

    // Filter by stipend
    if (stipendArray.length > 0) {
        filteredInternships = filteredInternships.filter((internship) => {
            const stipendValue = parseInt(internship.stipend.replace(/[^0-9]/g, '')) || 0;
            return stipendArray.some(range => {
                if (range === 'Unpaid') return stipendValue === 0;
                if (range === 'Less than 2k/-') return stipendValue < 2000;
                if (range === '2k-5k/-') return stipendValue >= 2000 && stipendValue <= 5000;
                if (range === '5k-10k/-') return stipendValue >= 5000 && stipendValue <= 10000;
                if (range === 'More than 10k/-') return stipendValue > 10000;
                return false;
            });
        });
    }

    // Filter by duration
    if (durationArray.length > 0) {
        filteredInternships = filteredInternships.filter((internship) => {
            const durationMonths = parseInt(internship.duration) || 0;
            return durationArray.some(range => {
                if (range === '1-3 months') return durationMonths >= 1 && durationMonths <= 3;
                if (range === '3-6 months') return durationMonths >= 3 && durationMonths <= 6;
                if (range === '6+ months') return durationMonths >= 6;
                return false;
            });
        });
    }

    await redis.set(key, filteredInternships, {
        ex: 60 * 60, // Cache for 1 hour
    });
    return filteredInternships;
});