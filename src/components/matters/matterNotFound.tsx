"use client";

import { FileX, HomeIcon } from "lucide-react";
import { Header } from "@/components/auth/Header";
import { Button } from "@/components/ui/button";

export function MatterNotFoundPage() {
  const navigateToMatters = () => {
    window.location.href = "/matters";
  };

  const navigateToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg bg-card p-4 sm:p-6 shadow-sm">
        <Header
          title="Matter Not Found"
          subtitle="JurisEase"
          description="We couldn't find the matter you were looking for."
        />

        <div className="rounded-lg bg-card p-4 sm:p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-12 w-12 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-destructive">
              <FileX className="h-6 w-6 sm:h-12 sm:w-12 text-accent" />
            </div>

            <h3 className="text-xl font-black tracking-tight text-destructive md:text-3xl">
              Matter Not Found
            </h3>

            <p className="text-sm sm:text-lg text-muted-foreground">
              The requested matter could not be found in our system.
            </p>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={navigateToMatters}
                className="flex items-center gap-2"
              >
                <FileX className="h-4 w-4" />
                <span>Matters List</span>
              </Button>

              <Button onClick={navigateToHome} variant="outline">
                <HomeIcon className="h-4 w-4 mr-2" />
                <span>Home</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
