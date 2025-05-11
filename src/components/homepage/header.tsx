"use client";

import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  logoText: string;
}

export default function Header({}: HeaderProps) {


  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-start">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo/3.png"
              alt="JurisEase Logo"
              width={180}
              height={20}
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
