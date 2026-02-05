import { useEffect, useMemo, useState } from 'react'
import { ds } from '../styles/designSystem'
import { Chip } from '../components/Chip'

const tasteOptions = [
  'Light & Fresh',
  'Smooth & Easy',
  'Balanced',
  'Bold & Rich',
  'Intense & Powerful'
] as const

const priceOptions = ['Under $15', '$15–$25', '$25–$40', '$40+'] as const

const tasteProfiles = [
  'Everyday Balanced',
  'Bold Reds',
  'Crisp Whites',
  'Rosé Lover',
  'Sparkling Picks',
  'Cellar Favorites'
]

const STORAGE_KEY = 'vivino:taste-preferences'

export function TasteProfileEditPage() {
  const [selectedTaste, setSelectedTaste] = useState<string>('Balanced')
  const [selectedPrice, setSelectedPrice] = useState<string>('$15–$25')
  const [toast, setToast] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as {
        taste?: string
        price?: string
      }
      if (parsed.taste) setSelectedTaste(parsed.taste)
      if (parsed.price) setSelectedPrice(parsed.price)
    } catch {
      return
    }
  }, [])

  const helperText = useMemo(
    () => 'Not sure? Balanced works well for most people.',
    []
  )

  const handleSave = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ taste: selectedTaste, price: selectedPrice })
    )
    setToast('Saved')
    window.setTimeout(() => setToast(''), 1600)
  }

  return (
    <div className={ds.page}>
      <div className={`${ds.container} pb-32`}>
        <div className="pt-8">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Preference tuner
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Get better recommendations by tuning your preferences
          </p>
        </div>

        <section className="mt-8">
          <h2 className="text-sm font-semibold text-neutral-900">Overall taste</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {tasteOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={selectedTaste === option}
                onClick={() => setSelectedTaste(option)}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-neutral-500">{helperText}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-semibold text-neutral-900">Price preference</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {priceOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={selectedPrice === option}
                onClick={() => setSelectedPrice(option)}
              />
            ))}
          </div>
        </section>

        <div className="mt-8 rounded-card border border-neutral-200 bg-white px-4 py-3 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg">⚙️</span>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Advanced taste profile
                </p>
                <p className="text-xs text-neutral-400">Coming soon</p>
              </div>
            </div>
            <span className="text-lg text-neutral-400">›</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            Taste profiles
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tasteProfiles.map((profile) => (
              <span
                key={profile}
                className="rounded-pill border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-500"
              >
                {profile}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-6">
        <button
          onClick={handleSave}
          className="w-full rounded-pill bg-black py-4 text-base font-semibold text-white shadow-soft"
        >
          Save changes
        </button>
      </div>

      {toast ? (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-pill bg-black px-4 py-2 text-xs font-semibold text-white shadow-soft">
          {toast}
        </div>
      ) : null}
    </div>
  )
}
