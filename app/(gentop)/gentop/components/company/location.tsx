"use client";

import React from "react";

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
            {/* Map section */}
            <div className="w-full">
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
