import { ds } from '../styles/designSystem'

export function More() {
  return (
    <div className={ds.container}>
      <div className="pt-8">
        <h1 className="text-2xl font-semibold text-neutral-900">More</h1>
        <p className="mt-2 text-sm text-neutral-500">
          More options will be available here.
        </p>
      </div>
    </div>
  )
}
