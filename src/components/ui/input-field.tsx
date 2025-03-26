import type React from 'react'
import { Input } from '@/components/ui/input'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  defaultValue?: string
  validateEmail?: boolean
  validatePassword?: boolean
  minPasswordLength?: number
  text?: string // Made optional for flexibility
  icon?: LucideIcon
  disabled?: boolean // Ensures the disabled prop is supported
}

export function InputField({
  id,
  label,
  placeholder,
  required = false,
  defaultValue = '',
  validateEmail = false,
  validatePassword = false,
  minPasswordLength = 8,
  icon: Icon,
  type = 'text',
  disabled = false, // Default value added
}: InputFieldProps) {
  const [value, setValue] = useState(defaultValue)
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validate = (val: string) => {
    if (required && !val) {
      return 'This field is required'
    }

    if (validateEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(val)) {
        return 'Invalid email address'
      }
    }

    if (validatePassword) {
      if (val.length < minPasswordLength) {
        return `Password must be at least ${minPasswordLength} characters`
      }
    }
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    if (touched) {
      setError(validate(newValue))
    }
  }

  const handleBlur = () => {
    setTouched(true)
    setError(validate(value))
  }

  const isInvalid = touched && error !== null

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
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled} // Ensure disabled property is passed
          className={cn(
            isInvalid
              ? 'border-destructive focus-visible:ring-destructive/30 h-13 pl-10'
              : 'pl-10 bg-white border-0 h-13 rounded-md'
          )}
        />
        {isInvalid && <p className="text-destructive text-sm">{error}</p>}
      </div>
    </div>
  )
}
