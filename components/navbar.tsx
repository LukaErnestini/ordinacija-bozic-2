"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface NavigationItem {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
}

interface NavbarProps {
  items: NavigationItem[];
}

export default function Navbar({ items }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <nav className={`fixed w-full transition-all duration-300 ${hasScrolled ? "bg-white/50" : "bg-transparent"}`}>
      {hasScrolled && (
        <>
          <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-b from-white/95 to-transparent to-50% pointer-events-none" />
          <div className="absolute left-0 right-0 bottom-0 h-0.5 backdrop-blur-md brightness-95 bg-white/10 translate-y-full pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-20">
          {/* Logo section */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl text-primary-content uppercase font-light"
            >
              Ordinacija Bozic
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-white transition-colors"
            >
              Domov
            </Link>

            {/* Map through navigation items */}
            {items.map((item) => (
              <div
                key={item.href}
                className="dropdown dropdown-hover"
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="text-gray-700 hover:text-white transition-colors cursor-pointer"
                >
                  {item.name}
                </div>
                {item.subItems && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white rounded-box z-[1] p-2 shadow-lg"
                  >
                    {item.subItems.map((subItem) => (
                      <li key={subItem.href}>
                        <Link
                          href={subItem.href}
                          className="text-gray-700 hover:text-primary hover:bg-gray-50 text-nowrap"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <Link
              href="/kontakt"
              className="text-gray-700 hover:text-white transition-colors"
            >
              Kontakt
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
            >
              Domov
            </Link>

            {/* Map through navigation items for mobile */}
            {items.map((item) => (
              <div
                key={item.href}
                className="space-y-1"
              >
                <button
                  onClick={() => toggleSection(item.name)}
                  className="w-full flex items-center justify-between px-3 py-2 text-gray-700 font-medium"
                >
                  <span>{item.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      expandedSections[item.name] ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedSections[item.name] && item.subItems && (
                  <div className="space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-3 py-2 text-gray-600 hover:text-primary pl-6"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/kontakt"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
            >
              Kontakt
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
