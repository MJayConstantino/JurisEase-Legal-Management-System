import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
}

interface HeaderProps {
  logoText: string
  navItems: NavItem[]
  className?: string
  logoClassName?: string
  navClassName?: string
}

export default function Header({
  logoText = "Dianson Law Office",
  navItems = [],
  className,
  logoClassName,
  navClassName,
}: HeaderProps) {
  return (
    <header className={cn("bg-[#2D336B] text-white", className)}>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className={cn("text-2xl font-bold", logoClassName)}>{logoText}</h1>
        <nav>
          <ul className={cn("flex lg:space-x-32 md:space-x-24 space-x-12 mr-2", navClassName)}>
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-gray-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

