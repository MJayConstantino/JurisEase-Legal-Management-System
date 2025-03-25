import React from 'react'
import { MailIcon } from 'lucide-react'
import { InputField } from '@/components/ui/input-field'

interface EmailFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}

export const EmailField: React.FC<EmailFieldProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <InputField
      id="email"
      type="email"
      name="email"
      label="Email"
      icon={MailIcon}
      placeholder="Enter Email"
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
    />
  )
}
