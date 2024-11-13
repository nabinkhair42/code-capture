import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 border-t w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">
            &copy; Code Craft {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
        <div>
          Built by <Link href="https://www.github.com/nabinkhair42">Nabin Khair</Link>
        </div>
        <nav>
          <ul className="flex space-x-4 text-sm">
            <li>
              <a href="/" className="hover:text-muted-foreground">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-muted-foreground">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
