"use client";

import React from "react";
import { motion } from "framer-motion";

export const EcoFriendlyWater = () => {
    return (
        <div className="space-y-16 md:space-y-24">
            {/* Banner Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/business/eco_friendly/bus_img07_3.jpg"
                    alt="Water Power Generation System"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                    <h2 className="text-3xl md:text-5xl font-bold text-white p-8 md:p-12">
                        Water Power Generation System
                    </h2>
                </div>
            </div>

            {/* Intro Text */}
            <div className="space-y-8">
                <h3 className="text-xl md:text-2xl font-bold text-gentop-green leading-tight">
                    Hydro Energy
                </h3>
                <div className="text-lg text-gray-300 leading-relaxed space-y-6">
                    <p>
                        The area with a bigger difference in elevation is more advantageous. Potential energy is converted into kinetic energy of the generator turbine.
                    </p>
                    <p>
                        Korea uses pumped-storage generation to manage seasonal precipitation differences, using night electricity to pump water for daytime use.
                    </p>
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
                        <p className="text-gray-300 text-lg">Social infrastructure, Large-scale facilities.</p>
                    </div>
                </div>
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                        Application Field
                        <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                    </h3>
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
                        <ul className="list-disc list-inside text-gray-300 space-y-2 text-lg">
                            <li>Large-scale power production</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
