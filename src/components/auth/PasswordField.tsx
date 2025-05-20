import React from 'react'
import { KeyIcon } from 'lucide-react'
import { InputField } from '@/components/ui/input-field'

export interface PasswordFieldProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  page: 'login' | 'register'
  ref?: React.Ref<{ triggerValidation: () => boolean; clearErrors: () => void }>
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  ref = null,
  onChange,
  disabled,
  page,
}) => {
  return (
    <InputField
      id="password"
      ref={ref}
      type="password"
      name="password"
      label="Password"
      aria-label="Password"
      icon={KeyIcon}
      placeholder="Enter Password"
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      text={''}
      validatePassword={page == 'register' ? true : false}
    />
  )
}
