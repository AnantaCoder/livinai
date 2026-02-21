"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const CustomCursor = () => {
    const pathname = usePathname();
    const cursorRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);
    const rafId = useRef<number>();

    useEffect(() => {
        if (pathname !== "/" || !cursorRef.current) return;

        const cursor = cursorRef.current;
        let currentSize = 16;
        let targetSize = 16;

        // Mouse move handler - just update position, no state
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        // Mouse over handler - check for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") !== null ||
                target.closest("a") !== null;

            isHovering.current = interactive;
            targetSize = interactive ? 48 : 16;
        };

        // Smooth animation loop using requestAnimationFrame
        const animate = () => {
            // Smooth lerp for position
            const lerpFactor = 0.15;
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerpFactor;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerpFactor;

            // Smooth size transition
            currentSize += (targetSize - currentSize) * 0.15;

            // Update cursor position and size
            const halfSize = currentSize / 2;
            cursor.style.transform = `translate3d(${cursorPos.current.x - halfSize}px, ${cursorPos.current.y - halfSize}px, 0)`;
            cursor.style.width = `${currentSize}px`;
            cursor.style.height = `${currentSize}px`;

            rafId.current = requestAnimationFrame(animate);
        };

        // Start animation loop
        rafId.current = requestAnimationFrame(animate);

        // Add event listeners
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [pathname]);

    if (pathname !== "/") return null;

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    @media (min-width: 768px) {
                        * { cursor: none !important; }
                    }
                `
            }} />
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference hidden md:block border-2 border-white bg-white"
                style={{
                    width: '16px',
                    height: '16px',
                    willChange: 'transform',
                }}
            />
        </>
    );
};

export default CustomCursor;
