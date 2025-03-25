import React from 'react'

export interface HeaderProps {
  title: string
  subtitle: string
  description: string
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-[#2D336B] md:text-4xl">
        {title}
      </h1>
      <h2 className="text-2xl font-black tracking-tight text-[#1B1E4B] md:text-3xl">
        {subtitle}
      </h2>
      <p className="mt-2 text-sm text-[#2a3563]">{description}</p>
    </div>
  )
}
