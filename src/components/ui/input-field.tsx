import type React from "react"
import { Input } from "@/components/ui/input"
import type { LucideIcon } from "lucide-react"

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  icon: LucideIcon
  placeholder?: string
}

export function InputField({ id, label, icon: Icon, placeholder, type = "text", ...props }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-lg font-medium text-[#2a3563]">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center">
          <Icon className="h-5 w-5 text-[#2a3563]" />
        </div>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="pl-10 bg-white border-0 h-13 rounded-md"
          {...props}
        />
      </div>
    </div>
  )
}

