import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { WineDetailPage } from './pages/WineDetailPage'
import { TasteProfileEditPage } from './pages/TasteProfileEditPage'
import { More } from './pages/More'
import { Camera } from './pages/Camera'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/shop" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wine/:id" element={<WineDetailPage />} />
        <Route path="/taste-profile/edit" element={<TasteProfileEditPage />} />
        <Route path="/more" element={<More />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </AppShell>
  )
}

export default App
