import React from 'react'
import { MailIcon } from 'lucide-react'
import { InputField } from '@/components/ui/input-field'

interface EmailFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  ref?: React.Ref<{ triggerValidation: () => boolean; clearErrors: () => void }>
}

export const EmailField: React.FC<EmailFieldProps> = ({
  value,
  ref = null,
  onChange,
  disabled = false,
}) => {
  return (
    <InputField
      ref={ref}
      id="email"
      name="email"
      label="Email"
      aria-label="Email"
      icon={MailIcon}
      placeholder="Enter Email"
      value={value}
      onChange={onChange}
      required={true}
      disabled={disabled}
      text={''}
      validateEmail={true}
    />
  )
}
