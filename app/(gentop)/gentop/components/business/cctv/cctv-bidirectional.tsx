import React from "react";
import Image from "next/image";

interface CCTVBidirectionalProps {
    lang?: string;
}

export const CCTVBidirectional = ({ lang }: CCTVBidirectionalProps) => {
    return (
        <div className="w-full">
            {/* Banner Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 border border-white/10">
                <Image
                    src="/images/business/cctv/bus_img01.jpg"
                    alt="Bidirectional Surveillance System"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                    <h2 className="text-3xl md:text-5xl font-bold text-white p-8 md:p-12">
                        Bidirectional Surveillance System
                    </h2>
                </div>
            </div>

            {/* Intro Text & Subtitle */}
            <div className="mb-12">
                <h3 className="text-xl md:text-2xl font-bold text-gentop-green mb-6 leading-tight">
                    Maximized system for crime prevention effect
                </h3>
                <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                    <p>
                        In the case of existing CCTVs for crime prevention, they were installed in only one direction facing the opposite direction of the car's direction of progress; the front license plate was captured, data was collected, but due to the single-directionality of the camera installation, there are blind spots and due to natural backlight, the license plate recognition was difficult. In addition, the front license plate, which is attached to the vehicle with two fixed bolts, is not only easy to replace but can also be forged with special dye, reflectors, etc.; thus, the existing method of taking photos of front license plates of vehicles make the accuracy of the input data drop.
                    </p>
                    <p>
                        The bidirectional surveillance system of GENTOP Inc. consists of two cameras looking at the road and each other; through intersecting area, the blind spots are removed and can film in response to natural backlight, etc., and can film not only the front license plate but also the back license plate at the same time, which enables maximization of crime prevention.
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
                        src="/images/business/cctv/business_img005.jpg"
                        alt="Bidirectional Surveillance System Diagram"
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
                    <li>Solves backlight phenomenon</li>
                    <li>Maximizes the data value through filming the front and the back</li>
                    <li>Construction and maintenance expenses are reduced by the camera movement through the screen pattern signal occurrence part</li>
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
                        Network of roads all over the country
                    </span>
                </div>
            </div>
        </div>
    );
};
