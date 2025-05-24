"use client";

import { FileX, HomeIcon } from "lucide-react";
import Link from "next/link";

import { Header } from "@/components/auth/Header";
import { Button } from "@/components/ui/button";

export interface MatterNotFoundPageProps {
  matterId?: string;
  matterName?: string;
}

export function MatterNotFoundPage({
  matterId,
  matterName,
}: MatterNotFoundPageProps) {
  // Determine what to display based on available information
  const matterIdentifier = matterName || matterId || "The requested matter";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg bg-card p-4 sm:p-6 shadow-sm">
        {/* Header Section */}
        <Header
          title="Matter Not Found"
          subtitle="JurisEase"
          description="We couldn't find the matter you were looking for."
        />

        {/* Matter Not Found Section */}
        <div className="rounded-lg bg-card p-4 sm:p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h3 className="text-xl font-stretch-normal tracking-tight text-destructive md:text-3xl">
              404
            </h3>
            <div className="flex h-12 w-12 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-destructive">
              <FileX className="h-6 w-6 sm:h-12 sm:w-12 text-accent" />
            </div>

            <h3 className="text-xl font-black tracking-tight text-destructive md:text-3xl">
              Matter Not Found
            </h3>

            <p className="text-sm sm:text-lg text-destructive">
              {matterIdentifier} could not be found in our system.
            </p>

            <div className="flex flex-col space-y-3 pt-4 max-w-sm">
              <Button
                asChild
                className="bg-primary text-accent hover:bg-primary/90"
              >
                <Link href="/matters">
                  <span className="text-xs sm:text-sm cursor-pointer hidden sm:block">
                    Return to Matters
                  </span>
                  <span>
                    <FileX />
                  </span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Link href="/">
                  <span className="text-xs sm:text-sm cursor-pointer hidden sm:block">
                    Return to Home
                  </span>
                  <span>
                    <HomeIcon />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
