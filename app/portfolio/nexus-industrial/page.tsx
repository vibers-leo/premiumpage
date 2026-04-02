'use client'

import React from 'react'
import { StandardCatalog } from '@/components/catalog/StandardCatalog'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NexusIndustrialPage() {
    return (
        <div className="relative">
            {/* Back Button Overlay */}
            <div className="fixed top-4 left-4 z-[60]">
                <Link
                    href="/portfolio"
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900/90 hover:bg-zinc-800 text-white rounded-full text-sm font-medium backdrop-blur-sm transition-colors shadow-lg"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Portfolio
                </Link>
            </div>

            <StandardCatalog />
        </div>
    )
}
