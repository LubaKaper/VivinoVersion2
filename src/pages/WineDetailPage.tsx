import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { wines } from '../data/wines'
import { ds } from '../styles/designSystem'
import { BottomSheet } from '../components/BottomSheet'

const vineyardImage = '/images/backgrounds/vineyard.svg'

export function WineDetailPage() {
  const { id } = useParams()
  const wine = wines.find((item) => item.id === id)
  const [showMatchInfo, setShowMatchInfo] = useState(false)

  const matchInfo = useMemo(() => {
    const stored = localStorage.getItem('vivino:taste-preferences')
    if (!stored) return 'Uses your taste and price preferences when available.'
    try {
      const parsed = JSON.parse(stored) as { taste?: string; price?: string }
      return `Uses your taste (${parsed.taste ?? 'Balanced'}) and price (${parsed.price ?? '$15–$25'}) preferences.`
    } catch {
      return 'Uses your taste and price preferences when available.'
    }
  }, [])

  if (!wine) {
    return (
      <div className={ds.container}>
        <div className="pt-10">
          <h1 className={ds.title}>Wine not found</h1>
          <p className="mt-2 text-sm text-neutral-500">
            The wine you requested does not exist.
          </p>
          <Link to="/shop" className="mt-4 inline-flex text-sm font-semibold text-wine-600">
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  const collapsedContent = (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {wine.winery}
      </p>
      <h2 className="mt-2 text-xl font-semibold text-neutral-900">{wine.name}</h2>
      <p className="mt-1 text-sm text-neutral-500">
        {wine.region}, {wine.country}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            {wine.type} · {wine.vintage}
          </p>
          <p className="mt-2 text-2xl font-semibold text-wine-600">
            ${wine.price.toFixed(2)}
          </p>
        </div>
        <button className={ds.buyButton}>Buy now</button>
      </div>
    </div>
  )

  const expandedContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-card border border-neutral-100 bg-cream px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Available at
          </p>
          <p className="mt-1 text-sm font-semibold text-neutral-900">Vivino Market</p>
        </div>
        <button className={ds.ghostButton}>Visit seller</button>
      </div>

      <div className="rounded-card border border-neutral-100 px-4 py-3">
        <p className="text-sm font-semibold text-neutral-900">
          Discover if wines match you
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          Connect your taste profile to get personalized picks.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Summary
        </h3>
        <p className="mt-2 text-sm text-neutral-600">
          {wine.notes.join(', ')} with a {wine.body}/5 body and {wine.acidity}/5 acidity.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Region
        </h3>
        <p className="mt-2 text-sm text-neutral-600">
          {wine.region}, {wine.country}
        </p>
      </div>
    </div>
  )

  return (
    <div className="relative min-h-screen bg-cream">
      <div className="relative h-[360px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${vineyardImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

        <div className={ds.container}>
          <div className="relative z-10 pt-6">
            <div className="flex items-center justify-between">
              <Link
                to="/shop"
                aria-label="Go back"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-neutral-900 shadow-soft"
              >
                ←
              </Link>
              <div className="flex items-center gap-3">
                <button
                  aria-label="Share"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg text-neutral-900 shadow-soft"
                >
                  ↗
                </button>
                <button
                  aria-label="Cart"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg text-neutral-900 shadow-soft"
                >
                  🛒
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div className="relative">
                <img
                  src={wine.imagePath}
                  alt={`${wine.name} bottle`}
                  className="h-56 drop-shadow-xl"
                />
              </div>

              <div className="w-36 rounded-card bg-white/90 p-3 shadow-soft">
                <p className="text-2xl font-semibold text-neutral-900">4.6</p>
                <div className="mt-1 text-sm text-wine-600">★★★★★</div>
                <p className="mt-2 text-xs text-neutral-500">
                  Rating based on all vintages
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="inline-flex rounded-pill bg-gradient-to-r from-wine-600/20 via-wine-400/20 to-olive-500/20 p-1">
                <button
                  onClick={() => setShowMatchInfo(true)}
                  className="rounded-pill bg-white px-4 py-1 text-xs font-semibold text-neutral-700 shadow-soft"
                  aria-label="What does match for you mean?"
                >
                  Match for You
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomSheet collapsedContent={collapsedContent} expandedContent={expandedContent} />

      {showMatchInfo ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 px-5 pb-10">
          <div className="w-full max-w-[430px] rounded-card bg-white p-5 shadow-card">
            <h3 className="text-sm font-semibold text-neutral-900">Match for you</h3>
            <p className="mt-2 text-sm text-neutral-600">{matchInfo}</p>
            <button
              onClick={() => setShowMatchInfo(false)}
              className="mt-4 w-full rounded-pill bg-black py-2 text-sm font-semibold text-white"
            >
              Got it
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
