"use client";

import type React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  image?: React.ReactNode;
}

export default function HeroSection({
  title,
  subtitle,
  buttonText,
  image,
}: HeroSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D336B] mb-6 leading-tight">
          {title}
        </h1>
        {image && <div className="mb-8">{image}</div>}
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
          {subtitle}
        </p>
        <div className="flex flex-col items-center space-y-6">
          <Button
            className="bg-[#2D336B] hover:bg-[#1B1E4B] hover:cursor-pointer text-white text-xl font-bold py-3 px-8 h-auto min-w-[240px]"
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span className="ml-2">Logging in...</span>
              </>
            ) : (
              buttonText
            )}
          </Button>

          <div className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsSignupLoading(true);
                setTimeout(() => {
                  router.push("/signup");
                }, 1000);
              }}
              className="text-[#] hover:text-[#161943] dark:text-primary-foreground dark:bg-primary hover:cursor-pointer hover:underline transition-all"
            >
              {isSignupLoading ? "Signing Up..." : "Create New Account"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
