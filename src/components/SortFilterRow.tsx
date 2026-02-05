export function SortFilterRow() {
  return (
    <div className="mt-3 flex items-center gap-10 border-b border-neutral-200 pb-3">
      <button
        aria-label="Sort wines"
        className="flex items-center gap-2 text-sm font-semibold text-neutral-900"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 4v14" />
          <path d="m4 7 3-3 3 3" />
          <path d="M17 20V6" />
          <path d="m14 17 3 3 3-3" />
        </svg>
        <span className="border-b border-neutral-900 pb-0.5">Sort</span>
      </button>
      <button
        aria-label="Filter wines"
        className="flex items-center gap-2 text-sm font-semibold text-neutral-900"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 6h16" />
          <circle cx="8" cy="6" r="2" fill="white" />
          <path d="M4 12h16" />
          <circle cx="16" cy="12" r="2" fill="white" />
          <path d="M4 18h16" />
          <circle cx="10" cy="18" r="2" fill="white" />
        </svg>
        <span className="border-b border-neutral-900 pb-0.5">Filter</span>
      </button>
    </div>
  )
}
