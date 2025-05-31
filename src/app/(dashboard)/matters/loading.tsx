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
export function MattersLoading() {
  return (
    <div className="border border-gray-200 dark:border-gray-700 w-full container mx-auto h-auto flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg shadow mb-[56px] md:mb-0">
      {/* Header Skeleton */}
      <div className="p-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
        {/* Mobile View */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <Skeleton className="h-9 w-28" /> {/* Add Matter button */}
          <Skeleton className="h-9 w-9 rounded-md" /> {/* Hamburger menu */}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Skeleton className="h-9 w-32" /> {/* Add Matter button */}
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-700 rounded-md p-1">
            <Skeleton className="h-9 w-28 px-3 py-1 rounded-md" />{" "}
            {/* All Matters */}
            <Skeleton className="h-9 w-16 px-3 rounded-md" /> {/* Open */}
            <Skeleton className="h-9 w-20 px-3 rounded-md" /> {/* Pending */}
            <Skeleton className="h-9 w-16 px-3 rounded-md" /> {/* Closed */}
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="w-full dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader className="border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="font-semibold flex w-full cursor-default"
                    disabled
                  >
                    <Skeleton className="h-5 w-16" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="font-semibold flex w-full cursor-default"
                    disabled
                  >
                    <Skeleton className="h-5 w-24" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="font-semibold flex w-full cursor-default"
                    disabled
                  >
                    <Skeleton className="h-5 w-16" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="font-semibold flex w-full cursor-default"
                    disabled
                  >
                    <Skeleton className="h-5 w-32" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="font-semibold flex w-full cursor-default"
                    disabled
                  >
                    <Skeleton className="h-5 w-24" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <Button
                    variant="ghost"
                    className="font-semibold flex w-full cursor-default"
                    disabled
                  >
                    <Skeleton className="h-5 w-16 mx-auto" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="font-semibold flex w-full cursor-default"
                    disabled
                  >
                    <Skeleton className="h-5 w-24" />
                  </Button>
                </TableHead>
                <TableHead className="text-center font-semibold">
                  <Button
                    variant="ghost"
                    className="font-semibold flex w-full cursor-default"
                    disabled
                  >
                    <Skeleton className="h-5 w-16 mx-auto" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 8 }).map((_, index) => (
                <TableRow
                  key={index}
                  className="cursor-default"
                >
                  <TableCell className="font-medium w-[10%]">
                    <div className="pl-6">
                      <Skeleton className="w-24 h-4 rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="w-[18%]">
                    <div className="pl-12">
                      <Skeleton className="w-32 h-4 rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="w-[18%]">
                    <div className="pl-12">
                      <Skeleton className="w-32 h-4 rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="w-[18%]">
                    <div className="pl-9">
                      <Skeleton className="w-24 h-4 rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="w-[18%]">
                    <div className="pl-7">
                      <Skeleton className="w-24 h-4 rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="w-[8%]">
                    <div className="pl-8">
                      <Skeleton className="w-12 h-4 rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="w-[10%]">
                    <div className="pl-8">
                      <Skeleton className="w-20 h-4 rounded-lg" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center w-[2%]">
                    <Skeleton className="h-8 w-8 rounded-md mx-auto" />
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

// Default export for Next.js loading page
export default function Loading() {
  return <MattersLoading />;
}
