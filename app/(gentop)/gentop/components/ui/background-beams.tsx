"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@gentop/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    const beamsRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = beamsRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let paths: { x: number; y: number; cp1x: number; cp1y: number; cp2x: number; cp2y: number; speed: number }[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initPaths();
        };

        const initPaths = () => {
            paths = [];
            const count = 20; // Number of beams
            for (let i = 0; i < count; i++) {
                paths.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    cp1x: Math.random() * canvas.width,
                    cp1y: Math.random() * canvas.height,
                    cp2x: Math.random() * canvas.width,
                    cp2y: Math.random() * canvas.height,
                    speed: Math.random() * 0.5 + 0.2
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Dark background is handled by parent, we just draw beams
            ctx.lineCap = "round";

            paths.forEach((path) => {
                ctx.beginPath();
                // Create a gradient for the beam
                const gradient = ctx.createLinearGradient(path.x, path.y, path.cp2x, path.cp2y);
                gradient.addColorStop(0, "rgba(173, 232, 19, 0)"); // Transparent start
                gradient.addColorStop(0.5, "rgba(173, 232, 19, 0.15)"); // Gentop Green middle
                gradient.addColorStop(1, "rgba(173, 232, 19, 0)"); // Transparent end

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;

                ctx.moveTo(path.x, path.y);
                ctx.bezierCurveTo(path.cp1x, path.cp1y, path.cp2x, path.cp2y, path.x + 200, path.y + 200);
                ctx.stroke();

                // Animate
                path.x -= path.speed;
                path.y -= path.speed;

                // Wrap around
                if (path.x < -200 || path.y < -200) {
                    path.x = canvas.width + 200;
                    path.y = canvas.height + 200;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={beamsRef}
            className={cn("absolute inset-0 z-0 w-full h-full pointer-events-none", className)}
        />
    );
};
