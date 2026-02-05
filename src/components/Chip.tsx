type ChipProps = {
  label: string
  selected?: boolean
  onClick?: () => void
}

export function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-pill border px-4 py-2 text-sm font-semibold shadow-soft transition ${
        selected
          ? 'border-wine-600 bg-wine-600 text-white'
          : 'border-neutral-200 bg-white text-neutral-700'
      }`}
      aria-pressed={selected}
    >
      {label}
    </button>
  )
}
