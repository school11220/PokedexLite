"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, currentPage]);

  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page > 1 && page < totalPages) {
      pages.add(page);
    }
  }

  return Array.from(pages).sort((left, right) => left - right);
}

export function Pagination({
  currentPage,
  totalPages,
  disabled = false,
  onPageChange
}: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const canGoBack = currentPage > 1 && !disabled;
  const canGoForward = currentPage < totalPages && !disabled;

  return (
    <nav className="flex justify-center pb-8 pt-4" aria-label="Pagination">
      <div className="flex items-center gap-2 rounded-full border border-white/5 bg-surface-container p-1 shadow-lg">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition hover:bg-white/5 hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoBack}
          aria-label="Previous page"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {visiblePages.map((page, index) => {
            const previousPage = visiblePages[index - 1];
            const needsGap = previousPage && page - previousPage > 1;

            return (
              <div key={page} className="flex items-center gap-1">
                {needsGap ? <span className="px-1 text-on-surface-variant">...</span> : null}
                <button
                  type="button"
                  className={cn(
                    "flex h-10 min-w-10 items-center justify-center rounded-full px-3 font-display text-sm font-bold transition disabled:cursor-default",
                    page === currentPage
                      ? "bg-primary-container text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                      : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                  )}
                  onClick={() => onPageChange(page)}
                  disabled={disabled || page === currentPage}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              </div>
            );
          })}
        </div>

        <span className="px-3 font-display text-sm font-bold text-on-surface sm:hidden">
          {currentPage}/{totalPages}
        </span>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition hover:bg-white/5 hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoForward}
          aria-label="Next page"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
