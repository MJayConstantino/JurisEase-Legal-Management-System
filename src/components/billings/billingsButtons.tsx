// Edit and Delete button props for each bill

"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BillingsButtonsProps {
  onEdit: () => void
  onDelete: () => void
}

export function BillingsButtons({ onEdit, onDelete }: BillingsButtonsProps) {
  return (
    <div className="flex justify-end gap-2 md:gap-3">
      <Button variant="outline" size="icon" className="h-7 w-7 md:h-9 md:w-9" onClick={onEdit}>
        <Edit className="h-3 w-3 md:h-4 md:w-4" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button variant="outline" size="icon" className="h-7 w-7 md:h-9 md:w-9" onClick={onDelete}>
        <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  )
}

