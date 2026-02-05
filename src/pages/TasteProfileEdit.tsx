import { ds } from '../styles/designSystem'

const sliders = [
  { label: 'Sweetness', value: 2 },
  { label: 'Acidity', value: 3 },
  { label: 'Tannin', value: 3 },
  { label: 'Body', value: 4 }
]

export function TasteProfileEdit() {
  return (
    <div className={ds.container}>
      <div className="pt-8">
        <p className={ds.sectionLabel}>Taste profile</p>
        <h1 className={`${ds.title} mt-2`}>Edit preferences</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Update your taste settings to refine recommendations.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        {sliders.map((slider) => (
          <div key={slider.label} className={`${ds.card} p-4`}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-900">
                {slider.label}
              </p>
              <span className="text-xs font-semibold text-neutral-500">
                {slider.value}/5
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              defaultValue={slider.value}
              className="mt-3 w-full accent-wine-600"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button className={ds.primaryButton}>Save changes</button>
        <button className={ds.ghostButton}>Reset</button>
      </div>
    </div>
  )
}
