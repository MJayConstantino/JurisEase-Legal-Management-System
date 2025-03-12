"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ActiveLinkScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Add 'active' class to current path links
    document.querySelectorAll(`a[href="${pathname}"]`).forEach((link) => {
      link.classList.add("active");
    });

    return () => {
      // Clean up when pathname changes
      document.querySelectorAll("a.active").forEach((link) => {
        link.classList.remove("active");
      });
    };
  }, [pathname]);

  return null;
}
