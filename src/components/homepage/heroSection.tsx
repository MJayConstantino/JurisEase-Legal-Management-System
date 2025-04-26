"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

export default function HeroSection({
  title,
  subtitle,
  buttonText,
}: HeroSectionProps) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleButtonClick = () => {
    setIsButtonDisabled(true);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
      <div className="container mx-auto px-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D336B] mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
          {subtitle}
        </p>
        <Link href="/login">
          <Button
            className="bg-[#2D336B] hover:bg-[#1B1E4B] hover:cursor-pointer text-white text-xl font-bold py-3 px-8 h-auto"
            onClick={handleButtonClick}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span className="ml-2">Logging in...</span>
              </>
            ) : (
              buttonText
            )}
          </Button>
        </Link>
      </div>
    </section>
  );
}
