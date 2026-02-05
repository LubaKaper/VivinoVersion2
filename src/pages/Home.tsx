import { ds } from '../styles/designSystem'

export function Home() {
  return (
    <div className={ds.container}>
      <div className="pt-8">
        <h1 className="text-2xl font-semibold text-neutral-900">Home</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Home content will be added here.
        </p>
      </div>
    </div>
  )
}
