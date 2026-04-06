'use client'

import React, { Suspense } from 'react'
import EMTViewer from '../emt/components/EMTViewer'
import { EMT_MENU_KO, EMT_PRODUCTS_KO } from './data'

function EmtKoContent() {
    return <EMTViewer menu={EMT_MENU_KO} products={EMT_PRODUCTS_KO} lang="ko" />
}

export default function EmtKoPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full bg-[#050505] flex items-center justify-center text-white font-['Michroma']">EMT 마스터피스 초기화 중...</div>}>
            <EmtKoContent />
        </Suspense>
    )
}
