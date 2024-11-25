"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center py-2 sticky top-0 z-20 bg-gray-950 sm:opacity-[0.7] xxs:h-[12vh]">
      <ul className="flex flex-col sm:flex-row sm:space-x-4">
        <li>
          <Link
            className={`link ${
              pathname === "/" ? "active" : "px-2 py-1 sm:px-4 sm:py-2"
            }`}
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          {" "}
          <Link
            className={`link ${
              pathname === "/Movies" ? "active" : "px-2 py-1 sm:px-4 sm:py-2"
            }`}
            href="/Movies"
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            className={`link ${
              pathname === "/Series" ? "active" : "px-2 py-1 sm:px-4 sm:py-2"
            }`}
            href="/Series"
          >
            Series
          </Link>
        </li>
        <li>
          <Link
            className={`link ${
              pathname === "/Contact" ? "active" : "px-2 py-1 sm:px-4 sm:py-2"
            }`}
            href="/Contact"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
