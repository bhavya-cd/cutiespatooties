'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const lookbookImages = [
  '/assets/images/logo6.jpeg',
  '/assets/images/logo7.jpeg',
  '/assets/images/logo8.jpeg',
]

export default function LookbookCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, lookbookImages.length - 1))
    setCurrentIndex(clampedIndex)
    
    if (trackRef.current) {
      const slide = trackRef.current.children[clampedIndex] as HTMLElement
      if (slide) {
        slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }

  const goNext = () => scrollToIndex(currentIndex + 1)
  const goPrev = () => scrollToIndex(currentIndex - 1)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleScroll = () => {
      let closestIndex = 0
      let smallestDelta = Infinity

      Array.from(track.children).forEach((slide, idx) => {
        const rect = slide.getBoundingClientRect()
        const center = rect.left + rect.width / 2
        const viewportCenter = window.innerWidth / 2
        const delta = Math.abs(center - viewportCenter)
        if (delta < smallestDelta) {
          smallestDelta = delta
          closestIndex = idx
        }
      })

      setCurrentIndex(closestIndex)
    }

    let scrollTimeout: NodeJS.Timeout
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleScroll, 80)
    })

    return () => {
      track.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <section id="lookbook" className="max-w-7xl mx-auto px-6 mt-20 md:mt-28 reveal">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <p className="text-valentine-charcoal/60 text-xs font-medium tracking-[0.3em] uppercase mb-2">Lookbook</p>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-1 text-valentine-charcoal">Styled in Real Life</h2>
          <p className="text-valentine-charcoal/60 text-sm md:text-base">
            Swipe through how Cutiespatooties looks on real people.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 text-sm">
          <button
            onClick={goPrev}
            className="w-9 h-9 rounded-full border border-valentine-blush flex items-center justify-center text-valentine-charcoal hover:bg-valentine-burgundy hover:text-white hover:border-valentine-burgundy transition"
          >
            ‹
          </button>
          <button
            onClick={goNext}
            className="w-9 h-9 rounded-full border border-valentine-blush flex items-center justify-center text-valentine-charcoal hover:bg-valentine-burgundy hover:text-white hover:border-valentine-burgundy transition"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Mobile arrows overlay */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:hidden pointer-events-none z-10">
          <button
            onClick={goPrev}
            className="w-8 h-8 rounded-full bg-white/80 shadow pointer-events-auto flex items-center justify-center text-sm"
          >
            ‹
          </button>
          <button
            onClick={goNext}
            className="w-8 h-8 rounded-full bg-white/80 shadow pointer-events-auto flex items-center justify-center text-sm"
          >
            ›
          </button>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth pb-2"
        >
          {lookbookImages.map((src, idx) => (
            <div key={idx} className="min-w-[80%] md:min-w-[32%] snap-center shrink-0">
              <Image
                src={src}
                alt={`Lookbook ${idx + 1}`}
                width={400}
                height={420}
                className="rounded-3xl object-cover h-[420px] w-full"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {lookbookImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                idx === currentIndex ? 'bg-valentine-burgundy' : 'bg-valentine-blush'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

