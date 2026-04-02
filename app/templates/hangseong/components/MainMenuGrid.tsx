'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

// Define Items for 5-column grid (Total 10 items for 2 rows)
// Row 1: Text | Image | Text | Image | Text
// Row 2: Image | Text | Image | Text | Image
const MENU_ITEMS = [
    // --- ROW 1 ---
    {
        id: 'about',
        type: 'text',
        title: 'Hangsung\nAbout Us',
        desc: 'Greetings, and Welcome to Hang Seong Industrial!',
        href: '/templates/hangseong?tab=about',
        bgColor: 'bg-[#2b5ba1]'
    },
    {
        id: 'img_about',
        type: 'image',
        image: '/templates/hangseong/images/background_01.png',
        alt: 'About Hangseong'
    },
    {
        id: 'process',
        type: 'text',
        title: 'Manufacture\nProcess',
        desc: 'We produce excellent products based on accurate, precise manufacturing processes.',
        href: '/templates/hangseong?tab=process',
        bgColor: 'bg-[#2b5ba1]'
    },
    {
        id: 'img_process',
        type: 'image',
        image: '/templates/hangseong/images/background_02.png',
        alt: 'Manufacturing'
    },
    {
        id: 'reliability',
        type: 'text',
        title: 'Reliability Evaluation\nCertificate',
        desc: 'Excellent human resources and accumulated experience.',
        href: '/templates/hangseong?tab=reliability',
        bgColor: 'bg-[#2b5ba1]'
    },

    // --- ROW 2 ---
    {
        id: 'img_reliability',
        type: 'image',
        image: '/templates/hangseong/images/background_03.png',
        alt: 'Reliability Lab'
    },
    {
        id: 'products',
        type: 'text',
        title: 'Introduction\nof item',
        desc: 'Motor parts for motor vehicles\nCase, Cover, Core and other parts',
        href: '/templates/hangseong?tab=products',
        bgColor: 'bg-[#2b5ba1]'
    },
    {
        id: 'img_products',
        type: 'image',
        image: '/templates/hangseong/images/background_04.png',
        alt: 'Factory View'
    },
    {
        id: 'equipment',
        type: 'text',
        title: 'Equipment\nStatus',
        desc: 'MECHANICAL PRESS, POWER PRESS,\nMULTI FORMER, NC FEEDER',
        href: '/templates/hangseong?tab=equipment',
        bgColor: 'bg-[#2b5ba1]'
    },
    {
        id: 'img_equipment',
        type: 'image',
        image: '/templates/hangseong/images/background_05.png',
        alt: 'Equipment'
    }
]

export default function MainMenuGrid() {
    return (
        <div className="w-full h-full min-h-screen bg-white dark:bg-slate-950 flex flex-col justify-center">
            <div className="w-full max-w-[1920px] mx-auto h-full min-h-[600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 auto-rows-fr">
                {MENU_ITEMS.map((item, index) => {
                    const isText = item.type === 'text'

                    return isText ? (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className={`${item.bgColor} w-full h-[300px] lg:h-auto flex flex-col items-center justify-center text-center p-6 group relative overflow-hidden`}
                        >
                            <Link href={item.href!} className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                                <h2 className="text-xl lg:text-2xl font-bold text-white mb-3 whitespace-pre-line leading-tight">
                                    {item.title}
                                </h2>
                                <div className="w-8 h-0.5 bg-white/50 mb-3 group-hover:w-16 transition-all duration-300" />
                                <p className="text-white/80 text-xs lg:text-sm mb-5 max-w-[90%] whitespace-pre-line leading-relaxed line-clamp-3">
                                    {item.desc}
                                </p>
                                <span className="inline-flex items-center text-white font-bold text-[10px] lg:text-xs tracking-widest uppercase border border-white/30 px-4 py-1.5 rounded-full group-hover:bg-white group-hover:text-blue-900 transition-all duration-300">
                                    More <ArrowRight className="w-3 h-3 ml-2" />
                                </span>
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="relative w-full h-[300px] lg:h-auto group overflow-hidden bg-slate-100"
                        >
                            <Image
                                src={item.image!}
                                alt={item.alt || ''}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300" />
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
