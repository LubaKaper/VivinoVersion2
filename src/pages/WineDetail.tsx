import { useParams, Link } from 'react-router-dom'
import { wines } from '../data/wines'
import { ds } from '../styles/designSystem'

export function WineDetail() {
  const { id } = useParams()
  const wine = wines.find((item) => item.id === id) ?? wines[0]

  return (
    <div className="relative">
      <div className={ds.container}>
        <div className="pt-8">
          <Link
            to="/shop"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400"
          >
            Back to shop
          </Link>
          <h1 className={`${ds.title} mt-3`}>{wine.name}</h1>
          <p className="text-sm text-neutral-500">
            {wine.winery} · {wine.region}, {wine.country}
          </p>
        </div>

        <div
          className="mt-6 h-56 w-full rounded-card"
          style={{ backgroundImage: wine.imageGradient }}
        />

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              {wine.type} · {wine.vintage}
            </p>
            <p className="mt-2 text-lg font-semibold text-neutral-900">
              ${wine.price}
            </p>
          </div>
          <button className={ds.buyButton}>Buy now</button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {wine.notes.map((note) => (
            <span key={note} className={ds.chip}>
              {note}
            </span>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-6">
        <div className="rounded-sheet bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Taste profile
              </p>
              <h2 className="mt-1 text-lg font-semibold text-neutral-900">
                Balanced · Silky
              </h2>
            </div>
            <Link to="/taste-profile/edit" className={ds.ghostButton}>
              Edit
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-neutral-500">
            <div>
              <p className="font-semibold text-neutral-900">Sweetness</p>
              <p>{wine.sweetness}/5</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Acidity</p>
              <p>{wine.acidity}/5</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Tannin</p>
              <p>{wine.tannin}/5</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Body</p>
              <p>{wine.body}/5</p>
            </div>
          </div>

          <div className="mt-4 rounded-card border border-neutral-100 bg-cream px-4 py-3 text-xs text-neutral-600">
            Best with {wine.foodPairing.join(', ')}.
          </div>
        </div>
      </div>
    </div>
  )
}
