import { useParams, Navigate } from 'react-router-dom'
import { wines } from '../data/wines'
import { WineHeroBackground } from '../components/detail/WineHeroBackground'
import { WineDetailsSheet } from '../components/detail/WineDetailsSheet'

export function WineDetailPage() {
  const { id } = useParams<{ id: string }>()
  const wine = wines.find((w) => w.id === id)
  
  // If wine not found, redirect to shop
  if (!wine) {
    return <Navigate to="/shop" replace />
  }
  
  return (
    <div className="relative min-h-screen bg-white">
      {/* Layer 1: Fixed background with bottle and rating */}
      <WineHeroBackground wine={wine} />
      
      {/* Layer 2: Scrollable details sheet */}
      <WineDetailsSheet wine={wine} />
    </div>
  )
}