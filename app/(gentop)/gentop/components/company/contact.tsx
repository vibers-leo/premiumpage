"use client";

import React from "react";
import { motion } from "framer-motion";

export const CompanyContact = () => {
    const contactInfo = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            ),
            title: "Address",
            content: (
                <>
                    715-717, 7F, 59, Gwangnyeocheonnam-ro, Naeseo-eup,<br />
                    Masanhoewon-gu, Changwon-si, Gyeongsangnam-do, Korea
                </>
            ),
            link: null
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
            ),
            title: "Telephone",
            content: (
                <>
                    +82-55-231-9152<br />
                    <span className="text-sm text-gray-500 dark:text-gray-400">(Ext. 9153, 9158)</span>
                </>
            ),
            link: "tel:+82552319152"
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
            title: "Fax",
            content: "+82-55-231-9168",
            link: null
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
            title: "Email",
            content: "info@gentop.co.kr",
            link: "mailto:info@gentop.co.kr"
        }
    ];

    const businessHours = [
        { day: "Monday - Friday", hours: "09:00 - 18:00" },
        { day: "Lunch Break", hours: "12:00 - 13:00" },
        { day: "Weekend & Holidays", hours: "Closed" }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 space-y-20">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {contactInfo.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="group relative"
                    >
                        {item.link ? (
                            <a
                                href={item.link}
                                className="block bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-2xl p-8 hover:border-gentop-green dark:hover:border-gentop-green transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gentop-green/10 flex items-center justify-center text-gentop-green group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-base md:text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ) : (
                            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-2xl p-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gentop-green/10 flex items-center justify-center text-gentop-green">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-base md:text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Business Hours */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gradient-to-br from-gentop-green/5 to-gentop-green/10 dark:from-gentop-green/10 dark:to-gentop-green/5 border border-gentop-green/20 rounded-3xl p-8 md:p-12"
            >
                <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Business Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">Our team is available during these times</p>
                </div>
                <div className="max-w-md mx-auto space-y-4">
                    {businessHours.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center py-3 border-b border-gentop-green/20 last:border-0"
                        >
                            <span className="font-medium text-gray-700 dark:text-gray-300">{item.day}</span>
                            <span className="font-bold text-gentop-green">{item.hours}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-3xl p-12"
            >
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Directions?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                    Visit our location page to see the map and detailed directions to our office.
                </p>
                <a
                    href="/gentop/en/company/location"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gentop-green text-black font-bold rounded-xl hover:bg-gentop-green/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    View Location
                </a>
            </motion.div>
        </div>
    );
};
