import { Link } from 'react-router-dom'
import type { Wine } from '../../data/wines'

type WineHeroBackgroundProps = {
  wine: Wine
}

export function WineHeroBackground({ wine }: WineHeroBackgroundProps) {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #F5E6D3 0%, #FFF8F0 50%, #FFFFFF 100%)' }}
      />
      
      {/* Header buttons - positioned at top */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-4">
        <div className="mx-auto w-full max-w-[430px] flex items-center justify-between px-5">
          {/* Back button */}
          <Link
            to="/shop"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          
          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <button 
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition"
              aria-label="Share wine"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            
            <button 
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition"
              aria-label="Shopping cart"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {/* Cart badge */}
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                2
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content - Bottle and Rating */}
      <div className="absolute top-24 left-0 right-0">
        <div className="mx-auto w-full max-w-[430px] px-5">
          <div className="relative flex items-start gap-0">
            
            {/* LEFT: Wine bottle with save badge */}
            <div className="relative w-[225px] flex-shrink-0">
              <img 
                src={`${baseUrl}${wine.imagePath.replace(/^\//, '')}`}
                alt={`${wine.name} bottle`}
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
              
              {/* Save badge - only show if there's a discount */}
              {wine.price < 60 && (
                <div className="absolute bottom-8 left-0 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-black shadow-lg">
                  <span className="text-xs font-semibold text-white">save</span>
                  <span className="text-xl font-bold text-white">38%</span>
                </div>
              )}
            </div>
            
            {/* RIGHT: Rating bubble (independent positioning) */}
            <div className="flex flex-1 justify-end">
              <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border border-gray-100 bg-white shadow-xl">
                <div className="text-5xl font-bold text-gray-900">
                  {wine.rating.toFixed(1)}
                </div>
                <div className="my-1 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(wine.rating) 
                          ? 'fill-current text-red-600' 
                          : 'fill-current text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  {wine.ratingsCount.toLocaleString()} ratings
                </div>
              </div>
            </div>
          </div>
          
     {/* Match for You pill - same positioning method as rating bubble */}
<div className="flex justify-end -mt-36">
  <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-100 to-pink-100 px-0 py-6 shadow-sm hover:shadow-md transition">
    <span className="text-2xl">✨</span>
    <span className="text-sm font-medium text-gray-800">
      Match for You
    </span>
    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
        </div>
      </div>
    </div>
  )
}