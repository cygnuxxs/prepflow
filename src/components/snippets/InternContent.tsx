import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { DollarSign, MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import Duration from "./Duration";
import WorkType from "./WorkType";
import Stipand from "./Stipand";
import { getInternships, getInternshipsCount } from "@/actions/job-actions";
import { cookies } from "next/headers";
import NotFound from "@/app/(user)/jobs/not-found";
import Image from "next/image";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export async function InternContent({ experenceParams, searchParams }: { experenceParams: IsearchParams, searchParams?: { page: string } }) {
  const getCookies = await cookies();
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  const pages = await getInternshipsCount()
  const totalPages = Math.ceil(pages / 15);
  const searchValue = getCookies.get('searchValue')?.value;
  const internshipsData = await getInternships(experenceParams, searchValue)

  return (
    <div className="w-full h-full p-2 sm:p-4 space-y-4">
      <Separator />
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        <div className="w-full lg:w-[300px] h-full flex-shrink-0 space-y-4 sm:space-y-6 bg-background/50 p-3 sm:p-4 rounded-lg border sticky top-20">
          <form className="relative w-full" action={async (formData: FormData) => {
            'use server'
            const getCookies = await cookies();
            const searchValue = formData.get('search')?.toString() || '';
            getCookies.set('searchValue', searchValue);
          }}>
            <Input
              name="search"
              defaultValue={searchValue}
              className="pr-10 bg-background"
              placeholder="Search internships..."
            />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
          </form>

          <ScrollArea className="h-fit pb-4">
            <div className="space-y-6 pr-4">
              <Duration />

              <Separator />

              <WorkType />

              <Separator />
              <Stipand />
            </div>
          </ScrollArea>

        </div>

        {/* Internships Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {
              internshipsData.length != 0 ? internshipsData.map((internship, index) => (
                <div key={index} className="group relative bg-background rounded-lg border hover:shadow-md transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative p-3 sm:p-4">
                    {/* Company Logo and Title with adjusted sizes */}
                    <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-10 h-10 sm:w-12 dark:bg-foreground sm:h-12 rounded-lg border bg-background p-1.5 sm:p-2 flex-shrink-0">
                        <Image width={100} height={100} className="w-full h-full object-contain" src={internship.logo} alt={`${internship.company} logo`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                          {internship.title}
                        </h3>
                        <p className="text-sm text-primary truncate">
                          {internship.company}
                        </p>
                      </div>
                    </div>

                    {/* Internship Details with smaller text on mobile */}
                    <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{internship.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span className="truncate">{internship.stipend}</span>
                      </div>
                    </div>

                    {/* Footer with adjusted padding */}
                    <div className="flex items-center justify-between pt-2 sm:pt-3 border-t">
                      <span className="text-xs text-muted-foreground">
                        Posted {new Date(internship.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <Button size="sm" variant="default" asChild>
                        <Link href={`/jobs/internships/${internship.slugUrl}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>

              ))
                : <NotFound />
            }
          </div>
        </div>
      </div>
      {internshipsData.length > 0 ? <Pagination className="w-full mx-auto flex justify-end">
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
