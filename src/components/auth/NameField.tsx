import React from 'react'
import { UserIcon } from 'lucide-react'
import { InputField } from '@/components/ui/input-field'

export interface NameFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  ref?: React.Ref<{ triggerValidation: () => boolean; clearErrors: () => void }>
}

export const NameField: React.FC<NameFieldProps> = ({
  value,
  ref = null,
  onChange,
  disabled = false,
}) => {
  return (
    <InputField
      id="name"
      ref={ref}
      type="text"
      name="name"
      label="Full Name"
      aria-label="Full Name"
      icon={UserIcon}
      placeholder="Enter your full name"
      value={value}
      onChange={onChange}
      required={true}
      disabled={disabled}
      text={''}
    />
  )
}
