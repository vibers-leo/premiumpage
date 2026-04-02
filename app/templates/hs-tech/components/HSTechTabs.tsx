'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function HSTechTabs() {
    const pathname = usePathname()

    // Define tabs
    const tabs = [
        { label: 'About Us', href: '/templates/hs-tech/about' },
        { label: 'Support & Services', href: '/templates/hs-tech/support' },
        { label: 'Contact', href: '/templates/hs-tech/contact' },
    ]

    return (
        <div className="flex w-full max-w-5xl mx-auto mb-8 shadow-sm ring-1 ring-black/5">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={cn(
                            "flex-1 py-2.5 text-center text-xs md:text-sm font-bold transition-all border-b-2",
                            isActive
                                ? "bg-slate-100 text-slate-800 border-blue-600 shadow-inner"
                                : "bg-blue-600 text-white border-blue-700 hover:bg-blue-700"
                        )}
                        style={{
                            backgroundColor: isActive ? '#f1f5f9' : '#3b82f6',
                            color: isActive ? '#1e293b' : '#ffffff',
                        }}
                    >
                        {tab.label}
                    </Link>
                )
            })}
        </div>
    )
}
