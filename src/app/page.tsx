import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#2a3563] text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dianson Law Office</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-[#e1e5f2] py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-[#2a3563] mb-4">Welcome to Dianson Law Office</h2>
            <p className="text-xl text-gray-700 mb-8">Expert legal services tailored to your needs</p>
            <Button asChild className="bg-[#2a3563] hover:bg-[#1e2547] text-white text-lg px-8 py-3">
              <Link href="/login">Log In to Your Account</Link>
            </Button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-[#2a3563] mb-8 text-center">Our Services</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {["Corporate Law", "Intellectual Property", "Litigation"].map((service) => (
                <div key={service} className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold text-[#2a3563] mb-4">{service}</h4>
                  <p className="text-gray-600">
                    Providing expert legal advice and representation in {service.toLowerCase()} matters.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2a3563] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">Dianson Law Office</h5>
              <p>123 Legal Street, Cityville, State 12345</p>
              <p>Phone: (555) 123-4567</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Connect With Us</h5>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-gray-300">
                  LinkedIn
                </Link>
                <Link href="#" className="hover:text-gray-300">
                  Twitter
                </Link>
                <Link href="#" className="hover:text-gray-300">
                  Facebook
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Dianson Law Office. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

