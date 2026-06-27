import { useCallback, useEffect, useRef, useState, Children } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "./Button";

export function Pager({
  children,
  className = "",
  showControls = true,
  showDots = true,
}) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const itemCount = Children.count(children);

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);

    const items = container.querySelectorAll("[data-pager-item]");
    if (!items.length) return;

    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      const distance = Math.abs(item.offsetLeft - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    updateScrollState();
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, itemCount]);

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    const items = container.querySelectorAll("[data-pager-item]");
    const target = items[index];
    if (!target) return;

    container.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };

  const scrollByDirection = (direction) => {
    const nextIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, itemCount - 1)
        : Math.max(activeIndex - 1, 0);
    scrollToIndex(nextIndex);
  };

  const needsControls = itemCount > 1;

  return (
    <div className="relative">
      {showControls && needsControls && (
        <>
          <IconButton
            size="md"
            aria-label="Previous slide"
            disabled={!canScrollLeft}
            onClick={() => scrollByDirection("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </IconButton>

          <IconButton
            size="md"
            aria-label="Next slide"
            disabled={!canScrollRight}
            onClick={() => scrollByDirection("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:hidden disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </IconButton>
        </>
      )}

      <div
        ref={scrollRef}
        data-lenis-prevent
        className={`
          flex overflow-x-auto md:grid md:grid-cols-4 gap-6 pb-4
          snap-x snap-mandatory scroll-smooth no-scrollbar
          -mx-4 px-4 md:mx-0 md:px-0
          ${className}
        `}
      >
        {children}
      </div>

      {showDots && needsControls && (
        <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
          {Array.from({ length: itemCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${
                  activeIndex === index
                    ? "w-6 bg-gradient-to-r from-saffron-500 to-saffron-700 dark:from-primary-400 dark:to-purple-500"
                    : "w-2 bg-ink-200 hover:bg-ink-300 dark:bg-white/20 dark:hover:bg-white/40"
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function PagerItem({ children, className = "" }) {
  return (
    <div
      data-pager-item
      className={`flex-shrink-0 w-2/3 sm:w-1/2 md:w-full snap-start snap-always ${className}`}
    >
      {children}
    </div>
  );
}
