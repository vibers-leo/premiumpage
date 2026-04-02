'use client'

import { EmtOriginalTemplate } from '@/components/templates/EmtOriginal'

const beautyProducts = [
    {
        id: 'serum-01',
        name: 'Radiance Glow Serum',
        category: 'Skin Care',
        description: 'Deep hydration and brightness for all skin types. Reveals your natural inner glow.',
        specs: [
            { label: 'Volume', value: '50ml' },
            { label: 'Main Ingredient', value: 'Niacinamide' },
            { label: 'Skin Type', value: 'All Types' }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'cream-02',
        name: 'Anti-Aging Night Cream',
        category: 'Skin Care',
        description: 'Restores skin elasticity while you sleep with our patented peptide complex.',
        specs: [
            { label: 'Volume', value: '30ml' },
            { label: 'Main Ingredient', value: 'Retinol' },
            { label: 'Effect', value: 'Firming' }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'mask-01',
        name: 'Hydra-Bomb Mask',
        category: 'Masks',
        description: 'Instant moisture boost in 15 minutes. Perfect for dry and tired skin.',
        specs: [
            { label: 'Type', value: 'Sheet Mask' },
            { label: 'Pack', value: '10 Sheets' },
            { label: 'Scent', value: 'Rose' }
        ],
        imageUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'toner-03',
        name: 'Rose Water Toner',
        category: 'Skin Care',
        description: 'Calming and refreshing toner made from real rose petals.',
        specs: [
            { label: 'Volume', value: '200ml' },
            { label: 'Alcohol', value: 'Free' },
            { label: 'Origin', value: 'France' }
        ]
    }
]

export default function KBeautyPage() {
    return (
        <EmtOriginalTemplate
            companyName="LUMIERE BEAUTY"
            tagline="Nature's Secret for Your Eternal Glow"
            products={beautyProducts}
            defaultLanguage="ko"
            defaultThemeMode="light"  // Force Light Mode for Beauty Theme
            brandColor="rose"         // Rose Color Scheme
        />
    )
}
