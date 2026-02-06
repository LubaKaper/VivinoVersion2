import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ds } from '../styles/designSystem'
import { wines } from '../data/wines'
import { WineCard } from '../components/WineCard'

const wineTypes = [
  'Red',
  'White',
  'Rosé',
  'Sparkling',
  'Orange',
  'Natural',
  'Dessert',
  'Fortified'
]

const tasteGroups = [
  { label: 'Sweetness', options: ['Dry', 'Off-dry', 'Sweet'] },
  { label: 'Body', options: ['Light', 'Medium', 'Full'] },
  { label: 'Freshness', options: ['Soft', 'Acidic'] },
  { label: 'Structure', options: ['Smooth', 'Tannic', 'Bold'] }
]

const priceRanges = ['Under $15', '$15–25', '$25–40', '$40–80', '$80+']

export function TasteProfileEditPage() {
  const navigate = useNavigate()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTastes, setSelectedTastes] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: (next: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value))
      return
    }
    setSelected([...selected, value])
  }

  const chipClass = (selected: boolean) =>
    `inline-flex h-9 items-center justify-center rounded-pill border px-4 text-sm font-semibold outline-none transition-transform transition-shadow duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[#5F7A91]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-[1px] ${
      selected
        ? 'border-[#3F5668] bg-gradient-to-b from-[#7F97AB] to-[#4E667A] text-white -translate-y-[1px] shadow-[0_18px_32px_rgba(0,0,0,0.24)] ring-1 ring-white/25'
        : 'border-neutral-200 bg-white text-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
    }`

  const filteredWines = useMemo(() => {
    // Helper predicates for taste group selections
    const matchesSweetness = (value: number) => {
      if (!selectedTastes.some((item) => ['Dry', 'Off-dry', 'Sweet'].includes(item))) {
        return true
      }
      if (selectedTastes.includes('Dry')) return value <= 2
      if (selectedTastes.includes('Off-dry')) return value === 3
      if (selectedTastes.includes('Sweet')) return value >= 4
      return true
    }

    const matchesBody = (value: number) => {
      if (!selectedTastes.some((item) => ['Light', 'Medium', 'Full'].includes(item))) {
        return true
      }
      if (selectedTastes.includes('Light')) return value <= 2
      if (selectedTastes.includes('Medium')) return value === 3
      if (selectedTastes.includes('Full')) return value >= 4
      return true
    }

    const matchesFreshness = (value: number) => {
      if (!selectedTastes.some((item) => ['Soft', 'Acidic'].includes(item))) {
        return true
      }
      if (selectedTastes.includes('Soft')) return value <= 2
      if (selectedTastes.includes('Acidic')) return value >= 3
      return true
    }

    const matchesStructure = (value: number) => {
      if (!selectedTastes.some((item) => ['Smooth', 'Tannic', 'Bold'].includes(item))) {
        return true
      }
      if (selectedTastes.includes('Smooth')) return value <= 2
      if (selectedTastes.includes('Tannic')) return value >= 3
      if (selectedTastes.includes('Bold')) return value >= 4
      return true
    }

    const matchesPrice = (price: number) => {
      if (selectedPrices.length === 0) return true
      return selectedPrices.some((range) => {
        if (range === 'Under $15') return price < 15
        if (range === '$15–25') return price >= 15 && price <= 25
        if (range === '$25–40') return price > 25 && price <= 40
        if (range === '$40–80') return price > 40 && price <= 80
        if (range === '$80+') return price > 80
        return false
      })
    }

    return wines.filter((wine) => {
      const isNatural = wine.name.toLowerCase().includes('natural')
      const typeSelected =
        selectedTypes.length === 0 ||
        selectedTypes.includes(wine.type) ||
        (selectedTypes.includes('Natural') && isNatural)

      if (!typeSelected) return false

      return (
        matchesSweetness(wine.sweetness) &&
        matchesBody(wine.body) &&
        matchesFreshness(wine.acidity) &&
        matchesStructure(wine.tannin) &&
        matchesPrice(wine.price)
      )
    })
  }, [selectedPrices, selectedTastes, selectedTypes])

  useEffect(() => {
    console.log('Filtered wines:', filteredWines.map((wine) => wine.id))
  }, [filteredWines])

  const handleSave = () => {
    localStorage.setItem(
      'vivinoPreferences',
      JSON.stringify({
        types: selectedTypes,
        tastes: selectedTastes,
        prices: selectedPrices
      })
    )
    navigate('/shop')
  }

  return (
    <div className={ds.page}>
      <div className={`${ds.container} pb-32 pt-8`}>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">My Taste tuner</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Get better Wines
          </p>
        </div>

        <section className="mt-6 rounded-card border border-neutral-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-semibold text-neutral-900">Wine type</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {wineTypes.map((type) => {
              const selected = selectedTypes.includes(type)
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
                  className={chipClass(selected)}
                >
                  {type}
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-6 rounded-card border border-neutral-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-semibold text-neutral-900">Taste profile</h2>
          <div className="mt-4 space-y-4">
            {tasteGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-3">
                  {group.options.map((option) => {
                    const selected = selectedTastes.includes(option)
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          toggleSelection(option, selectedTastes, setSelectedTastes)
                        }
                        className={chipClass(selected)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-card border border-neutral-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-semibold text-neutral-900">Price range</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {priceRanges.map((price) => {
              const selected = selectedPrices.includes(price)
              return (
                <button
                  key={price}
                  type="button"
                  onClick={() => toggleSelection(price, selectedPrices, setSelectedPrices)}
                  className={chipClass(selected)}
                >
                  {price}
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-6 rounded-card border border-neutral-200 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900">Preview</h2>
            <p className="text-xs text-neutral-500">
              Showing {filteredWines.length} of {wines.length} wines
            </p>
          </div>
          <div className="mt-4 grid gap-4">
            {filteredWines.slice(0, 6).map((wine) => (
              <WineCard
                key={wine.id}
                wine={wine}
                discountPercent={20}
                originalPrice={Number((wine.price / 0.8).toFixed(2))}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-[calc(20px+env(safe-area-inset-bottom))]">
        <p className="mb-2 text-center text-xs text-neutral-500">
          Applies to Shop recommendations
        </p>
        <button
          onClick={handleSave}
          className="w-full rounded-pill bg-black py-4 text-base font-semibold text-white shadow-soft"
        >
          Save changes
        </button>
      </div>
    </div>
  )
}
