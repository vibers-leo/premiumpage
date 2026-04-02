"use client";
import React, { useId } from "react";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

type ParticlesProps = {
    id?: string;
    className?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    particleDensity?: number;
    particleColor?: string;
    speed?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
    const {
        id,
        className,
        background,
        minSize,
        maxSize,
        particleDensity,
        particleColor,
        speed,
    } = props;
    const [particles, setParticles] = useState<any[]>([]);
    const controls = useAnimation();

    useEffect(() => {
        const generatedParticles = Array.from({ length: particleDensity || 50 }).map(
            (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * ((maxSize || 3) - (minSize || 1)) + (minSize || 1),
                duration: Math.random() * (speed || 5) + 2,
            })
        );
        setParticles(generatedParticles);
    }, []);

    return (
        <div
            id={id || useId()}
            className={cn("h-full w-full relative overflow-hidden", className)}
            style={{ background: background || "transparent" }}
        >
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particleColor || "#FFFFFF",
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};
