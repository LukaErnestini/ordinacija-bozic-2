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

  // Calculate current section based on scroll position
  const calculateCurrentSection = useCallback(() => {
    const elements = items.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    
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
    if (firstElement) {
      const rect = firstElement.getBoundingClientRect();
      setIsVisible(rect.top < window.innerHeight);
    }
  }, [items]);

  useEffect(() => {
    const handleScroll = () => {
      calculateCurrentSection();
      checkVisibility();
    };

    // Initial calculation
    setTimeout(() => {
      calculateCurrentSection();
      checkVisibility();
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [calculateCurrentSection, checkVisibility]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120; // Account for fixed header
      const elementPosition = element.offsetTop - headerOffset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDotClick = (id: string, index: number) => {
    if (isExpanded) {
      scrollToSection(id);
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  if (!isVisible || items.length === 0) return null;

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40">
      {/* Dots on the edge */}
      <div className="flex flex-col gap-3 ml-2">
        {items.map((item, index) => {
          const isCurrent = index === currentSectionIndex;
          
          return (
            <button
              key={`dot-${item.id}`}
              onClick={() => handleDotClick(item.id, index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300 relative
                hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                ${isCurrent 
                  ? 'bg-primary scale-110 shadow-lg shadow-primary/30' 
                  : 'bg-primary/50 hover:bg-primary/70'
                }
              `}
              aria-label={`Pojdi na ${item.title}`}
              title={item.title}
            />
          );
        })}
      </div>

      {/* Expanded titles panel */}
      <div className={`
        absolute left-8 top-1/2 transform -translate-y-1/2
        bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-primary/10
        transition-all duration-500 ease-out overflow-hidden
        ${isExpanded ? 'w-72 opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none'}
      `}>
        <div className="p-6 w-72">
          <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
            Kazalo
          </h3>
          
          {/* Simple list of all titles */}
          <div className="space-y-2">
            {items.map((item, index) => {
              const isCurrent = index === currentSectionIndex;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsExpanded(false);
                  }}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg
                    transition-all duration-300 ease-out relative
                    hover:bg-primary/5 hover:text-primary group
                    ${isCurrent 
                      ? 'bg-primary/10 text-primary font-semibold' 
                      : 'text-gray-700'
                    }
                  `}
                  style={{
                    transform: isCurrent ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'left center'
                  }}
                >
                  <span className={`block whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${
                    isCurrent ? 'text-base' : 'text-sm'
                  }`}
                  style={{ width: '100%' }}
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
          
          {/* Close hint */}
          <div className="mt-4 pt-3 border-t border-primary/10">
            <p className="text-xs text-gray-500 text-center whitespace-nowrap">
              Kliknite naslov ali kje koli drugje za zapiranje
            </p>
          </div>
        </div>
      </div>

      {/* Invisible overlay to close when clicking outside */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingTOC; 