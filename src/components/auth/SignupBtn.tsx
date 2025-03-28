import React from 'react'
import { Button } from '@/components/ui/button'

export interface SignUpButtonProps {
  isDisabled: boolean
  isPending: boolean
}

export const SignUpButton: React.FC<SignUpButtonProps> = ({
  isDisabled,
  isPending,
}) => {
  return (
    <Button
      type="submit"
      className="bg-[#2a3563] hover:bg-[#1e2547] text-white hover: cursor-pointer"
      disabled={isDisabled}
    >
      {isPending ? 'Signing up...' : 'Sign Up'}
    </Button>
  )
}
