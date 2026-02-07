import type { Wine } from '../../data/wines'
import { BottomSheet } from '../BottomSheet'

type WineDetailsSheetProps = {
  wine: Wine
}

// Helper to get country flag emoji
const getCountryFlag = (country: string): string => {
  const flagMap: Record<string, string> = {
    'USA': '🇺🇸',
    'France': '🇫🇷',
    'Italy': '🇮🇹',
    'Spain': '🇪🇸',
    'Australia': '🇦🇺',
    'New Zealand': '🇳🇿',
    'Germany': '🇩🇪',
    'Slovenia': '🇸🇮',
    'Georgia': '🇬🇪'
  }
  return flagMap[country] || '🌍'
}

export function WineDetailsSheet({ wine }: WineDetailsSheetProps) {
  const originalPrice = 60 // Hardcoded for now, could come from wine data
  const hasDiscount = wine.price < originalPrice
  const discountPercent = hasDiscount ? Math.round(((originalPrice - wine.price) / originalPrice) * 100) : 0

  return (
    <BottomSheet
      collapsedRatio={0.28}
      expandedRatio={0.85}
      collapsedContent={
        <div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <button className="flex items-center gap-2 rounded-full border-2 border-gray-800 px-6 py-2.5 transition hover:bg-gray-50">
              <svg className="h-5 w-5 fill-current text-orange-500" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="font-semibold text-gray-800">Rate</span>
            </button>

            <button className="flex items-center gap-2 rounded-full border-2 border-gray-800 px-6 py-2.5 transition hover:bg-gray-50">
              <svg className="h-5 w-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-semibold text-gray-800">Actions</span>
            </button>
          </div>

          <h2 className="text-base font-medium text-gray-500 mb-1">{wine.winery}</h2>
          <h1 className="text-2xl font-bold text-gray-900">{wine.name} {wine.vintage}</h1>
        </div>
      }
      expandedContent={
        <div className="pb-6">
          <div className="flex items-center gap-2 text-gray-700 mb-6">
            <span className="text-2xl">{getCountryFlag(wine.country)}</span>
            <p className="text-base">
              {wine.type} wine from {wine.region}, {wine.country}
            </p>
          </div>

          <div className="flex items-center justify-between mb-4 border-t border-gray-100 pt-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900">
                ${wine.price.toFixed(2)}
              </span>
              <span className="text-lg text-gray-600">/bottle</span>
            </div>

            {hasDiscount && (
              <div className="flex items-center gap-2">
                <span className="text-lg text-gray-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-green-600">-{discountPercent}%</span>
              </div>
            )}
          </div>

          <button className="w-full rounded-full bg-green-600 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg">
            Buy now
          </button>
        </div>
      }
    />
  )
}