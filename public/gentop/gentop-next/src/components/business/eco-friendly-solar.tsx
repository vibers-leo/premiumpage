"use client";

import React from "react";
import { motion } from "framer-motion";

export const EcoFriendlySolar = () => {
    return (
        <div className="space-y-16 md:space-y-24">
            {/* Banner Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/business/eco_friendly/bus_img07.jpg"
                    alt="Solar Energy Generation System"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                    <h2 className="text-3xl md:text-5xl font-bold text-white p-8 md:p-12">
                        Solar Energy Generation System
                    </h2>
                </div>
            </div>

            {/* Intro Text */}
            <div className="space-y-8">
                <h3 className="text-xl md:text-2xl font-bold text-gentop-green leading-tight">
                    Clean energy without environmental pollution
                </h3>
                <div className="text-lg text-gray-300 leading-relaxed space-y-6">
                    <p>
                        This generator directly converts sunlight into electric energy so compared to other generated energy, this is an economic energy generating method with no air pollution, noise, heating, vibration, etc.
                    </p>
                    <p>
                        System connection system that uses sunlight generating device electricity and the electricity provided by the electric power company.
                    </p>
                </div>
            </div>

            {/* Features - Split Layout like LED Display */}
            <div className="flex flex-col md:flex-row gap-8 items-start border-t border-white/10 pt-12">
                <div className="md:w-[200px] shrink-0">
                    <div className="bg-gentop-green text-black font-bold text-center py-4 rounded-xl shadow-lg shadow-gentop-green/20 text-lg">
                        Features
                    </div>
                </div>
                <div className="flex-1 bg-white/5 rounded-2xl p-8 border border-white/10">
                    <ul className="space-y-6">
                        {[
                            { title: "System Stability", desc: "When the conditions are not met (at night or bad weather), the electricity is provided from the existing power system." },
                            { title: "Power Management", desc: "If the electricity is not used, then the electricity is provided to the power system (KEPCO)." },
                            { title: "Eco-Friendly", desc: "Economic energy generating method with no air pollution, noise, heating, vibration, etc." }
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-4 items-start">
                                <span className="mt-2 w-1.5 h-1.5 bg-gentop-green rounded-full shrink-0" />
                                <div>
                                    <strong className="block text-white mb-1">{item.title}</strong>
                                    <span className="text-gray-400">{item.desc}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Business Subject & Application Field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                        Business Subject
                        <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                    </h3>
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
                        <p className="text-gray-300 text-lg">General home, Civic amenities, Large-scale equipment, etc.</p>
                    </div>
                </div>
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                        Application Field
                        <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                    </h3>
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
                        <ul className="list-disc list-inside text-gray-300 space-y-2 text-lg">
                            <li>Small-scale electricity production</li>
                            <li>Large-scale electricity production</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
