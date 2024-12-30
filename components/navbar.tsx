"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Dropdown from "@/components/ui/dropdown";

interface NavigationItem {
  name: string;
  href?: string;
  subItems?: { name: string; href: string }[];
}

interface NavbarProps {
  items: NavigationItem[];
}

export default function Navbar({ items }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [hasScrolled, setHasScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedSections({});
    setOpenDropdown(null);
  };

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
    <nav
      className={`fixed w-full transition-all duration-300 ${
        hasScrolled || isMenuOpen ? "bg-white/50" : "bg-transparent"
      }`}
    >
      {(hasScrolled || isMenuOpen) && (
        <>
          <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-b from-white/95 to-transparent to-50% pointer-events-none" />
          <div className="absolute left-0 right-0 bottom-0 h-0.5 backdrop-blur-md brightness-95 bg-white/10 translate-y-full pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-nav">
          {/* Logo section */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="max-w-1 sm:max-w-full text-lg leading-tight sm:text-2xl text-primary-content uppercase font-light"
            >
              Ordinacija Bozic
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-8">
            {items.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <Dropdown
                    isOpen={openDropdown === item.name}
                    onOpenChange={(isOpen) => setOpenDropdown(isOpen ? item.name : null)}
                    trigger={
                      <div
                        role="button"
                        className="text-gray-700 hover:text-primary transition-colors cursor-pointer"
                      >
                        {item.name}
                      </div>
                    }
                  >
                    <ul
                      className="p-2 max-h-[80vh] overflow-y-auto"
                      role="menu"
                    >
                      {item.href && (
                        <li role="none">
                          <Link
                            href={item.href}
                            className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 text-nowrap"
                            onClick={closeMenu}
                            role="menuitem"
                            tabIndex={openDropdown === item.name ? 0 : -1}
                          >
                            {item.name}
                          </Link>
                        </li>
                      )}
                      {item.subItems.map((subItem) => (
                        <li
                          key={subItem.href}
                          role="none"
                        >
                          <Link
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 text-nowrap"
                            onClick={closeMenu}
                            role="menuitem"
                            tabIndex={openDropdown === item.name ? 0 : -1}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Dropdown>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="text-gray-700 hover:text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/kontaktiraj-nas"
              className="btn btn-sm btn-primary"
            >
              Kontaktiraj Nas
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
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
        <div className="lg:hidden relative">
          <div className="bg px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {items.map((item) => (
              <div
                key={item.name}
                className="space-y-1"
              >
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleSection(item.name)}
                      className="w-full flex items-center justify-between px-3 py-2 text-gray-700 font-medium"
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
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
                    <div
                      className={`transform transition-all duration-200 origin-top ${
                        expandedSections[item.name] ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"
                      }`}
                    >
                      <div className="space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-3 py-2 text-gray-600 hover:text-primary pl-6"
                            onClick={closeMenu}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="block px-3 py-2 text-gray-700 font-medium hover:text-primary"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="/kontaktiraj-nas"
                className="btn btn-primary w-full"
                onClick={closeMenu}
              >
                Kontaktiraj Nas
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
