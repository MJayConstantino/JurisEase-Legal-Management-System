import React from 'react'
import Link from 'next/link'

export interface FooterProps {
  text: string
  linkHref: string
  linkText: string
}

export const Footer: React.FC<FooterProps> = ({ text, linkHref, linkText }) => {
  return (
    <div className="mt-4 text-center text-sm">
      <span className="text-[#2a3563]">{text} </span>
      <Link
        href={linkHref}
        className="font-medium text-[#2a3563] hover:underline"
      >
        <span className="font-bold">{linkText}</span>
      </Link>
    </div>
  )
}
