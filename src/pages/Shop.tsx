import { Link } from 'react-router-dom'
import { wines } from '../data/wines'
import { ds } from '../styles/designSystem'
import { WineCard } from '../components/WineCard'
import { TopBar } from '../components/TopBar'
import { SortFilterRow } from '../components/SortFilterRow'

const discounts = [50, 33, 10, 20, 15, 25, 40, 30, 18, 12]

export function Shop() {
  const rows = Array.from({ length: 10 }, (_, index) => {
    const wine = wines[index % wines.length]
    const discountPercent = discounts[index % discounts.length]
    const originalPrice = Number((wine.price / (1 - discountPercent / 100)).toFixed(2))
    return { wine, discountPercent, originalPrice }
  })

  return (
    <div className={ds.container}>
      <div className="pt-6">
        <TopBar title="Shop" count={30732} />
        <SortFilterRow />
      </div>

      <div className="mt-6 grid gap-7 pb-6">
        {rows.map(({ wine, discountPercent, originalPrice }, index) => (
          <Link key={`${wine.id}-${index}`} to={`/wine/${wine.id}`}>
            <WineCard
              wine={wine}
              discountPercent={discountPercent}
              originalPrice={originalPrice}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
