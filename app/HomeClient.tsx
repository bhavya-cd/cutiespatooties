'use client'

import { useEffect, ReactNode } from 'react'

export default function HomeClient({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Initialize reveal animations
        const reveals = document.querySelectorAll('.reveal')
        if (!reveals.length) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active')
                    }
                })
            },
            { threshold: 0.1 }
        )

        reveals.forEach((el) => observer.observe(el))

        return () => {
            reveals.forEach((el) => observer.unobserve(el))
        }
    }, [])

    return <>{children}</>
}
