import type React from 'react'
import { Input } from '@/components/ui/input'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  name?: string // Added for FormData registration
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  value?: string // Now controlled by parent
  defaultValue?: string
  validateEmail?: boolean
  validatePassword?: boolean
  minPasswordLength?: number
  text?: string
  icon?: LucideIcon
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputField({
  id,
  name,
  label,
  placeholder,
  required = false,
  value, // Controlled input

  validateEmail = false,
  validatePassword = false,
  minPasswordLength = 8,
  icon: Icon,
  type = 'text',
  disabled = false,
  onChange,
}: InputFieldProps) {
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validate = (val: string) => {
    if (required && !val) return 'This field is required'
    if (validateEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
      return 'Invalid email address'
    if (validatePassword && val.length < minPasswordLength)
      return `Password must be at least ${minPasswordLength} characters`
    return null
  }

  const handleBlur = () => {
    setTouched(true)
    setError(validate(value || '')) // Validate the controlled value
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-lg font-medium text-[#2a3563]">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="h-5 w-5 text-[#2a3563] absolute inset-y-4 left-3 flex items-center" />
        )}
        <Input
          id={id}
          name={name} // Passes the name for FormData
          type={type}
          value={value} // Uses the controlled value
          onChange={onChange} // Calls the parent's handler
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            touched && error
              ? 'border-destructive focus-visible:ring-destructive/30 h-13 pl-10'
              : 'pl-10 bg-white border-0 h-13 rounded-md'
          )}
        />
        {touched && error && (
          <p className="text-destructive text-sm">{error}</p>
        )}
      </div>
    </div>
  )
}
