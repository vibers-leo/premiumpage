'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
    children: ReactNode
    animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate'
    delay?: number
    duration?: number
    className?: string
}

const animations = {
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 }
    },
    slideUp: {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 }
    },
    slideLeft: {
        initial: { opacity: 0, x: 60 },
        animate: { opacity: 1, x: 0 }
    },
    slideRight: {
        initial: { opacity: 0, x: -60 },
        animate: { opacity: 1, x: 0 }
    },
    scale: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 }
    },
    rotate: {
        initial: { opacity: 0, rotate: -10 },
        animate: { opacity: 1, rotate: 0 }
    }
}

export function AnimatedSection({
    children,
    animation = 'fadeIn',
    delay = 0,
    duration = 0.6,
    className = ''
}: AnimatedSectionProps) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })

    const selectedAnimation = animations[animation]

    return (
        <motion.div
            ref={ref}
            initial={selectedAnimation.initial}
            animate={isVisible ? selectedAnimation.animate : selectedAnimation.initial}
            transition={{
                duration,
                delay,
                ease: [0.4, 0, 0.2, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
