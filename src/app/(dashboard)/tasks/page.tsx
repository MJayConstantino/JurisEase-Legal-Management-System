"use client";

import { generateId } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/tasks/task-list";
import { TaskForm } from "@/components/tasks/task-form";
import type { Task } from "../types";

export default function TasksPage() {
  const initialTasks: Task[] = [
    {
      id: "1",
      name: "Review Johnson Contract",
      dueDate: new Date("2025-03-20"),
      status: "pending",
      priority: "high",
    },
    {
      id: "2",
      name: "Prepare Motion for Discovery",
      dueDate: new Date("2025-03-22"),
      status: "pending",
      priority: "medium",
    },
    {
      id: "3",
      name: "Client Meeting Notes",
      dueDate: new Date("2025-03-18"),
      status: "completed",
      priority: "low",
    },
    {
      id: "4",
      name: "File Court Documents",
      dueDate: new Date("2025-03-20"),
      status: "pending",
      priority: "high",
    },
    {
      id: "5",
      name: "Research Case Precedents",
      dueDate: new Date("2025-03-15"),
      status: "completed",
      priority: "medium",
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Partial<Task> | undefined>(
    undefined
  );

  const filteredTasks = (status: string) => {
    return tasks.filter((task) => {
      const matchesStatus = status === "all" || task.status === status;
      const matchesSearch = task.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleStatusChange = (taskId: string, completed: boolean) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, status: completed ? "completed" : "pending" } : task)),
    )
  }

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask?.id) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...taskData } : task
        )
      );
    } else {
      const newTask: Task = {
        id: generateId(),
        name: taskData.name || "Untitled Task",
        dueDate: taskData.dueDate || null,
        status: taskData.status || "pending",
        priority: taskData.priority || "medium",
        recurring: taskData.recurring || false,
      };
      setTasks([...tasks, newTask]);
    }
    setIsFormOpen(false);
  };

  const handleSaveAndCreateAnother = (taskData: Partial<Task>) => {
    handleSaveTask(taskData);
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  return (
    <div className="flex h-screen bg-[white] dark:bg-black-800">
      <div className="flex-1 flex flex-col">
      <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold font-aileron">Tasks</h1>
              <div className="flex items-center gap-4">
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-[#1B1E4B] hover:bg-[#0C0E2B] text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> New Task
          </Button>
          <div className="flex items-center gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                className="w-64 pl-9"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Tabs value={activeTab}>
          <TabsContent value="all">
            <TaskList tasks={filteredTasks("all")} onEdit={handleEditTask} onDelete={handleDeleteTask} onStatusChange={handleStatusChange}/>
          </TabsContent>
          <TabsContent value="pending">
            <TaskList tasks={filteredTasks("pending")} onEdit={handleEditTask} onDelete={handleDeleteTask} onStatusChange={handleStatusChange}/>
          </TabsContent>
          <TabsContent value="completed">
            <TaskList tasks={filteredTasks("completed")} onEdit={handleEditTask} onDelete={handleDeleteTask} onStatusChange={handleStatusChange}/>
          </TabsContent>
        </Tabs>
      </div>
      {isFormOpen && (
        <TaskForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSave={handleSaveTask}
          onSaveAndCreateAnother={handleSaveAndCreateAnother}
          initialData={editingTask}
        />
      )}
    </div>
  );
}
