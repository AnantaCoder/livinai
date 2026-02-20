"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoverType, setHoverType] = useState<"none" | "interactive" | "image">("none");

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // First check if it's an image or video
            if (target.tagName.toLowerCase() === "img" || target.tagName.toLowerCase() === "video") {
                setHoverType("image");
                return;
            }

            // Check if hovering over interactive elements (buttons, links, inputs, or anything clickable like labels)
            if (
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "button" ||
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "input" ||
                target.tagName.toLowerCase() === "textarea" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setHoverType("interactive");
            } else {
                setHoverType("none");
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    // Determine sizes and colors based on hover type
    const cursorSize = hoverType === "image" ? 96 : hoverType === "interactive" ? 48 : 16;
    const cursorOffset = cursorSize / 2;
    const isHovering = hoverType !== "none";

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        * {
          /* Hide the default cursor only on larger screens to not break mobile */
          cursor: none !important; 
        }
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}} />
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference hidden md:block"
                animate={{
                    x: mousePosition.x - cursorOffset,
                    y: mousePosition.y - cursorOffset,
                    width: cursorSize,
                    height: cursorSize,
                    backgroundColor: isHovering ? "#000000" : "#ffffff", // In mix-blend-difference, white becomes inverted color and black cancels out inversion.
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
                style={{
                    border: isHovering ? 'none' : '2px solid white',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                <AnimatePresence>
                    {hoverType === "image" && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="text-white text-[10px] tracking-[0.2em] uppercase font-medium mix-blend-difference"
                        >
                            View
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default CustomCursor;
