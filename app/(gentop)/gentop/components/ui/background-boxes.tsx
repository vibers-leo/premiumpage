
"use client";
import React from "react";
import { cn } from "@gentop/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 bg-neutral-950/[0.2] overflow-hidden bg-dot-net/[0.2] dark:bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
                className
            )}
        >
            <div className="absolute left-0 top-0 h-full w-full flex items-center justify-center bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
    );
};

export const BackgroundBoxes = ({
    className,
    ...props
}: {
    className?: string;
    [key: string]: any;
}) => {
    const rows = new Array(150).fill(1);
    const cols = new Array(100).fill(1);
    let colors = [
        "--sky-300",
        "--pink-300",
        "--green-300",
        "--yellow-300",
        "--red-300",
        "--purple-300",
        "--blue-300",
        "--indigo-300",
        "--violet-300",
    ];
    return (
        <div
            style={{
                transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
            }}
            className={cn(
                "absolute left-1/2 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ",
                className
            )}
            {...props}
        >
            {rows.map((_, i) => (
                <React.Fragment key={`row${i}`}>
                    {cols.map((_, j) => (
                        <div
                            key={`col${j}`}
                            className={cn(
                                "w-16 h-8  border-r border-t border-slate-700 relative", // Dark boxes
                                i % 2 === 0 ? "border-slate-800" : "border-slate-900"
                            )}
                        >
                            {j % 2 === 0 && i % 2 === 0 ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m6-6H6"
                                    />
                                </svg>
                            ) : null}
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export const BoxesCore = React.memo(BackgroundBoxes);
