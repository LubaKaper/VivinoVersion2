import type { ReactNode } from 'react'
import { BottomNav } from './BottomNav'
import { ds } from '../styles/designSystem'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className={ds.page}>
      <div className="pb-28">{children}</div>
      <BottomNav />
    </div>
  )
}
