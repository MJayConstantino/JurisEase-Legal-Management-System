"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface TaskTabsProps {
  onTabChange: (tab: string) => void
}

export function TaskTabs({ onTabChange }: TaskTabsProps) {
  const [activeTab, setActiveTab] = useState("all")

  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange(tabId)
  }

  return (
    <div className="flex space-x-1 rounded-md bg-indigo-800 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={cn(
            "px-3 py-1.5 text-sm font-medium transition-all",
            activeTab === tab.id ? "rounded bg-white text-indigo-900" : "text-white hover:bg-indigo-700",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

