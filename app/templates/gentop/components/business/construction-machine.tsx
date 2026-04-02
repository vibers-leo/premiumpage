import React from "react";
import Image from "next/image";

export const ConstructionMachine = () => {
    return (
        <div className="w-full">
            {/* Banner Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 border border-white/10">
                <Image
                    src="/images/business/construction/machine_banner.jpg"
                    alt="Machine Equipment Construction"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                    <h2 className="text-3xl md:text-5xl font-bold text-white p-8 md:p-12">
                        Machine Equipment Construction
                    </h2>
                </div>
            </div>

            {/* Intro Text */}
            <div className="mb-12">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    Constructions of assembling and installing structures, plants, and plumbing, sanitation, air conditioning and heating, machine equipment, pipe equipment, etc. on other structures.
                </p>
            </div>

            {/* License Section */}
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
                                    { label: 'Type of License', value: 'Machine Equipment Construction Business' },
                                    { label: 'Registration No.', value: 'Masan 2010-10-2' },
                                    { label: 'Registration Date', value: 'March 2nd, 2010' },
                                    { label: 'Type of License', value: 'Gas Equipment Construction Business (Class 1)' },
                                    { label: 'Registration No.', value: 'Changwon-2016-25-03' },
                                    { label: 'Registration Date', value: 'June 23rd, 2016' }
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
                    <div className="lg:w-[280px] shrink-0 w-full">
                        <div className="relative aspect-[3/4] rounded-2xl border border-white/10 overflow-hidden shadow-2xl group cursor-zoom-in">
                            <div className="absolute inset-0 bg-gradient-to-br from-gentop-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Image
                                src="/images/business/construction/machine_license.jpg"
                                alt="Machine Equipment Construction License"
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
                    Machine Equipment Scope
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                    <table className="w-full border-collapse text-sm md:text-base">
                        <tbody className="divide-y divide-white/5">
                            {[
                                { label: 'General Equipment', value: 'Plumbing, ventilation, air conditioning and heating, hot water supply, kitchen, sanitation, soundproof, earthquake-proof, electromagnetic waves block equipment constructions' },
                                { label: 'Automated Control', value: 'Control device, intelligent control system, automatic remote reading equipment to automatically control plumbing and machine equipment' },
                                { label: 'Air Conditioning', value: 'System air conditioner (GHP, EHP) construction and geothermal air conditioning/heating equipment installation' },
                                { label: 'Thermal Insulation', value: 'Thermal insulation construction for heat-retaining and insulation of various mechanical systems' },
                                { label: 'Maintenance', value: 'Improvement of plumbing within the house and cleaning construction for optimal performance' },
                                { label: 'Special Mechanical', value: 'Stage mechanism, automatic storage equipment, and dust collector construction' },
                                { label: 'Traffic / Signals', value: 'Railroad equipment signal construction and crosswalk barrier construction' }
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
