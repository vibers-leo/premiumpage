"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const certifications = [
    // License
    { title: "Cambodia license", category: "License", img: "/images/company/certification/license_cambodia.jpg" },
    { title: "Overseas Construction Industry (Information Communication)", category: "License", img: "/images/company/certification/license_overseas_info.jpg" },
    { title: "Overseas Construction Industry (Electronic Construction)", category: "License", img: "/images/company/certification/license_overseas_electronic.jpg" },
    { title: "Overseas Construction Industry (Mechanical)", category: "License", img: "/images/company/certification/license_overseas_mechanical.jpg" },
    { title: "Weather Business Registration Card", category: "License", img: "/images/company/certification/license_weather.jpg" },
    { title: "Certificate of Registration of Information and Communication Work", category: "License", img: "/images/company/certification/license_info_comm.jpg" },
    { title: "Certificate of Registration of Electrical Construction Work", category: "License", img: "/images/company/certification/license_electrical.jpg" },
    { title: "Certificate of Registration of Construction (Mechanical Work)", category: "License", img: "/images/company/certification/license_mechanical.jpg" },

    // Certification
    { title: "Verification of IP SPEED DOME CAMERA broadcasting equipment", category: "Certification", img: "/images/company/certification/cert_ip_camera.jpg" },
    { title: "Broadcasting equipment application registration - Access Point", category: "Certification", img: "/images/company/certification/cert_access_point.jpg" },
    { title: "Certificate of FCC", category: "Certification", img: "/images/company/certification/cert_fcc.jpg" },
    { title: "EC DECLARATION OF CONFORMITY (Wiegand Converter)", category: "Certification", img: "/images/company/certification/cert_ec_wiegand.jpg" },
    { title: "EC DECLARATION OF CONFORMITY (Access Controller Unit)", category: "Certification", img: "/images/company/certification/cert_ec_access.jpg" },
    { title: "Certificate of CE TUV", category: "Certification", img: "/images/company/certification/cert_ce_tuv.jpg" },
    { title: "2016 Excellence in Employee Invention Promotion", category: "Certification", img: "/images/company/certification/cert_invention_2016.jpg" },
    { title: "Intellectual Property Management Certificate (SME)", category: "Certification", img: "/images/company/certification/cert_ip_management.jpg" },

    // Rewards
    { title: "2012 Commendation (Kyungnam Robot Industry Promotion Foundation)", category: "Rewards", img: "/images/company/certification/reward_2012_robot.jpg" },
    { title: "2019 South Gyeongsang Province Governor's Award", category: "Rewards", img: "/images/company/certification/reward_2019_governor.jpg" },
    { title: "2010 Commendation (Kyungnam Robot Industry Promotion Foundation)", category: "Rewards", img: "/images/company/certification/reward_2010_robot.jpg" },
    { title: "Plaque for Promising Small and Medium-sized Enterprises", category: "Rewards", img: "/images/company/certification/reward_promising_sme.jpg" },
    { title: "Award for Excellence in Small and Medium Business", category: "Rewards", img: "/images/company/certification/reward_excellence_sme.jpg" },
    { title: "2016 Korea Inventions Promotion Association Selection", category: "Rewards", img: "/images/company/certification/reward_2016_invention.jpg" },
    { title: "2014 Korea Inventions Promotion Association Listing", category: "Rewards", img: "/images/company/certification/reward_2014_invention.jpg" },

    // Industrial
    { title: "Registered Trademark 'WIFECT'", category: "Industrial", img: "/images/company/certification/industrial_wifect.jpg" },
    { title: "Registered Trademark 'TOPXUS'", category: "Industrial", img: "/images/company/certification/industrial_topxus.jpg" },
    { title: "Registered Trademark 'GENTOP'", category: "Industrial", img: "/images/company/certification/industrial_gentop.jpg" },
    { title: "Registered Trademark 'LISCON' (Design Shape)", category: "Industrial", img: "/images/company/certification/industrial_liscon_design.jpg" },
    { title: "Registered Trademark 'LISCON' (Text)", category: "Industrial", img: "/images/company/certification/industrial_liscon_text.jpg" },
    { title: "Patent: Apparatus And Method For Detecting Vehicle", category: "Industrial", img: "/images/company/certification/industrial_patent_vehicle.jpg" },
    { title: "Patent: Method for Managing Wind Power Generator System", category: "Industrial", img: "/images/company/certification/industrial_patent_wind_manage.jpg" },
    { title: "Patent: Wind Power Generator System with Automatic Pipeline", category: "Industrial", img: "/images/company/certification/industrial_patent_wind_system.jpg" },
];

const tabs = ["ALL", "License", "Certification", "Rewards", "Industrial"];

export const CompanyCertification = () => {
    const [activeTab, setActiveTab] = useState("ALL");

    const filteredItems = activeTab === "ALL"
        ? certifications
        : certifications.filter(item => item.category === activeTab);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8">

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm md:text-base font-medium ${activeTab === tab
                            ? "bg-[#F47920] text-white border-[#F47920]"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-[#F47920] hover:text-[#F47920]"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Certification Grid */}
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                        <motion.div
                            layout
                            key={item.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="group bg-white dark:bg-neutral-900/40 p-4 rounded-2xl border border-neutral-100 dark:border-white/5 flex flex-col items-center hover:border-gentop-green hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-xl transition-colors duration-500">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h4 className="text-center text-[10px] md:text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-foreground uppercase tracking-wider leading-relaxed px-2">
                                {item.title}
                            </h4>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
