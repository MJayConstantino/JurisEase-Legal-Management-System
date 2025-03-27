"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BillingsButtonsProps {
  onEdit: () => void
  onDelete: () => void
}

export function BillingsButtons({ onEdit, onDelete }: BillingsButtonsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="icon" onClick={onEdit}>
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>
      <Button variant="outline" size="icon" onClick={onDelete}>
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  )
}

