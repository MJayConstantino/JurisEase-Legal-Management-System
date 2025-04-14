import { cn } from "@/lib/utils"

interface ServiceCardProps {
  title: string
  description?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export default function ServiceCard({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: ServiceCardProps) {
  const defaultDescription = `Providing expert legal advice and representation in ${title.toLowerCase()} matters.`

  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-md", className)}>
      <h4 className={cn("text-xl font-semibold text-[#2a3563] mb-4", titleClassName)}>{title}</h4>
      <p className={cn("text-gray-600", descriptionClassName)}>{description || defaultDescription}</p>
    </div>
  )
}

