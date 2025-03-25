import { cn } from "@/lib/utils"
import ServiceCard from "./service-card"

interface Service {
  title: string
  description?: string
}

interface ServicesSectionProps {
  title?: string
  services?: Service[]
  className?: string
  titleClassName?: string
  gridClassName?: string
}

export default function ServicesSection({
  title = "Our Services",
  services = [],
  className,
  titleClassName,
  gridClassName,
}: ServicesSectionProps) {
  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto px-4">
        <h3 className={cn("text-3xl font-bold text-[#2a3563] mb-8 text-center", titleClassName)}>{title}</h3>
        <div className={cn("grid md:grid-cols-3 gap-8", gridClassName)}>
          {services.map((service) => (
            <ServiceCard key={service.title} title={service.title} description={service.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

