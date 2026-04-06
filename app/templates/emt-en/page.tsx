'use client'

import React, { Suspense } from 'react'
import EMTViewer from '../emt/components/EMTViewer'
import { EMT_MENU_EN, EMT_PRODUCTS_EN } from './data'

function EmtEnContent() {
    return <EMTViewer menu={EMT_MENU_EN} products={EMT_PRODUCTS_EN} lang="en" />
}

export default function EmtEnPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full bg-[#050505] flex items-center justify-center text-white font-['Michroma']">Initializing EMT Masterpiece...</div>}>
            <EmtEnContent />
        </Suspense>
    )
}
