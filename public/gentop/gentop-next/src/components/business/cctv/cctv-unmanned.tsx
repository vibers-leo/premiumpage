import React from "react";
import Image from "next/image";

interface CCTVUnmannedProps {
    lang?: string;
}

export const CCTVUnmanned = ({ lang }: CCTVUnmannedProps) => {
    return (
        <div className="w-full">
            {/* Banner Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 border border-white/10">
                <Image
                    src="/images/business/cctv/bus_img05_1.jpg"
                    alt="Unmanned Surveillance System"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                    <h2 className="text-3xl md:text-5xl font-bold text-white p-8 md:p-12">
                        Unmanned Surveillance System
                    </h2>
                </div>
            </div>

            {/* Intro Text & Subtitle */}
            <div className="mb-12">
                <h3 className="text-xl md:text-2xl font-bold text-gentop-green mb-6 leading-tight">
                    Real-time monitoring on cellphones and PCs
                </h3>
                <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                    <p>
                        The unmanned surveillance system of GENTOP Inc. breaks free from simple surveillance activities; it performs more active functions in preventing various accidents and risk factors.
                    </p>
                    <p>
                        The system can be installed at various types of businesses and places, including offices, public facilities, and general stores, and the users can monitor the recorded videos on their cell phones and PCs in real time; in addition, users can back up the data through USB and internet; since the system is connected to fire alarm system, etc., it can effectively manage your precious properties and save lives.
                    </p>
                </div>
            </div>

            {/* System Diagram */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    System Diagram
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>
                <div className="relative w-full aspect-[2/1] bg-white rounded-2xl overflow-hidden border border-white/10 p-4">
                    <Image
                        src="/images/business/cctv/business_img006.jpg"
                        alt="Unmanned Surveillance System Diagram"
                        fill
                        className="object-contain p-4"
                    />
                </div>
            </div>

            {/* Features */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    Features
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>
                <ul className="gentop-list text-gray-300">
                    <li>Dispatch of SMS text when movements are detected by the sensors at night</li>
                    <li>Management competence maximization through real-time monitoring</li>
                    <li>Security management expenses reduced</li>
                </ul>
            </div>

            {/* Business Targets */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    Business Targets
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>
                <div className="bg-white/5 border border-white/10 p-8 rounded-xl text-center hover:bg-gentop-green/10 hover:border-gentop-green/50 transition-all duration-300 group">
                    <span className="text-xl md:text-2xl font-semibold text-gray-300 group-hover:text-white">
                        Apartments, public offices, schools, associations, hospitals, general building, etc.
                    </span>
                </div>
            </div>
        </div>
    );
};
