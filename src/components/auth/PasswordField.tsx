import React from 'react'
import { KeyIcon } from 'lucide-react'
import { InputField } from '@/components/ui/input-field'

export interface PasswordFieldProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  page: 'login' | 'register'
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  onChange,
  disabled,
  page,
}) => {
  return (
    <InputField
      id="password"
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
