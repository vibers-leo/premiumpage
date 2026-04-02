
"use client";

import React from "react";
import Image from "next/image";

export const CompanyOrganization = () => {
    return (
        <div className="w-full">
            {/* Image Section with Padding Constraints */}
            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 py-4 md:py-8">
                <div className="rounded-xl overflow-hidden">
                    <Image
                        src="/images/company/organization/organization_img.jpg"
                        alt="Organization Chart"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};
