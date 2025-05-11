"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logoText: string;
  navItems: NavItem[];
}

export default function Header({ navItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo/3.png"
              alt="JurisEase Logo"
              width={180}
              height={20}
              priority
            />
          </Link>
    
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-[#2D336B] font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button className="bg-[#2D336B] hover:bg-[#1B1E4B] text-white hover:cursor-pointer">Get Started</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-[#2D336B] font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="bg-[#2D336B] hover:bg-[#1B1E4B] text-white w-full">Get Started</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}