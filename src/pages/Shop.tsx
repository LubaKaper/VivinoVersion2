import { Link, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { wines } from '../data/wines'
import { ds } from '../styles/designSystem'
import { WineCard } from '../components/WineCard'
import { TopBar } from '../components/TopBar'
import { SortFilterRow } from '../components/SortFilterRow'

const discounts = [50, 33, 10, 20, 15, 25, 40, 30, 18, 12, 22, 28, 35, 12, 16, 27, 41, 19]

export function Shop() {
  const location = useLocation()
  const [preferences, setPreferences] = useState<{
    types: string[]
    tastes: string[]
    prices: string[]
  } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('vivinoPreferences')
    if (!stored) {
      setPreferences(null)
      return
    }
    try {
      const parsed = JSON.parse(stored) as {
        types?: string[]
        tastes?: string[]
        prices?: string[]
      }
      const nextPreferences = {
        types: parsed.types ?? [],
        tastes: parsed.tastes ?? [],
        prices: parsed.prices ?? []
      }
      const hasFilters =
        nextPreferences.types.length > 0 || nextPreferences.prices.length > 0
      setPreferences(hasFilters ? nextPreferences : null)
    } catch {
      setPreferences(null)
    }
  }, [location.key])

  const filteredWines = useMemo(() => {
    if (!preferences) return wines

    const matchesType = (type: string) => {
      if (!preferences.types.length) return true
      return preferences.types.includes(type)
    }

    const matchesPrice = (price: number) => {
      if (!preferences.prices.length) return true
      return preferences.prices.some((range) => {
        if (range === 'Under $15') return price < 15
        if (range === '$15–25') return price >= 15 && price < 25
        if (range === '$25–40') return price >= 25 && price < 40
        if (range === '$40–80') return price >= 40 && price < 80
        if (range === '$80+') return price >= 80
        return false
      })
    }

    return wines.filter((wine) => {
      // TODO: taste filtering will be added when model mappings are defined.
      return matchesType(wine.type) && matchesPrice(wine.price)
    })
  }, [preferences])

  const appliedFilters = useMemo(() => {
    if (!preferences) return [] as string[]
    return [...preferences.types, ...preferences.prices].filter(Boolean)
  }, [preferences])

  const handleClear = () => {
    localStorage.removeItem('vivinoPreferences')
    setPreferences(null)
  }
  return (
    <div className={ds.container}>
      <div className="pt-6">
        <TopBar title="Shop" count={30732} />
        <SortFilterRow />
      </div>

      {appliedFilters.length ? (
        <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
          <span>Filtered by your taste preferences</span>
          <button
            onClick={handleClear}
            className="text-xs font-semibold text-wine-600"
          >
            Clear filters
          </button>
        </div>
      ) : null}

      {filteredWines.length === 0 ? (
        <div className="mt-6 rounded-card border border-neutral-200 bg-white p-5 text-sm text-neutral-600 shadow-soft">
          No wines match your current taste. Try adjusting My Taste.
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 pb-6">
        {filteredWines.map((wine, index) => {
          const discountPercent = discounts[index % discounts.length]
          const originalPrice = Number((wine.price / (1 - discountPercent / 100)).toFixed(2))

          return (
            <Link key={`${wine.id}-${index}`} to={`/wine/${wine.id}`}>
              <WineCard
                wine={wine}
                discountPercent={discountPercent}
                originalPrice={originalPrice}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
