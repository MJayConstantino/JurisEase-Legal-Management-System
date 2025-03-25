import React from 'react'
import { UserIcon } from 'lucide-react'
import { InputField } from '@/components/ui/input-field'

export interface NameFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}

export const NameField: React.FC<NameFieldProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <InputField
      id="name"
      type="text"
      name="name"
      label="Full Name"
      icon={UserIcon}
      placeholder="Enter your full name"
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
    />
  )
}
