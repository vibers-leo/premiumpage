"use client";

import React from "react";
import { motion } from "framer-motion";

export const EcoFriendlyGeothermal = () => {
    return (
        <div className="space-y-16 md:space-y-24">
            {/* Banner Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/business/eco_friendly/bus_img07_1.jpg"
                    alt="Geothermal Power Generation System"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                    <h2 className="text-3xl md:text-5xl font-bold text-white p-8 md:p-12">
                        Geothermal Power Generation System
                    </h2>
                </div>
            </div>

            {/* Intro Text */}
            <div className="space-y-8">
                <h3 className="text-xl md:text-2xl font-bold text-gentop-green leading-tight">
                    Sustainable Energy
                </h3>
                <div className="text-lg text-gray-300 leading-relaxed space-y-6">
                    <p>
                        Small-scale dispersal type of local energy source. Geothermal generation means using the geothermal source to produce electricity; in principle, no fuel is necessary so there is no pollution accompanied by it.
                    </p>
                    <p>
                        It has enough economic feasibility to counter water, thermal, and nuclear power methods.
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
                        <p className="text-gray-300 text-lg">Social infrastructure, General home, Structures, Buildings, etc.</p>
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
