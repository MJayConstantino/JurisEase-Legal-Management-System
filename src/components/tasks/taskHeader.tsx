// "use client"

// import { Plus, Search, Grid, List } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useState } from "react"
// import type { Task } from "@/types/task.type"
// import { createTask } from "@/actions/tasks"
// import { TaskForm } from "./taskForm"

// interface TasksHeaderProps {
//   onSearch: (term: string) => void
//   onStatusChange: (status: string) => void
//   onViewChange: (view: "grid" | "table") => void
//   view: "grid" | "table"
//   onTaskCreated?: (task: Task) => void
// }

// export function TasksHeader({ onSearch, onStatusChange, onViewChange, view, onTaskCreated }: TasksHeaderProps) {
//   const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

//   const handleSaveTask = async (task: Task) => {
//     try {
//       // Convert the task data to match the expected format for createTask
//       const newTask = {
//         name: task.name,
//         description: task.description,
//         status: task.status,
//         priority: task.priority,
//         dueDate: task.dueDate,
//         matter_id: task.matter_id,
//       } as Omit<Task, "id">

//       // Close the form immediately for better UX
//       setIsAddTaskOpen(false)

//       // Create the task on the server
//       const createdTask = await createTask(newTask)

//       // If the task was created successfully and we have a callback, call it
//       if (createdTask && onTaskCreated) {
//         onTaskCreated(createdTask)
//       }
//     } catch (error) {
//       console.error("Error creating task:", error)
//     }
//   }

//   const handleSaveAndCreateAnother = async (task: Task) => {
//     try {
//       // Convert the task data to match the expected format for createTask
//       const newTask = {
//         name: task.name,
//         description: task.description,
//         status: task.status,
//         priority: task.priority,
//         dueDate: task.dueDate,
//         matter_id: task.matter_id,
//       } as Omit<Task, "id">

//       // Create the task on the server
//       const createdTask = await createTask(newTask)

//       // If the task was created successfully and we have a callback, call it
//       if (createdTask && onTaskCreated) {
//         onTaskCreated(createdTask)
//       }

//       // Keep the form open for creating another task
//     } catch (error) {
//       console.error("Error creating task:", error)
//     }
//   }

//   return (
//     <div className="w-full">
//       <div className="bg-white rounded-lg p-4 border">
//         <div className="flex justify-between items-center mb-6">
//           <Button variant="default" onClick={() => setIsAddTaskOpen(true)}>
//             <Plus className="h-4 w-4 mr-2" />
//             New Task
//           </Button>
        
        

//           <div className="flex items-center space-x-4">
//           <div className="bg-muted rounded-lg p-1 flex">
//             <Button
//               variant={view === "grid" ? "default" : "ghost"}
//               size="sm"
//               className="rounded-md"
//               onClick={() => onViewChange("grid")}
//             >
//               <Grid className="h-4 w-4 mr-2" />
//               Grid View
//             </Button>
//             <Button
//               variant={view === "table" ? "default" : "ghost"}
//               size="sm"
//               className="rounded-md"
//               onClick={() => onViewChange("table")}
//             >
//               <List className="h-4 w-4 mr-2" />
//               Table View
//             </Button>
//           </div>
//             <Tabs defaultValue="all" className="w-fit" onValueChange={onStatusChange}>
//               <TabsList>
//                 <TabsTrigger value="all">All</TabsTrigger>
//                 <TabsTrigger value="pending">Pending</TabsTrigger>
//                 <TabsTrigger value="completed">Completed</TabsTrigger>
//               </TabsList>
//             </Tabs>

//             <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search tasks..."
//                 className="w-[250px] pl-8"
//                 onChange={(e) => onSearch(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         <TaskForm
//           open={isAddTaskOpen}
//           onOpenChange={setIsAddTaskOpen}
//           onSave={handleSaveTask}
//           onSaveAndCreateAnother={handleSaveAndCreateAnother}
//         />
//       </div>
//     </div>
//   )
// }

"use client"

import { Plus, Search, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import type { Task } from "@/types/task.type"
import { createTask } from "@/actions/tasks"
import { TaskForm } from "./taskForm"

interface TasksHeaderProps {
  onSearch: (term: string) => void
  onStatusChange: (status: string) => void
  onViewChange: (view: "grid" | "table") => void
  view: "grid" | "table"
  onTaskCreated?: (task: Task) => void
}

export function TasksHeader({ onSearch, onStatusChange, onViewChange, view, onTaskCreated }: TasksHeaderProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

  const handleSaveTask = async (task: Task) => {
    try {
      // Convert the task data to match the expected format for createTask
      const newTask = {
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        matter_id: task.matter_id,
      } as Omit<Task, "id">

      // Close the form immediately for better UX
      setIsAddTaskOpen(false)

      // Create the task on the server
      const createdTask = await createTask(newTask)

      // If the task was created successfully and we have a callback, call it
      if (createdTask && onTaskCreated) {
        onTaskCreated(createdTask)
      }
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  const handleSaveAndCreateAnother = async (task: Task) => {
    try {
      // Convert the task data to match the expected format for createTask
      const newTask = {
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        matter_id: task.matter_id,
      } as Omit<Task, "id">

      // Create the task on the server
      const createdTask = await createTask(newTask)

      // If the task was created successfully and we have a callback, call it
      if (createdTask && onTaskCreated) {
        onTaskCreated(createdTask)
      }

      // Keep the form open for creating another task
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  return (
    <div className="w-full">
      {/* Top section with title and view toggle - stack on mobile, side by side on larger screens */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
        
      </div>

      {/* Main controls section */}
      <div className="bg-white rounded-lg p-3 sm:p-4 border">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          {/* Mobile view toggle */}
          <div className="flex sm:hidden justify-between items-center">
            <div className="bg-muted rounded-lg p-1 flex">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-md p-2"
                onClick={() => onViewChange("grid")}
              >
                <Grid className="h-4 w-4" />
                <span className="sr-only">Grid View</span>
              </Button>
              <Button
                variant={view === "table" ? "default" : "ghost"}
                size="sm"
                className="rounded-md p-2"
                onClick={() => onViewChange("table")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">Table View</span>
              </Button>
            </div>

            <Button variant="default" size="sm" onClick={() => setIsAddTaskOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>

          {/* Desktop new task button */}
          <div className="hidden sm:block">
            <Button variant="default" onClick={() => setIsAddTaskOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>

          {/* Tabs and search - stack on mobile */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Tabs defaultValue="all" className="w-full sm:w-fit" onValueChange={onStatusChange}>
              <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="w-full sm:w-[250px] pl-8"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <div className="hidden sm:flex sm:items-center sm:gap-2">
          <div className="bg-muted rounded-lg p-1 flex">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-md"
              onClick={() => onViewChange("grid")}
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid View
            </Button>
            <Button
              variant={view === "table" ? "default" : "ghost"}
              size="sm"
              className="rounded-md"
              onClick={() => onViewChange("table")}
            >
              <List className="h-4 w-4 mr-2" />
              Table View
            </Button>
          </div>
        </div>
          </div>
        </div>

        <TaskForm
          open={isAddTaskOpen}
          onOpenChange={setIsAddTaskOpen}
          onSave={handleSaveTask}
          onSaveAndCreateAnother={handleSaveAndCreateAnother}
        />
      </div>
    </div>
  );
}

