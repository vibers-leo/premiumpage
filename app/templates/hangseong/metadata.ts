import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Hangseong Industrial | Global Automotive Partner',
    description: 'Innovation, Quality, Trust since 1993. Leading manufacturer of HVAC blower motors and all-in-one motors for the global automotive industry.',
    keywords: ['Hangseong Industrial', 'HVAC Blower Motors', 'Automotive Parts', 'All-in-one Motors', 'Korean Automotive Supplier'],
    openGraph: {
        title: 'Hangseong Industrial | Global Automotive Partner',
        description: 'Innovation, Quality, Trust since 1993. Leading manufacturer of HVAC blower motors and all-in-one motors for the global automotive industry.',
        url: 'https://hangseong.premiumpage.kr',
        siteName: 'Hangseong Industrial',
        images: [
            {
                url: '/templates/hangseong/images/slider_01.PNG',
                width: 1920,
                height: 1080,
                alt: 'Hangseong Industrial Factory',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hangseong Industrial | Global Automotive Partner',
        description: 'Innovation, Quality, Trust since 1993. Leading manufacturer of HVAC blower motors and all-in-one motors.',
        images: ['/templates/hangseong/images/slider_01.PNG'],
    },
}
