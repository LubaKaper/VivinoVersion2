import { useEffect, useState } from 'react'
import { ds } from '../styles/designSystem'

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
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTastes, setSelectedTastes] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle')

  useEffect(() => {
    const stored = localStorage.getItem('vivinoPreferences')
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as {
        types?: string[]
        tastes?: string[]
        prices?: string[]
      }
      setSelectedTypes(Array.isArray(parsed.types) ? parsed.types : [])
      setSelectedTastes(Array.isArray(parsed.tastes) ? parsed.tastes : [])
      setSelectedPrices(Array.isArray(parsed.prices) ? parsed.prices : [])
    } catch {
      // ignore malformed storage
    }
  }, [])

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

  const handleSave = () => {
    localStorage.setItem(
      'vivinoPreferences',
      JSON.stringify({
        types: selectedTypes,
        tastes: selectedTastes,
        prices: selectedPrices
      })
    )
    setSaveStatus('saved')
    window.setTimeout(() => setSaveStatus('idle'), 1500)
  }

  return (
    <div className={ds.page}>
      <div className={`${ds.container} pb-48 pt-8`}>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">My Taste tuner</h1>
          <p className="mt-2 text-sm text-neutral-500">Get better wines</p>
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

      </div>

      <div className="fixed bottom-[84px] left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-5 pb-[calc(20px+env(safe-area-inset-bottom))]">
        <button
          onClick={handleSave}
          className="w-full rounded-pill border border-[#3F5668] bg-gradient-to-b from-[#7F97AB] to-[#4E667A] py-3 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(0,0,0,0.24)] ring-1 ring-white/25 transition-transform duration-150 ease-out active:translate-y-[1px]"
        >
          {saveStatus === 'saved' ? 'Saved' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}
