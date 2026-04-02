'use client'

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'

function ContactContent() {
    return (
        <div className="w-full pb-20">
            {/* Standardized Header */}
            <div className="pt-20 pb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight uppercase"
                >
                    CONTACT US
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                >
                    Get in touch with our experts for professional sensing solutions and technical support.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    {/* Info Section */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-white">HS TECH Headquarters</h2>
                            </div>

                            <div className="space-y-6 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">HS TECH Co., Ltd.</h3>
                                </div>

                                <div className="space-y-1">
                                    <p className="font-bold text-slate-900 dark:text-white">Address</p>
                                    <p>Room 410, U-Space 2 Bldg. B, 4F</p>
                                    <p>670 Daewangpangyo-ro, Bundang-gu</p>
                                    <p>Seongnam-si, Gyeonggi-do 13493, Korea</p>
                                </div>

                                <div className="space-y-1">
                                    <p><span className="font-bold text-slate-900 dark:text-white inline-block w-20">Phone</span> 070-4346-1844</p>
                                    <p><span className="font-bold text-slate-900 dark:text-white inline-block w-20">FAX</span> 031-8016-3510</p>
                                    <p><span className="font-bold text-slate-900 dark:text-white inline-block w-20">E-mail</span> hs-tech@hs-tech.co.kr</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="flex-1 h-[400px] w-full bg-slate-100 border border-slate-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.316828574169!2d127.1044453763781!3d37.40268897207863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca275e7a9c8b1%3A0xe549045b05a74df6!2z경기도 성남시 분당구 삼평동 670!5e0!3m2!1sko!2skr!4v1706970000000!5m2!1sko!2skr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale hover:grayscale-0 transition-all duration-700 w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Contact...</div>}>
            <ContactContent />
        </Suspense>
    )
}
