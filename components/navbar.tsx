"use client";
import { useState } from "react";
import Link from "next/link";
import Dropdown from "@/components/ui/dropdown";
import { TinaQueryClientPageProps } from "@/tina/utils";
import { GlobalQuery } from "@/tina/__generated__/types";
import { tinaField, useTina } from "tinacms/dist/react";
import Image from "next/image";

interface NavigationItem {
  name: string;
  href?: string;
  subItems?: { name: string; href: string }[];
}

interface NavbarProps {
  items: NavigationItem[];
  globalQuery: TinaQueryClientPageProps<GlobalQuery>;
}

export default function Navbar({ items, globalQuery }: NavbarProps) {
  const { global } = useTina(globalQuery).data;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedSections({});
    setOpenDropdown(null);
  };

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <nav className={`z-20 fixed w-full transition-all duration-300 bg-white/50`}>
      <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-b from-white/95 to-transparent to-50% pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-0 h-0.5 backdrop-blur-md brightness-95 bg-white/10 translate-y-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center  gap-2 lg:gap-10 pt-4 pb-4">
          {/* Logo and title section */}
          {global.logo && (
            <Link
              href="/"
              className="flex flex-col gap-4 items-center"
            >
              <Image
                data-tina-field={tinaField(global, "logo")}
                src={global.logo}
                alt=""
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span
                data-tina-field={tinaField(global, "pageTitle")}
                className="text-center text-2xl leading-tight sm:text-1xl text-primary-content font-light "
              >
                {global.pageTitle}
              </span>
            </Link>
          )}

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-8">
            {items.map((item) => (
              <div key={item.name}>
                {item.name === "Storitve" ? (
                  <Link
                    href="/#our-services"
                    className="text-gray-700 hover:text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                ) : item.subItems ? (
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
          <div className="lg:hidden flex items-center absolute right-4 top-8">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                className="h-8 w-8"
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
