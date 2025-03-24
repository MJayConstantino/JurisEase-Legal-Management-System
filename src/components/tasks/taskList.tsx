"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@/types/task.type";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { getStatusColor } from "@/utils/getStatusColor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";


interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, completed: boolean) => void;
}

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskListProps) {

  const formatDate = (date: string | Date) => {
    try {
      return format(
        typeof date === "string" ? new Date(date) : date,
        "MMM d, yyyy"
      );
    } catch {
      return date instanceof Date ? date.toISOString() : date;
    }
  };

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"> </TableHead>
            <TableHead className="w-[150px]">Due Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[100px]">Priority</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                No tasks found
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow
                key={task.id}
                className={task.status === "completed" ? "bg-gray-50" : ""}
              >
                {" "}
                <TableCell>
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={(checked) =>
                      onStatusChange(task.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  {task.dueDate ? formatDate(task.dueDate) : "No due date"}
                </TableCell>
                <TableCell
                  className={task.status === "completed" ? "line-through" : "font-medium"}
                >
                  {task.name}
                </TableCell>
                <TableCell className = {task.status === "completed" ? "line-through" : ""}>
                  {task.description || "No description"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(task.priority)}
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(task.status)}
                  >
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(task)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      {onDelete && (
                        <DropdownMenuItem onClick={() => onDelete(task.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
