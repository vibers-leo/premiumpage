"use client";

import React from "react";
import { motion } from "framer-motion";

export const CompanyLocation = () => {
    // GENTOP Head Office coordinates (approximate based on address)
    const latitude = 35.2427;
    const longitude = 128.5135;

    const directions = [
        {
            category: "By Bus",
            content: "Take 111, 114, 116, 250, 254, or 710 buses and get off at Masan Valley stop > Direction sign"
        },
        {
            category: "By Car",
            content: (
                <div className="space-y-4">
                    <div>
                        <p className="font-bold text-foreground mb-1">Coming from Seoul</p>
                        <p>Daejeon Expressway - Namhae Expressway - pay fees at Sanin IC - pass through Naeseo IC - towards Masan downtown - turn right after crossing a bridge - go straight for 50M along the stream, verify the sign on the left and enter</p>
                    </div>
                    <div>
                        <p className="font-bold text-foreground mb-1">Coming from Busan</p>
                        <p>Gumi Expressway - pay fees at Dongmasan (East Masan) IC - Seomasan (West Masan) IC - pass through SOTJ IC - towards Masan downtown - turn right after crossing a bridge - go straight for 50M along the stream, verify the sign on the left and enter</p>
                    </div>
                </div>
            )
        },
        {
            category: "By Express Bus",
            content: "Express Bus Terminal (takes 20 minutes by taxi) - Gyeongnam Robotland Foundation (former Jung-ri apartment-style factory)"
        },
        {
            category: "By Air",
            content: "Gimhae Airport - Limousine Bus (Towards Masan) - Destination (Masan Station) - Take a bus or taxi"
        }
    ];

    return (
        <div className="w-full space-y-24 pb-20">
            {/* Map & Floating Info section */}
            <div className="relative w-full">
                <div className="w-full h-[500px] md:h-[600px] grayscale-[0.5] contrast-[1.2] opacity-80 dark:opacity-60 transition-all duration-700 hover:grayscale-0 rounded-3xl overflow-hidden border border-neutral-200 dark:border-white/5 shadow-inner">
                    <iframe
                        src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=16&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="GENTOP Head Office Location"
                    />
                </div>

                {/* Floating Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-auto md:min-w-[800px] z-10"
                >
                    <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/20 dark:border-white/5 flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between">
                        <div className="space-y-2 flex-1">
                            <h4 className="flex items-center gap-2 text-xs font-bold text-gentop-green uppercase tracking-widest mb-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                Address
                            </h4>
                            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-bold leading-relaxed">
                                715-717, 7F, 59, Gwangnyeocheonnam-ro, Naeseo-eup, <br className="hidden md:block" />
                                Masanhoewon-gu, Changwon-si, Gyeongsangnam-do, Korea
                            </p>
                        </div>

                        <div className="h-px md:h-12 w-full md:w-px bg-neutral-200 dark:bg-white/10" />

                        <div className="space-y-2">
                            <h4 className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                Tel
                            </h4>
                            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-bold">
                                +82-55-231-9152 <span className="text-gray-400 font-normal">(9153, 9158)</span>
                            </p>
                        </div>

                        <div className="h-px md:h-12 w-full md:w-px bg-neutral-200 dark:bg-white/10" />

                        <div className="space-y-2">
                            <h4 className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                Fax
                            </h4>
                            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-bold">
                                +82-55-231-9168
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Directions Table Section */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight relative inline-block">
                        Directions
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gentop-green" />
                    </h3>
                </div>

                <div className="w-full bg-white dark:bg-neutral-900 overflow-hidden rounded-3xl border border-neutral-100 dark:border-white/5 shadow-sm">
                    <table className="w-full border-collapse">
                        <tbody>
                            {directions.map((dir, idx) => (
                                <tr key={idx} className="border-b border-neutral-100 dark:border-white/5 last:border-0 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors">
                                    <th className="w-1/4 md:w-1/5 bg-neutral-50/50 dark:bg-white/[0.03] p-8 text-left text-sm md:text-base font-bold text-foreground border-r border-neutral-100 dark:border-white/5">
                                        <span className="text-gentop-green">{dir.category}</span>
                                    </th>
                                    <td className="p-8 text-sm md:text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                                        {dir.content}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
