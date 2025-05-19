"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ActiveLinkScript() {
  const pathname = usePathname();

  useEffect(() => {
    const links = document.querySelectorAll(
      'a[href^="/matters"], a[href^="/tasks"], a[href^="/billings"]'
    );

    links.forEach((link) => {
      const href = link.getAttribute("href") || "";

      if (pathname.startsWith(href)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }, [pathname]);

  return null;
}
