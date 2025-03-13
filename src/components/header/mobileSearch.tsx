import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileSearch() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white hover:bg-[#1B1E4B] md:hidden"
    >
      <Search className="h-5 w-5" />
      <span className="sr-only">Search</span>
    </Button>
  );
}

export default MobileSearch;
