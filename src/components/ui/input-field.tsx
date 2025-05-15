import { useState, forwardRef, useImperativeHandle } from 'react'
import type React from 'react'
import { Input } from '@/components/ui/input'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  name?: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  value?: string
  defaultValue?: string
  validateEmail?: boolean
  validatePassword?: boolean
  minPasswordLength?: number
  text?: string
  icon?: LucideIcon
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// ForwardRef to expose validation methods externally
// eslint-disable-next-line react/display-name
export const InputField = forwardRef(
  (
    {
      id,
      name,
      label,
      placeholder,
      required = false,
      value,
      validateEmail = false,
      validatePassword = false,
      minPasswordLength = 5,
      icon: Icon,
      type = 'text',
      disabled = false,
      onChange,
    }: InputFieldProps,
    ref
  ) => {
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
      setError(validate(value || ''))
    }

    useImperativeHandle(ref, () => ({
      triggerValidation: () => {
        setTouched(true)
        const validationError = validate(value || '')
        setError(validationError)
        return validationError === null
      },
      clearErrors: () => {
        setError(null)
        setTouched(false)
      },
    }))

    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-lg font-medium text-[#2a3563]"
        >
          {label}
        </label>
        <div className="relative">
          {Icon && <Icon className="absolute left-3 top-4  text-[#2a3563]" />}
          <Input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              touched && error
                ? 'border-destructive focus-visible:ring-destructive/30 h-13 pl-10'
                : 'pl-10 bg-white border-0 h-13 rounded-md'
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          {touched && error && (
            <p id={`${id}-error`} className="text-destructive text-sm">
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }
)
