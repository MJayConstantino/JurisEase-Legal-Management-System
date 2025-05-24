import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Store the last known task count (can be set by the data fetching components)
let lastKnownTaskCount = 8; // Default to 8 if no previous data

// Function to update the task count for future skeleton displays
export function setTaskLoadingCount(count: number) {
  lastKnownTaskCount = count > 0 ? count : 8; // Ensure we have at least one row
}

// Keep the named export for reuse in other components
export function TasksLoading({
  hideMatterColumn = false,
}: { hideMatterColumn?: boolean } = {}) {
  return (
    <div className="border dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 w-full h-auto flex flex-col overflow-hidden mb-0">
      {/* Header Skeleton that matches TasksHeader */}
      <div className="px-4 py-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
        <div className="flex items-center justify-between lg:hidden mb-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>

        <div className="hidden lg:flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-9 w-28" />

          <div className="flex flex-wrap gap-2 bg-gray-100 shadow dark:bg-gray-700 rounded-lg justify-center w-full lg:w-auto">
            <Skeleton className="h-9 w-24 px-3 rounded-md" />
            <Skeleton className="h-9 w-24 px-3 rounded-md" />
            <Skeleton className="h-9 w-24 px-3 rounded-md" />
            <Skeleton className="h-9 w-24 px-3 rounded-md" />
          </div>

          <div className="grid grid-cols-2 gap bg-gray-100 shadow dark:bg-gray-700 rounded-lg w-full sm:w-auto">
            <Skeleton className="h-9 w-16 px-3 rounded-md" />
            <Skeleton className="h-9 w-16 px-3 rounded-md" />
          </div>
        </div>
      </div>

      {/* Table Skeleton that matches TaskTable */}
      <div className="w-full dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
        <div className="relative w-full overflow-auto">
          <Table>
            {/* Match the header structure from TaskTableHeader */}
            <TableHeader className="bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-700">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50px] p-1 md:p-2 text-center">
                  <span className="sr-only">Checkbox</span>
                </TableHead>
                <TableHead
                  className={`p-1 md:p-2 ${
                    hideMatterColumn
                      ? "w-[40%] md:w-[45%]"
                      : "w-[25%] md:w-[30%]"
                  } text-center`}
                >
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>
                </TableHead>
                {!hideMatterColumn && (
                  <TableHead className="p-1 md:p-2 w-[20%] text-center md:table-cell">
                    <div className="flex justify-center">
                      <Skeleton className="h-4 w-20 rounded-md" />
                    </div>
                  </TableHead>
                )}
                <TableHead className="p-1 md:p-2 w-[15%] text-center">
                  <Skeleton className="h-4 w-16 mx-auto rounded-md" />
                </TableHead>
                <TableHead className="p-1 md:p-2 w-[15%] text-center">
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-16 rounded-md" />
                  </div>
                </TableHead>
                <TableHead className="p-1 md:p-2 w-[15%] text-center sm:table-cell">
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>
                </TableHead>
                <TableHead className="p-1 md:p-2 w-[50px] md:w-[80px] text-right">
                  <Skeleton className="h-4 w-10 ml-auto rounded-md" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Create skeleton rows that match TaskRow, using the dynamic count */}
              {Array.from({ length: lastKnownTaskCount }).map((_, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900 hover:cursor-pointer text-center"
                >
                  {/* Checkbox Cell */}
                  <TableCell className="w-[50px] p-1 md:p-2 text-center">
                    <div className="flex justify-center">
                      <Skeleton className="h-4 w-4 md:h-5 md:w-5 rounded-lg" />
                    </div>
                  </TableCell>

                  {/* Task Name Cell */}
                  <TableCell
                    className={`p-1 md:p-2 ${
                      hideMatterColumn
                        ? "w-[40%] md:w-[45%]"
                        : "w-[25%] md:w-[30%]"
                    }`}
                  >
                    <div className="flex flex-col">
                      <Skeleton className="h-5 w-full max-w-[200px] rounded-md text-left text-xs" />
                    </div>
                  </TableCell>

                  {/* Matter Cell - Only if not hidden */}
                  {!hideMatterColumn && (
                    <TableCell className="p-1 md:p-2 w-32 md:w-40 md:table-cell">
                      <Skeleton className="h-5 w-full max-w-[150px] rounded-md mx-auto text-xs" />
                    </TableCell>
                  )}

                  {/* Status Cell */}
                  <TableCell className="p-1 md:p-2 w-[15%] text-center">
                    <div className="flex justify-center">
                      <Skeleton className="h-5 w-20 rounded-full text-xs" />
                    </div>
                  </TableCell>

                  {/* Priority Cell */}
                  <TableCell className="p-1 md:p-2 w-[15%] text-center">
                    <div className="flex justify-center">
                      <Skeleton className="h-5 w-16 rounded-full text-xs" />
                    </div>
                  </TableCell>

                  {/* Due Date Cell */}
                  <TableCell className="p-1 md:p-2 w-[15%] text-center sm:table-cell">
                    <div className="flex justify-center">
                      <Skeleton className="h-5 w-24 rounded-md text-xs" />
                    </div>
                  </TableCell>

                  {/* Actions Cell */}
                  <TableCell className="p-1 md:p-2 w-[50px] md:w-[80px] text-right">
                    <div className="flex justify-end">
                      <Skeleton className="h-6 w-6 md:h-8 md:w-8 rounded-md" />
                    </div>
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
