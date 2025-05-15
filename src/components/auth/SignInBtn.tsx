import React from 'react'
import { Button } from '@/components/ui/button'

interface SignInButtonProps {
  onClick?: () => void
  disabled: boolean
  isPending: boolean
}

export const SignInButton: React.FC<SignInButtonProps> = ({
  onClick,
  disabled,
  isPending,
}) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      className="bg-[#2a3563] hover:bg-[#1e2547] text-white"
      disabled={disabled}
    >
      <span className="text-xs sm:text-sm">
        {isPending ? 'Logging in...' : 'Log in'}
      </span>
    </Button>
  )
}
