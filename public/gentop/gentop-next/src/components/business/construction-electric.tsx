import React from "react";
import Image from "next/image";

export const ConstructionElectric = () => {
    return (
        <div className="w-full">
            {/* Banner Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 border border-white/10">
                <Image
                    src="/images/business/construction/electric_banner.jpg"
                    alt="Electric Works"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                    <h2 className="text-3xl md:text-5xl font-bold text-white p-8 md:p-12">
                        Electric Work
                    </h2>
                </div>
            </div>

            {/* Intro Text */}
            <div className="mb-12">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    Constructions of assembling and installing structures, plants, and plumbing, sanitation, air conditioning and heating, machine equipment, pipe equipment, etc. on other structures.
                </p>
            </div>

            {/* License Section - Matching Original Layout */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    License Retention Status
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                    {/* Table */}
                    <div className="flex-1 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                        <table className="w-full border-collapse text-sm md:text-base">
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { label: 'Type of License', value: 'Electric Work Business' },
                                    { label: 'Registration No.', value: 'Gyeongnam-01362' },
                                    { label: 'Company Name', value: 'GENTOP Co., Ltd.' },
                                    { label: 'Representative', value: 'Hongdae Park' },
                                    { label: 'Location', value: '#715, 716, 717, Gyeongnam Robotland Foundation, 59, Gwangnyeocheonnam-ro, Naeseo-eup, Masanhoewon-gu, Changwon-si, Gyeongsangnam-do, Republic of Korea' },
                                    { label: 'Date', value: 'February 22nd, 2010' }
                                ].map((item, idx) => (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                        <th className="bg-white/5 p-5 md:p-6 text-left font-bold text-gentop-green w-1/3 border-r border-white/5 uppercase tracking-wider text-[10px] md:text-xs">
                                            {item.label}
                                        </th>
                                        <td className="p-5 md:p-6 text-gray-300 group-hover:text-white transition-colors">
                                            {item.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Image */}
                    <div className="lg:w-[380px] shrink-0 w-full">
                        <div className="relative aspect-[3/4] rounded-2xl border border-white/10 overflow-hidden shadow-2xl group cursor-zoom-in">
                            <div className="absolute inset-0 bg-gradient-to-br from-gentop-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Image
                                src="/images/business/construction/electric_license.jpg"
                                alt="Electric Work License"
                                fill
                                className="object-contain object-top group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <p className="mt-4 text-center text-xs text-gray-500 font-medium tracking-widest uppercase">Registration Certificate</p>
                    </div>
                </div>
            </div>

            {/* Scope of Services */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    Electric Work Scope
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                    <table className="w-full border-collapse text-sm md:text-base">
                        <tbody className="divide-y divide-white/5">
                            {[
                                { label: 'Generating equipment', value: 'Construction to install or keep generating equipment (including cubicle, storage battery, and charging device)' },
                                { label: 'Power transmission', value: 'Air power transmission construction (steel tower, steel column) and underground power transmission equipment construction (manhole, pipe, sleeve, and cable connection)' },
                                { label: 'Transformation', value: 'Construction of transformation equipment (including machine and system, steel structure construction, etc.)' },
                                { label: 'Distribution', value: 'Air distribution construction and underground distribution equipment construction (including equipment construction of low pressure, high pressure, and special high pressure)' },
                                { label: 'Road/Railroad illumination', value: 'Road lighting, tunnel lighting, bridge lighting, underpass lighting, etc. Lighting for navigation, airport, and railway stations.' },
                                { label: 'Electric equipment of buildings', value: 'Power source, supply, load equipment (lighting, outlets), conveyor equipment (elevators, moving walks), disaster and crime prevention (surge, lightning, aircraft warning light), intelligent building system, etc.' },
                                { label: 'Electric equipment of structures', value: 'Illumination prevention (corrosion prevention of tanks and pipes), freeze protection (snow removal, floor heating), signal/sign equipment (neon signs, cubic board, electronic display), and lighting tower.' }
                            ].map((item, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                    <th className="bg-white/5 p-5 md:p-6 text-left font-bold text-gentop-green w-1/4 md:w-1/5 border-r border-white/5 uppercase tracking-wider text-[10px] md:text-xs">
                                        {item.label}
                                    </th>
                                    <td className="p-5 md:p-6 text-gray-300 group-hover:text-white transition-colors">
                                        {item.value}
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
