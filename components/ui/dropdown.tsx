import { ReactNode, useEffect, useRef, KeyboardEvent as ReactKeyboardEvent } from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function Dropdown({ trigger, children, isOpen, onOpenChange }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onOpenChange(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onOpenChange(false);
    }, 150);
  };

  const handleKeyDown = (e: ReactKeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        onOpenChange(true);
        setTimeout(() => {
          const firstItem = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
          firstItem?.focus();
        }, 0);
      }
      return;
    }

    const menuElement = menuRef.current;
    if (!menuElement) return;

    const focusableElements = menuElement.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]');
    const firstItem = focusableElements[0];
    const lastItem = focusableElements[focusableElements.length - 1];
    const currentIndex = Array.from(focusableElements).findIndex((el) => el === document.activeElement);

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        onOpenChange(false);
        triggerRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (currentIndex === -1) {
          firstItem?.focus();
        } else {
          const nextItem = focusableElements[currentIndex + 1] || firstItem;
          nextItem?.focus();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (currentIndex === -1) {
          lastItem?.focus();
        } else {
          const prevItem = focusableElements[currentIndex - 1] || lastItem;
          prevItem?.focus();
        }
        break;
      case "Tab":
        if (!e.shiftKey && currentIndex === focusableElements.length - 1) {
          e.preventDefault();
          onOpenChange(false);
          triggerRef.current?.focus();
        } else if (e.shiftKey && currentIndex === 0) {
          e.preventDefault();
          onOpenChange(false);
          triggerRef.current?.focus();
        }
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onOpenChange, isOpen]);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={triggerRef}
        onClick={() => onOpenChange(!isOpen)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </div>
      <div
        ref={menuRef}
        className={`absolute right-0 mt-2 bg-white rounded-box shadow-lg z-[1] min-w-[200px] transform transition-all duration-200 origin-top-right ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="menu"
        aria-orientation="vertical"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}
