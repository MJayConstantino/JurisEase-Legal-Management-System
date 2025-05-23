import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Named export for reuse in other components
export function BillingsLoading() {
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Revenue Header Skeleton */}
      <div className="bg-[#1B1E4B] text-white p-2 md:p-4 rounded-none md:rounded-t-md overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <Skeleton className="h-6 w-36 mb-2 bg-indigo-300/20" />
            <Skeleton className="h-4 w-64 mb-2 bg-indigo-300/20" />
            <Skeleton className="h-8 w-44 mt-1 bg-indigo-300/20" />
          </div>
          <Skeleton className="h-8 w-8 rounded-md bg-indigo-300/20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow">
        {/* Header */}
        <div className="p-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
          {/* Mobile View - Header */}
          <div className="flex flex-col lg:hidden">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
            <div className="flex">
              <Skeleton className="h-5 w-32 md:w-64 mr-3" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>

          {/* Desktop View - Header */}
          <div className="hidden lg:flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-shrink-0">
              <Skeleton className="h-9 w-32" />
            </div>

            <div className="flex items-center space-x-2 justify-center flex-grow">
              <Skeleton className="h-5 w-32" />
              <div className="w-[250px]">
                <Skeleton className="h-9 w-full" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-[220px] bg-gray-100 dark:bg-gray-700 rounded-md p-1">
              <Skeleton className="h-9 w-[65px] px-3 rounded-md" />
              <Skeleton className="h-9 w-[65px] px-3 rounded-md" />
              <Skeleton className="h-9 w-[65px] px-3 rounded-md" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader className="bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-700">
                <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <TableHead className="w-[20%]">
                    <Button
                      variant="ghost"
                      className="font-semibold flex w-full cursor-default"
                      disabled
                    >
                      <Skeleton className="h-5 w-20" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[25%]">
                    <Button
                      variant="ghost"
                      className="font-semibold flex w-full cursor-default"
                      disabled
                    >
                      <Skeleton className="h-5 w-24" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[15%]">
                    <Button
                      variant="ghost"
                      className="font-semibold flex w-full cursor-default"
                      disabled
                    >
                      <Skeleton className="h-5 w-16" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[15%]">
                    <Button
                      variant="ghost"
                      className="font-semibold flex w-full cursor-default"
                      disabled
                    >
                      <Skeleton className="h-5 w-16" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[10%]">
                    <Skeleton className="h-5 w-12 mx-auto" />
                  </TableHead>
                  <TableHead className="w-[10%]">
                    <Button
                      variant="ghost"
                      className="font-semibold flex w-full cursor-default"
                      disabled
                    >
                      <Skeleton className="h-5 w-20" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[5%] text-right">
                    <Skeleton className="h-5 w-8 ml-auto" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <TableCell className="pl-5 font-medium max-w-[200px]">
                      <Skeleton className="w-32 h-4 rounded-lg" />
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <Skeleton className="w-40 h-4 rounded-lg" />
                    </TableCell>
                    <TableCell className="overflow-hidden">
                      <Skeleton className="w-20 h-4 rounded-lg" />
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <Skeleton className="w-28 h-4 rounded-lg" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-16 h-6 rounded-full mx-auto" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-24 h-4 rounded-lg" />
                    </TableCell>
                    <TableCell className="text-right pr-5">
                      <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default export for Next.js loading page
export default function Loading() {
  return <BillingsLoading />;
}
