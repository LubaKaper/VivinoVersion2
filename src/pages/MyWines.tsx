import { Link } from 'react-router-dom'
import { ds } from '../styles/designSystem'

export function MyWines() {
  return (
    <div className={ds.container}>
      <div className="pt-8">
        <h1 className="text-2xl font-semibold text-neutral-900">My Wines</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Your cellar and saved wines will appear here.
        </p>
        <Link
          to="/taste-profile/edit"
          className="mt-5 inline-flex rounded-pill bg-wine-600 px-4 py-2 text-sm font-semibold text-white shadow-soft"
        >
          See your taste profile
        </Link>
      </div>
    </div>
  )
}
