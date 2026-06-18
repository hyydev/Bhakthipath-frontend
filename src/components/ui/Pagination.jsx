import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "./Button";
import { Text } from "./Typography";

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set([1, totalPages, currentPage]);

  if (currentPage > 2) pages.add(currentPage - 1);
  if (currentPage < totalPages - 1) pages.add(currentPage + 1);
  if (currentPage <= 3) pages.add(2).add(3);
  if (currentPage >= totalPages - 2) pages.add(totalPages - 1).add(totalPages - 2);

  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });

  return result;
}

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  pageSize = 12,
  onPageChange,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className={`flex flex-col items-center gap-4 mt-10 ${className}`}>
      <Text size="sm" className="text-white/60 dark:text-white/60 light:text-dark-900/60">
        Showing {rangeStart}–{rangeEnd} of {totalCount} products
      </Text>

      <nav
        aria-label="Product pagination"
        className="
          inline-flex items-center gap-1 p-1.5 rounded-2xl
          bg-white/5 dark:bg-white/5 border border-white/10
          backdrop-blur-sm shadow-lg
        "
      >
        <IconButton
          size="sm"
          aria-label="Previous page"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </IconButton>

        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="w-8 h-8 flex items-center justify-center text-white/40 text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onPageChange(page)}
              className={`
                min-w-[2rem] h-8 px-2 rounded-xl text-sm font-semibold transition-all duration-300
                ${
                  page === currentPage
                    ? "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white shadow-glow-sm scale-105"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {page}
            </button>
          )
        )}

        <IconButton
          size="sm"
          aria-label="Next page"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </IconButton>
      </nav>
    </div>
  );
}
