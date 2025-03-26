"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { getMatters } from "@/actions/matters"
import { getMattersDisplayName } from "@/utils/getMattersDisplayName"
import type { Task } from "@/types/task.type"
import type { Matter } from "@/types/matter.type"

interface TaskFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (task: Task) => void
  onSaveAndCreateAnother: (task: Task) => void
}

export function TaskForm({ open, onOpenChange, onSave, onSaveAndCreateAnother }: TaskFormProps) {
  const [task, setTask] = useState<Task>({
    task_id: "",
    name: "",
    description: "",
    dueDate: undefined,
    priority: "low",
    status: "pending",
    matter_id: "",
    matter: "",
    createdAt: new Date(),
  })

  const [matters, setMatters] = useState<Matter[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchMatters() {
      try {
        setIsLoading(true)
        const matterData = await getMatters()
        setMatters(matterData)
      } catch (error) {
        console.error("Error fetching matters:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMatters()
  }, [])

  const handleChange = (field: keyof Task, value: string | Date | undefined) => {
    setTask((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (createAnother = false) => {
    if (createAnother) {
      onSaveAndCreateAnother(task)
    } else {

      console.log("nag run ang on save")
      onSave(task)
    }

    // Reset form if creating another
    if (createAnother) {
      setTask({
        task_id: "",
        name: "",
        description: "",
        dueDate: undefined,
        priority: "low",
        status: "pending",
        matter_id: "",
        matter: "",
        createdAt: new Date(),
      })
    }
  }

  const selectedMatterName = getMattersDisplayName(task.matter, matters)

  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open)}>
      <DialogContent className="sm:max-w-[500px] w-full max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader>
          <DialogTitle>{task.task_id ? "Edit Task" : "New Task"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={task.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={task.priority} onValueChange={(value) => handleChange("priority", value)}>
                  <SelectTrigger id="priority" className="mt-1 hover:cursor-pointer">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="mt-1 resize-none"
                rows={3}
                value={task.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assigned-matter">Assigned Matter</Label>
              <Select value={task.matter} onValueChange={(value) => handleChange("matter", value)}>
                <SelectTrigger className="w-full hover:cursor-pointer">
                  <SelectValue placeholder={selectedMatterName ? "Select a matter" : selectedMatterName} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Matters</SelectLabel>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading matters...
                      </SelectItem>
                    ) : matters.length > 0 ? (
                      matters.map((matter: Matter) => (
                        <SelectItem key={matter.name} value={matter.id}>
                          {matter.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-matters" disabled>
                        No matters available
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="taskStatus">Task status</Label>
              <Select
                value={task.status}
                onValueChange={(value: "pending" | "completed") => handleChange("status", value)}
              >
                <SelectTrigger id="taskStatus" className="mt-1 hover:cursor-pointer">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Due date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "mt-1 w-full justify-start text-left font-normal hover:cursor-pointer",
                      !task.dueDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {task.dueDate ? format(task.dueDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={task.dueDate}
                    onSelect={(date) => handleChange("dueDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:space-x-2">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button type="submit" onClick={() => handleSubmit(false)} className="w-full sm:w-auto">
              Save task
            </Button>
            <Button variant="outline" onClick={() => handleSubmit(true)} className="w-full sm:w-auto">
              Save and create another
            </Button>
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

