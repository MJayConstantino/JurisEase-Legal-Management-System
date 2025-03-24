import { cn } from "@/lib/utils"
import LoginButton from "./login-btn"
interface HeroSectionProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export default function HeroSection({
  title = "Welcome to Dianson Law Office",
  subtitle = "Expert legal services tailored to your needs",
  buttonText = "Log In to Your Account",
  buttonHref = "/login",
  className,
  titleClassName,
  subtitleClassName,
}: HeroSectionProps) {
  return (
    <section className={cn("bg-[#e1e5f2] py-20", className)}>
      <div className="container mx-auto px-4 text-center">
        <h2 className={cn("text-4xl font-bold text-[#2a3563] mb-4", titleClassName)}>{title}</h2>
        <p className={cn("text-xl text-gray-700 mb-8", subtitleClassName)}>{subtitle}</p>
        <LoginButton href={buttonHref} text={buttonText} />
      </div>
    </section>
  )
}

