import Link from "next/link"
import { cn } from "@/lib/utils"

interface QuickLink {
  label: string
  href: string
}

interface SocialLink {
  label: string
  href: string
}

interface FooterProps {
  companyName?: string
  address?: string
  phone?: string
  quickLinks?: QuickLink[]
  socialLinks?: SocialLink[]
  className?: string
}

export default function Footer({
  companyName = "Dianson Law Office",
  address = "123 Legal Street, Cityville, State 12345",
  phone = "(555) 123-4567",
  quickLinks = [],
  socialLinks = [],
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-[#2a3563] text-white py-8", className)}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h5 className="text-lg font-semibold mb-4">{companyName}</h5>
            <p>{address}</p>
            <p>Phone: {phone}</p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-gray-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Connect With Us</h5>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-gray-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

