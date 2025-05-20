import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Keep the named export for reuse in other components
export function TasksLoading() {
  return (
    <div className="border w-full container mx-auto h-full flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg shadow mb-[56px] md:mb-0">
      {/* Header Skeleton */}
      <div className="px-4 py-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
        <div className="flex items-center justify-between lg:hidden mb-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>

        <div className="hidden lg:flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-9 w-28" />

          <div className="flex flex-wrap gap-2 bg-gray-100 shadow dark:bg-gray-700 rounded-md justify-center w-full lg:w-auto">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>

          <div className="grid grid-cols-2 gap bg-gray-100 shadow dark:bg-gray-700 rounded-md w-full sm:w-auto">
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-9 w-16" />
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="w-full dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-900">
              <TableRow>
                <TableHead className="w-10 md:w-12 text-center">
                  <Skeleton className="h-4 w-4" />
                </TableHead>
                <TableHead className="w-[25%] md:w-[30%]">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="w-[20%] text-center md:table-cell">
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead className="w-[15%]">
                  <Skeleton className="h-4 w-14" />
                </TableHead>
                <TableHead className="w-[15%] text-center">
                  <Skeleton className="h-4 w-14" />
                </TableHead>
                <TableHead className="w-[15%] text-center sm:table-cell">
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead className="w-[20%] text-right">
                  <Skeleton className="h-4 w-16 ml-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="p-1 md:p-2">
                    <Skeleton className="h-4 w-4 md:h-5 md:w-5 rounded-lg" />
                  </TableCell>
                  <TableCell className="p-1 md:p-2">
                    <Skeleton className="w-24 h-4 rounded-lg" />
                  </TableCell>
                  <TableCell className="p-1 md:p-2 w-32 md:w-40">
                    <Skeleton className="w-24 h-4 rounded-lg" />
                  </TableCell>
                  <TableCell className="p-1 md:p-2">
                    <Skeleton className="w-16 h-4 rounded-lg" />
                  </TableCell>
                  <TableCell className="p-1 md:p-2">
                    <Skeleton className="w-16 h-4 rounded-lg" />
                  </TableCell>
                  <TableCell className="p-1 md:p-2">
                    <Skeleton className="w-20 h-4 rounded-lg" />
                  </TableCell>
                  <TableCell className="p-1 md:p-2 text-right">
                    <Skeleton className="w-8 h-8 rounded-lg ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// Add a default export for Next.js loading page
export default function Loading() {
  return <TasksLoading />;
}
