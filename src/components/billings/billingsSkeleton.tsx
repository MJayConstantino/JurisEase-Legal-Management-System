"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"

interface BillingsItemSkeletonProps {
  hideMatterColumn?: boolean
}

export function BillingsSkeleton({ hideMatterColumn = false }: BillingsItemSkeletonProps) {
  return (
    <TableRow className="text-sm md:text-base dark:border-gray-700">
      <TableCell className="pl-5 font-medium">
        <div className="h-5 w-[150px] bg-gray-200 rounded-full animate-pulse dark:bg-gray-700"></div>
      </TableCell>

      {!hideMatterColumn && (
        <TableCell className="font-medium">
          <div className="h-5 w-[180px] bg-gray-200 rounded-full animate-pulse dark:bg-gray-700"></div>
        </TableCell>
      )}

      <TableCell>
        <div className="h-5 w-[80px] bg-gray-200 rounded-full animate-pulse dark:bg-gray-700"></div>
      </TableCell>

      <TableCell className={hideMatterColumn ? "max-w-[250px]" : "max-w-[200px]"}>
        <div className="h-5 w-full max-w-[180px] bg-gray-200 rounded-full animate-pulse dark:bg-gray-700"></div>
      </TableCell>

      <TableCell>
        <div className="h-6 w-[70px] bg-gray-200 rounded-full animate-pulse dark:bg-gray-700"></div>
      </TableCell>

      <TableCell>
        <div className="h-5 w-[100px] bg-gray-200 rounded-full animate-pulse dark:bg-gray-700"></div>
      </TableCell>

      <TableCell className="text-right pr-5">
        <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer md:h-9 md:w-9">
          <MoreHorizontal className="h-3 w-3 md:h-4 md:w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}