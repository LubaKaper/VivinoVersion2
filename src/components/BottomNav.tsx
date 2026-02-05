import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/home', icon: 'home' },
  { label: 'Shop', to: '/shop', icon: 'shop' },
  { label: 'Camera', to: '/camera', icon: 'camera', isCenter: true },
  { label: 'My Wines', to: '/my-wines', icon: 'bottle' },
  { label: 'More', to: '/more', icon: 'more' }
]

const iconClass = 'h-6 w-6'

const icons = {
  home: (className: string) => (
    <svg
      viewBox="0 0 24 24"
      className={`${iconClass} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10.5V20h13V10.5" />
    </svg>
  ),
  shop: (className: string) => (
    <svg
      viewBox="0 0 24 24"
      className={`${iconClass} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9h12l-1 11H7L6 9Z" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  camera: (className: string) => (
    <svg
      viewBox="0 0 24 24"
      className={`h-7 w-7 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h4l1.5-2h5L16 7h4v11H4V7Z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  ),
  bottle: (className: string) => (
    <svg
      viewBox="0 0 24 24"
      className={`${iconClass} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 2.5h4v3.2l-.8.8v4.8l1.9 3a5.2 5.2 0 1 1-8.2 0l1.9-3V6.5l-.8-.8V2.5Z" />
      <path d="M16 7h4" />
      <path d="M16.5 7v6.2a2.5 2.5 0 0 0 2.5 2.5" />
      <path d="M19.5 7v6.2a2.5 2.5 0 0 1-2.5 2.5" />
      <path d="M18 15.7v3.3" />
      <path d="M15.8 20h4.4" />
    </svg>
  ),
  more: (className: string) => (
    <svg viewBox="0 0 24 24" className={`${iconClass} ${className}`} fill="currentColor">
      <circle cx="5" cy="12" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="19" cy="12" r="1.7" />
    </svg>
  )
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30">
      <div className="mx-auto w-full max-w-[430px]">
        {/* Keep this bar compact; NO notch circle */}
        <div className="relative rounded-t-[16px] bg-wine-700 px-5 pt-2 pb-[calc(6px+env(safe-area-inset-bottom))] shadow-nav">
          {/* subtle top divider */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-white/10" />

          {/* Tabs row */}
          <div className="relative z-20 flex items-end justify-between">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
              >
                {({ isActive }) => {
                  const iconColor = item.isCenter
                    ? 'text-wine-700'
                    : isActive
                      ? 'text-white'
                      : 'text-white/70'

                  return (
                    <div
                      className={`flex flex-col items-center gap-1 ${
                        isActive ? 'text-white' : 'text-white/70'
                      }`}
                    >
                      <span
                        className={
                          item.isCenter
                            ? 'relative z-30 -mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg'
                            : 'relative z-20 flex h-10 w-10 items-center justify-center'
                        }
                      >
                        {icons[item.icon as keyof typeof icons](iconColor)}
                      </span>
                      <span className="text-[10px] font-medium leading-none">
                        {item.label}
                      </span>
                    </div>
                  )
                }}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}