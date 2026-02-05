type TopBarProps = {
  title: string
  count: number
}

export function TopBar({ title, count }: TopBarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-baseline gap-2">
        <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
        <span className="text-sm font-medium text-neutral-400">
          {count.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label="View cart"
          className="flex h-11 w-11 items-center justify-center text-2xl text-neutral-900"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M4 5.5h2.3l1.2 10.2h9.6l1.4-7.4H7.2L6.9 6.2H4v-.7Z" />
            <circle cx="9" cy="18.2" r="1.6" />
            <circle cx="16.6" cy="18.2" r="1.6" />
          </svg>
        </button>
        <button
          aria-label="Search"
          className="flex h-11 w-11 items-center justify-center text-2xl text-neutral-900"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
