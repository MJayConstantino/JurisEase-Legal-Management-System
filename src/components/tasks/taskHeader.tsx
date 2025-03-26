"use client"

import { Plus, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTasks } from './taskProvider'
import { useState } from "react"
import { Task } from "@/types/task.type"
import { TaskForm } from './taskForm'

export function TasksHeader() {
  const { filter, setFilter, setSearchQuery, addTask } = useTasks()
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false)

  const handleSaveTask = async (task: Omit<Task, "id">) => {
    try {
      await addTask(task)
    } catch (error) {
      console.error("Error saving task:", error)
    }
    setIsNewTaskOpen(false)
  }

  const handleSaveAndCreateAnother = async (task: Partial<Task>) => {
    await addTask(task)
    // Keep the dialog open for another task
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4">
      <Button 
        onClick={() => setIsNewTaskOpen(true)} 
        className="bg-indigo-900 hover:bg-indigo-800 hover:cursor-pointer"
      >
        <Plus className="mr-2 h-4 w-4" /> New Task
      </Button>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Tabs 
          defaultValue={filter} 
          className="w-full sm:w-auto"
          onValueChange={(value) => setFilter(value as any)}
        >
          <TabsList className="grid grid-cols-3 w-full sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8 w-full"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <TaskForm 
        open={isNewTaskOpen} 
        onOpenChange={setIsNewTaskOpen}
        onSave={handleSaveTask}
        onSaveAndCreateAnother={handleSaveAndCreateAnother}
      />
    </div>
  )
}
