import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type BottomSheetProps = {
  collapsedRatio?: number
  expandedRatio?: number
  collapsedContent: ReactNode
  expandedContent: ReactNode
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export function BottomSheet({
  collapsedRatio = 0.35,
  expandedRatio = 0.85,
  collapsedContent,
  expandedContent
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement | null>(null)
  const [translate, setTranslate] = useState(0)
  const [maxTranslate, setMaxTranslate] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const startYRef = useRef(0)
  const startTranslateRef = useRef(0)

  useLayoutEffect(() => {
    const updateMeasurements = () => {
      const viewportHeight = window.innerHeight
      const sheetHeight = viewportHeight * expandedRatio
      const collapsedVisible = viewportHeight * collapsedRatio
      const nextMaxTranslate = Math.max(sheetHeight - collapsedVisible, 0)
      setMaxTranslate(nextMaxTranslate)
      setTranslate(() => (isExpanded ? 0 : nextMaxTranslate))

      if (sheetRef.current) {
        sheetRef.current.style.height = `${sheetHeight}px`
      }
    }

    updateMeasurements()
    window.addEventListener('resize', updateMeasurements)
    return () => window.removeEventListener('resize', updateMeasurements)
  }, [collapsedRatio, expandedRatio, isExpanded])

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isExpanded])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true)
    startYRef.current = event.clientY
    startTranslateRef.current = translate
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const delta = event.clientY - startYRef.current
    const nextTranslate = clamp(startTranslateRef.current + delta, 0, maxTranslate)
    setTranslate(nextTranslate)
  }

  const handlePointerUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    const shouldExpand = translate < maxTranslate * 0.5
    setIsExpanded(shouldExpand)
    setTranslate(shouldExpand ? 0 : maxTranslate)
  }

  const progress = maxTranslate === 0 ? 1 : 1 - translate / maxTranslate

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2"
      style={{
        transform: `translate(-50%, ${translate}px)`,
        transition: isDragging ? 'none' : 'transform 220ms ease'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="h-full rounded-t-[28px] bg-white px-5 pb-10 pt-3 shadow-card">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-neutral-200" />
        <div>{collapsedContent}</div>
        <div
          className="mt-6"
          style={{ opacity: progress, pointerEvents: progress > 0.4 ? 'auto' : 'none' }}
        >
          {expandedContent}
        </div>
      </div>
    </div>
  )
}
