"use client";

import { useState, useEffect, useCallback } from "react";

interface TOCItem {
  id: string;
  title: string;
}

interface FloatingTOCProps {
  items: TOCItem[];
}

const FloatingTOC: React.FC<FloatingTOCProps> = ({ items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  // Check if screen is wide enough for default open state
  const checkScreenSize = useCallback(() => {
    const isWide = window.innerWidth >= 1280; // xl breakpoint
    setIsWideScreen(isWide);
    // Set default open state on wide screens
    if (isWide && !isExpanded) {
      setIsExpanded(true);
    }
  }, [isExpanded]);

  // Calculate current section based on scroll position
  const calculateCurrentSection = useCallback(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const scrollCenter = scrollTop + windowHeight / 2;

    // Find current section
    let currentIndex = 0;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const rect = element.getBoundingClientRect();
      const elementTop = scrollTop + rect.top;
      const elementBottom = elementTop + rect.height;

      // Check if we're in this section
      if (scrollCenter >= elementTop && scrollCenter <= elementBottom) {
        currentIndex = i;
        break;
      } else if (scrollCenter < elementTop) {
        // We're before this section, so we're in the previous one
        currentIndex = Math.max(0, i - 1);
        break;
      } else if (i === elements.length - 1 && scrollCenter > elementBottom) {
        // We're past the last section
        currentIndex = i;
      }
    }

    setCurrentSectionIndex(currentIndex);
  }, [items]);

  // Check if TOC should be visible
  const checkVisibility = useCallback(() => {
    const firstElement = document.getElementById(items[0]?.id);
    const lastElement = document.getElementById(items[items.length - 1]?.id);
    
    if (firstElement && lastElement) {
      const firstRect = firstElement.getBoundingClientRect();
      const lastRect = lastElement.getBoundingClientRect();
      const headerOffset = 120; // Account for fixed header
      
      // Show TOC when:
      // 1. The first article has reached the top (below header)
      // 2. AND the last article hasn't completely passed above the viewport
      const firstArticleReached = firstRect.top <= headerOffset;
      const lastArticleStillVisible = lastRect.bottom > headerOffset;
      
      setIsVisible(firstArticleReached && lastArticleStillVisible);
    }
  }, [items]);

  useEffect(() => {
    const handleScroll = () => {
      calculateCurrentSection();
      checkVisibility();
    };

    const handleResize = () => {
      checkScreenSize();
      calculateCurrentSection();
      checkVisibility();
    };

    // Initial calculation
    setTimeout(() => {
      checkScreenSize();
      calculateCurrentSection();
      checkVisibility();
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateCurrentSection, checkVisibility, checkScreenSize]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120; // Account for fixed header
      const elementPosition = element.offsetTop - headerOffset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const handleContainerClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else if (!isWideScreen) {
      // Only close on narrow screens
      setIsExpanded(false);
    }
  };

  const handleTitleClick = (id: string) => {
    scrollToSection(id);
    // Only close if not on wide screen
    if (!isWideScreen) {
      setIsExpanded(false);
    }
  };

  if (!isVisible || items.length === 0) return null;

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50">
      {/* Main container - clickable to toggle */}
      <div 
        className="relative cursor-pointer"
        onClick={handleContainerClick}
      >
        {/* TOC Panel - slides in from left, pushing dots to the right */}
        <div
          className={`
            bg-white/95 backdrop-blur-sm rounded-r-2xl shadow-2xl border border-primary/10
            transition-all duration-500 ease-out overflow-hidden
            ${isExpanded ? "w-72 opacity-100" : "w-0 opacity-0"}
          `}
        >
          <div className="p-6 w-72">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                Kazalo
              </h3>
              {!isWideScreen && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                  aria-label="Zapri kazalo"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Simple list of all titles */}
            <div className="space-y-2">
              {items.map((item, index) => {
                const isCurrent = index === currentSectionIndex;

                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent container click
                      handleTitleClick(item.id);
                    }}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg
                      transition-all duration-300 ease-out relative
                      hover:bg-primary/5 hover:text-primary group
                      ${
                        isCurrent
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-gray-700"
                      }
                    `}
                    style={{
                      transform: isCurrent ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "left center",
                    }}
                  >
                    <span
                      className={`block whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${
                        isCurrent ? "text-base" : "text-sm"
                      }`}
                      style={{ width: "100%" }}
                    >
                      {item.title}
                    </span>

                    {isCurrent && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full -ml-3" />
                    )}

                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </button>
                );
              })}
            </div>

            {/* Instructions */}
            <div className="mt-4 pt-3 border-t border-primary/10">
              <p className="text-xs text-gray-500 text-center whitespace-nowrap">
                {isWideScreen ? "Kliknite naslov za navigacijo" : "Kliknite naslov za navigacijo"}
              </p>
            </div>
          </div>
        </div>

        {/* Dots positioned on the right side of the panel */}
        <div 
          className={`
            absolute top-1/2 transform -translate-y-1/2 flex flex-col gap-3
            transition-all duration-500 ease-out
            ${isExpanded ? "left-72 ml-2" : "left-0 ml-2"}
          `}
        >
          {items.map((item, index) => {
            const isCurrent = index === currentSectionIndex;

            return (
              <div
                key={`dot-${item.id}`}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300 relative
                  hover:scale-125 cursor-pointer
                  ${
                    isCurrent
                      ? "bg-primary scale-110 shadow-lg shadow-primary/30"
                      : "bg-primary/50 hover:bg-primary/70"
                  }
                `}
                title={item.title}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isExpanded) {
                    handleTitleClick(item.id);
                  } else {
                    setIsExpanded(true);
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Invisible overlay to close when clicking outside on narrow screens */}
      {isExpanded && !isWideScreen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingTOC;