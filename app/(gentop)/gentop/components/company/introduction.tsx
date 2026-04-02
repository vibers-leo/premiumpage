
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const CompanyIntroduction = ({ lang }: { lang: string }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8 space-y-12 relative">
            {/* Subtle Dot Pattern */}
            <div className="absolute inset-0 bg-dot-black/[0.02] dark:bg-dot-white/[0.02] -z-10" />

            {/* 1. Introduction Table */}
            <section className="space-y-6">

                <div className="overflow-x-auto">
                    <table className="w-full border-t border-black/10 dark:border-white/10 text-sm md:text-base min-w-[800px] border-collapse">
                        <tbody className="divide-y divide-black/5 dark:divide-white/5 border-b border-black/10 dark:border-white/10">
                            {/* Row 1 */}
                            <tr className="group transition-colors hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                                <th className="py-5 px-6 text-center font-bold w-[15%] bg-black/[0.03] dark:bg-white/[0.03] text-foreground/70">Name</th>
                                <td className="py-5 px-6 w-[35%] font-medium">GENTOP Co.,Ltd.</td>
                                <th className="py-5 px-6 text-center font-bold w-[15%] bg-black/[0.03] dark:bg-white/[0.03] text-foreground/70">Registration No.</th>
                                <td className="py-5 px-6 w-[35%]">608-81-56200</td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="group transition-colors hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                                <th className="py-5 px-6 text-center font-bold bg-black/[0.03] dark:bg-white/[0.03] text-foreground/70">CEO</th>
                                <td className="py-5 px-6 font-medium">Hong Dae, Park</td>
                                <th className="py-5 px-6 text-center font-bold bg-black/[0.03] dark:bg-white/[0.03] text-foreground/70">Production</th>
                                <td className="py-5 px-6">Information Industry Equipment etc</td>
                            </tr>
                            {/* Row 3 - Full width */}
                            <tr className="group transition-colors hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                                <th className="py-5 px-6 text-center font-bold bg-black/[0.03] dark:bg-white/[0.03] text-foreground/70">Company Location</th>
                                <td className="py-5 px-6" colSpan={3}>
                                    GyeongNam RobotLand Foundation #59, Gwangnyeocheonnam-ro, Naeseo-eup, MasanHoewon-gu, Changwon-si, Gyeongsangnam-do, Korea
                                </td>
                            </tr>
                            {/* Row 4 - Full width */}
                            <tr className="group transition-colors hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                                <th className="py-5 px-6 text-center font-bold bg-black/[0.03] dark:bg-white/[0.03] text-foreground/70 align-middle">Corporation in Cambodia</th>
                                <td className="py-5 px-6" colSpan={3}>
                                    <span className="font-bold text-gentop-green">P.E.A.K Liscon Technology Co.,Ltd</span><br />
                                    No.113 (Parkway Square 1st floor) Room 1-1, Mao Tse Toung Blvd, Sangkat Toul Svay Prey I, Khan Chamkamorn, PhnomPenh, Kingdom of Cambodia.
                                </td>
                            </tr>
                            {/* Row 5 - Full width */}
                            <tr className="group transition-colors hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                                <th className="py-5 px-6 text-center font-bold bg-black/[0.03] dark:bg-white/[0.03] text-foreground/70">Tel.</th>
                                <td className="py-5 px-6 font-bold" colSpan={3}> +855-23 640 7773 </td>
                            </tr>
                            {/* Row 6 - Full width */}
                            <tr className="group transition-colors hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                                <th className="py-5 px-6 text-center font-bold bg-black/[0.03] dark:bg-white/[0.03] text-foreground/70 align-middle">Branch in Myanmar</th>
                                <td className="py-5 px-6" colSpan={3}>
                                    #607, Sakura Tower, No.339, Bogyoke Aung San Rd., Kyauktada Township, Yangon, Myanmar
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};
