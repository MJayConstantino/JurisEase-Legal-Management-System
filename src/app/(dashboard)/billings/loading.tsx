import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function BillingsLoading() {
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Revenue Header Skeleton */}
      <div className="mt-0">
        <div className="bg-[#1B1E4B] dark:bg-gray-800 text-white p-2 md:p-4 rounded-none md:rounded-t-md overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div>
                <div className="text-lg md:text-xl font-semibold mb-1">
                  <Skeleton className="h-5 md:h-6 w-28 md:w-36 mb-1 md:mb-2 bg-indigo-300/20" />
                </div>
                <div className="truncate w-64">
                  <Skeleton className="h-3 md:h-4 w-48 md:w-64 mb-1 md:mb-2 bg-indigo-300/20" />
                </div>
                <div className="text-base md:text-lg text-indigo-200 dark:text-indigo-100 mt-0">
                  <Skeleton className="h-3 md:h-4 w-52 md:w-60 mb-1 md:mb-2 bg-indigo-300/20" />
                </div>
              </div>
              <div className="flex items-baseline overflow-hidden text-xl md:text-2xl font-semibold mt-0.5 md:mt-1">
                <Skeleton className="h-6 md:h-8 w-32 md:w-44 mt-0.5 md:mt-1 bg-indigo-300/20" />
              </div>
            </div>
            <Skeleton className="h-7 w-7 md:h-8 md:w-8 rounded-md bg-indigo-300/20" />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="border dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 mt-4">
        {/* Header */}
        <div className="p-3 md:p-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
          {/* Mobile View - Header */}
          <div className="flex flex-col lg:hidden">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <Skeleton className="h-8 md:h-9 w-24 md:w-28" />
              <Skeleton className="h-8 md:h-9 w-8 md:w-9 rounded-md" />
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>

          {/* Desktop View - Header */}
          <div className="hidden lg:flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-shrink-0">
              <Skeleton className="h-9 w-24" />
            </div>

            <div className="flex items-center space-x-2 justify-center flex-grow">
              <Skeleton className="h-5 w-24" />
              <div className="w-[250px]">
                <Skeleton className="h-9 w-full" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-700 rounded-md p-1 flex-shrink-0">
              <Skeleton className="h-9 w-[65px] px-3 rounded-md" />
              <Skeleton className="h-9 w-[65px] px-3 rounded-md" />
              <Skeleton className="h-9 w-[65px] px-3 rounded-md" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto w-full">
            <Table className="table-auto">
              <TableHeader className="bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-700 sticky top-0 z-10">
                <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-900 text-sm">
                  <TableHead className="w-[20%] text-center">
                    <div className="font-semibold flex items-center justify-center w-full whitespace-nowrap">
                      <Skeleton className="h-4 md:h-5 w-16 md:w-20" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[25%] text-center">
                    <div className="font-semibold flex items-center justify-center w-full whitespace-nowrap">
                      <Skeleton className="h-4 md:h-5 w-20 md:w-24" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[15%] text-center">
                    <div className="font-semibold flex items-center justify-center w-full whitespace-nowrap">
                      <Skeleton className="h-4 md:h-5 w-14 md:w-16" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[15%] text-center">
                    <div className="font-semibold flex items-center justify-center w-full whitespace-nowrap">
                      <Skeleton className="h-4 md:h-5 w-14 md:w-16" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[10%] text-center font-medium">
                    <Skeleton className="h-4 md:h-5 w-10 md:w-12 mx-auto" />
                  </TableHead>
                  <TableHead className="w-[10%] text-center">
                    <div className="font-semibold flex items-center justify-center w-full whitespace-nowrap">
                      <Skeleton className="h-4 md:h-5 w-16 md:w-20" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[5%] text-center">
                    <Skeleton className="h-4 md:h-5 w-7 md:w-8 mx-auto" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow
                    key={index}
                    className="text-xs md:text-sm dark:border-gray-700"
                  >
                    <TableCell className="font-medium max-w-[200px] truncate text-center w-[20%]">
                      <div className="mx-auto max-w-full truncate">
                        <Skeleton className="h-3 md:h-4 w-24 md:w-32 rounded-lg mx-auto" />
                      </div>
                    </TableCell>

                    <TableCell className="max-w-[200px] truncate text-center w-[25%]">
                      <div className="mx-auto max-w-full truncate">
                        <Skeleton className="h-3 md:h-4 w-28 md:w-40 rounded-lg mx-auto" />
                      </div>
                    </TableCell>

                    <TableCell className="overflow-hidden text-center w-[15%]">
                      <div className="mx-auto max-w-full truncate">
                        <Skeleton className="h-3 md:h-4 w-16 md:w-20 rounded-lg mx-auto" />
                      </div>
                    </TableCell>

                    <TableCell className="max-w-[200px] truncate text-center w-[15%]">
                      <div className="mx-auto max-w-full truncate">
                        <Skeleton className="h-3 md:h-4 w-20 md:w-28 rounded-lg mx-auto" />
                      </div>
                    </TableCell>

                    <TableCell className="text-center w-[10%]">
                      <div className="flex justify-center">
                        <Skeleton className="px-2 py-1 md:px-3 md:py-1 h-5 md:h-6 w-12 md:w-16 rounded-full" />
                      </div>
                    </TableCell>

                    <TableCell className="text-center w-[10%]">
                      <div className="mx-auto max-w-full truncate">
                        <Skeleton className="h-3 md:h-4 w-16 md:w-24 rounded-lg mx-auto" />
                      </div>
                    </TableCell>

                    <TableCell className="text-center w-[5%]">
                      <div className="flex justify-center">
                        <Skeleton className="h-7 w-7 md:h-9 md:w-9 rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className="h-[56px] block md:hidden"></div>{" "}
    </div>
  );
}

// Default export for Next.js loading page
export default function Loading() {
  return <BillingsLoading />;
}
