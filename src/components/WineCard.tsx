import type { Wine } from '../data/wines'

type WineCardProps = {
  wine: Wine
  discountPercent: number
  originalPrice: number
}

const flagByCountry: Record<string, string> = {
  USA: '🇺🇸',
  France: '🇫🇷',
  Italy: '🇮🇹',
  Spain: '🇪🇸',
  'New Zealand': '🇳🇿',
  Australia: '🇦🇺'
}

export function WineCard({ wine, discountPercent, originalPrice }: WineCardProps) {
  return (
    <div className="relative flex gap-4 rounded-card border border-neutral-200 bg-white p-5 shadow-soft">
      <div className="relative flex h-32 w-24 items-center justify-center rounded-[18px] bg-neutral-100">
        <span className="absolute left-2 top-2 rounded-pill bg-wine-600 px-2 py-0.5 text-[11px] font-semibold text-white">
          -{discountPercent}%
        </span>
        <img
          src={wine.imagePath}
          alt={`${wine.name} bottle`}
          className="h-28 w-16 object-contain"
        />
      </div>

      <div className="flex-1">
        <p className="text-xs font-medium text-neutral-500">{wine.winery}</p>
        <h3
          className="mt-1 text-base font-semibold text-neutral-900"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {wine.name} {wine.vintage}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
          <span>{flagByCountry[wine.country] ?? '🌍'}</span>
          {wine.region}
        </p>
        <p className="mt-2 flex items-center gap-2 text-xs text-neutral-600">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-wine-600" fill="currentColor">
            <path d="m12 3.5 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.7 6.6 20.4l1-6.1L3.2 10l6.1-.9L12 3.5Z" />
          </svg>
          <span className="font-semibold text-neutral-800">{wine.rating.toFixed(1)}</span>
          <span>({wine.ratingsCount.toLocaleString()})</span>
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-lg font-semibold text-wine-600">
              ${wine.price.toFixed(2)}
            </p>
            <p className="text-xs text-neutral-400 line-through">
              ${originalPrice.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Bookmark wine"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-700"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M7 4h10v16l-5-3-5 3V4Z" />
              </svg>
            </button>
            <button
              aria-label="Add to cart"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
              className="flex h-11 w-14 items-center justify-center rounded-pill bg-olive-600 text-white shadow-soft"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h2l1 10h9.5l1.2-7H7.2" />
                <circle cx="8" cy="18" r="1.8" />
                <circle cx="16" cy="18" r="1.8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
