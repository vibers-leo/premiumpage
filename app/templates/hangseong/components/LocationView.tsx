'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Building } from 'lucide-react'

export default function LocationView() {
    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-4 tracking-tight"
                    >
                        Location
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg dark:text-slate-400 text-slate-600 max-w-3xl mx-auto"
                    >
                        Visit our headquarters and manufacturing facility in Busan.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Map Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-[2rem] overflow-hidden min-h-[400px] h-full shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900"
                    >
                        <iframe
                            src="https://maps.google.com/maps?q=1200-1%20Jisa-dong%20Gangseo-gu%20Busan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>

                        {/* Overlay for Dark Mode consistency */}
                        <div className="absolute inset-0 pointer-events-none border-[6px] border-white dark:border-slate-900/50 rounded-[2rem] z-10"></div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-black dark:text-white text-slate-900 mb-6">Contact Us</h2>
                            <p className="dark:text-slate-400 text-slate-600 leading-relaxed mb-8">
                                We are located in the Busan Science Industrial Complex.
                                For inquiries about our products or partnership opportunities, please contact us.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: MapPin,
                                    label: 'Headquarters',
                                    value: '1200-1, Jisa-dong, Gangseo-gu, Busan Metropolitan City',
                                    sub: 'Representative Park Myung-gyu'
                                },
                                {
                                    icon: Phone,
                                    label: 'Phone / Fax',
                                    value: '051-972-9935 ~ 6',
                                    sub: 'Fax: 051-972-9930'
                                },
                                {
                                    icon: Mail,
                                    label: 'Email',
                                    value: 'sales@hangseong.co.kr',
                                    sub: 'Technical Support Available'
                                }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold dark:text-white text-slate-900 mb-1">{item.label}</h3>
                                        <p className="text-sm dark:text-slate-300 text-slate-600 font-medium">{item.value}</p>
                                        <p className="text-xs dark:text-slate-500 text-slate-500 mt-1">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
