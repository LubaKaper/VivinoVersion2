import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { wines } from '../data/wines'
import { ds } from '../styles/designSystem'
import { WineCard } from '../components/WineCard'
import { TopBar } from '../components/TopBar'
import { SortFilterRow } from '../components/SortFilterRow'

const discounts = [50, 33, 10, 20, 15, 25, 40, 30, 18, 12, 22, 28, 35, 12, 16, 27, 41, 19]

export function Shop() {
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
      setPreferences({
        types: parsed.types ?? [],
        tastes: parsed.tastes ?? [],
        prices: parsed.prices ?? []
      })
    } catch {
      setPreferences(null)
    }
  }, [])

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
        <div className="mt-3 flex items-center justify-between rounded-pill border border-neutral-200 bg-white px-4 py-2 text-xs text-neutral-600 shadow-soft">
          <span className="truncate">
            Filters: {appliedFilters.join(', ')}
          </span>
          <button
            onClick={handleClear}
            className="ml-3 text-xs font-semibold text-wine-600"
          >
            Clear
          </button>
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
