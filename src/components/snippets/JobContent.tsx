import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Calendar, IndianRupee, MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import Experience from "./Experience";
import Jobtype from "./Jobtype";
import SalaryRange from "./Salaryrange";
import { getJobs, getJobsCount } from "@/actions/job-actions";
import { cookies } from "next/headers";
import NotFound from "@/app/(user)/jobs/not-found";
import Image from "next/image";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";


export async function JobContent({ experenceParams, searchParams }: { experenceParams: IsearchParams, searchParams?: { page: string } }) {
    const getCookies = await cookies();
    const searchValue = getCookies.get('searchValue')?.value;
    const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
    const totalItems = await getJobsCount();
    const totalPages = Math.ceil(totalItems / 10);
    const jobsData = await getJobs(experenceParams, currentPage, searchValue);
    return (
        <div className="w-full h-full p-2 sm:p-4 space-y-4">
            <Separator />
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                <div className=" w-full h-fit lg:w-[300px] flex-shrink-0 space-y-4 sm:space-y-6 bg-background/50 p-3 sm:p-4 rounded-lg border">
                    <form action={async (formData: FormData) => {
                        'use server'
                        const searchValue = formData.get('search') as string;
                        const getCookies = await cookies();
                        getCookies.set('searchValue', searchValue, { maxAge: 5 });

                    }} className="relative w-full">
                        <Input name="search" className="pr-10 bg-background" placeholder="Search jobs..." />
                        <svg className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </form>

                    <ScrollArea className="h-fit pb-4">
                        <div className="space-y-6 pr-4">
                            <Experience />
                            <Separator />
                            <Jobtype />
                            <Separator />
                            <SalaryRange />
                        </div>
                    </ScrollArea>
                </div>

                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        {jobsData.length != 0 ?
                            jobsData.map((job, index) => (
                                <div key={index} className="group relative bg-background rounded-lg border hover:shadow-md transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative p-3 sm:p-4">
                                        {/* Company Logo and Title */}
                                        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                                            <div className="w-10 dark:bg-foreground h-10 sm:w-12 sm:h-12 rounded-lg border bg-background p-1.5 flex-shrink-0">
                                                <Image className="w-full h-full object-fill rounded-md"
                                                    width={100}
                                                    height={100} src={job.logo} alt={`${job.company} logo`} />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                                                    {job.title}
                                                </h3>
                                                <p className="text-sm text-primary truncate">
                                                    {job.company}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Job Details with smaller text on mobile */}
                                        <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="truncate">{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span className="truncate">{job.experience}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <IndianRupee className="w-3.5 h-3.5" />
                                                <span className="truncate">{job.salary}</span>
                                            </div>
                                        </div>

                                        {/* Skills with adjusted spacing */}
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                            {job.skills.slice(0, 3).map((skill, i) => (
                                                <Badge key={i} variant="secondary">{skill}</Badge>
                                            ))}
                                            {job.skills.length > 3 && (
                                                <Badge variant="outline">+{job.skills.length - 3} more</Badge>
                                            )}
                                        </div>

                                        {/* Footer with adjusted padding */}
                                        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t">
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(job.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                            <Button size="sm" variant="default" asChild>
                                                <Link href={`/jobs/${job.slugUrl}`}>View Details</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )) : <NotFound />}
                    </div>
                </div>
            </div>
            {jobsData.length > 0 ? <Pagination className="w-full mx-auto flex justify-end">
                <PaginationContent className="w-full justify-between gap-3 max-w-[55.7rem] ">
                    <PaginationItem>
                        <Button
                            variant="outline"
                            className="group aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            aria-disabled={currentPage <= 1}
                            asChild
                        >
                            <Link href={currentPage <= 1 ? '#' : `?page=${currentPage - 1}`}>
                                <ArrowLeftIcon
                                    className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
                                    size={16}
                                    aria-hidden="true"
                                />
                                Previous
                            </Link>
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            variant="outline"
                            className="group aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            aria-disabled={currentPage >= totalPages}
                            asChild
                        >
                            <Link href={currentPage >= totalPages ? '#' : `?page=${currentPage + 1}`}>
                                Next
                                <ArrowRightIcon
                                    className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                                    size={16}
                                    aria-hidden="true"
                                />
                            </Link>
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination> : null}
        </div>
    )
}