"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const Footer = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const logoScale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [80, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-secondary/20"
    >
      {/* Top content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12 w-full"
      >
        <div className="grid md:grid-cols-3 gap-16">
          <div>
            <h3 className="font-display text-2xl text-foreground mb-4">LIVION</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              AI-powered furniture discovery. Visualize, detect, and shop — all
              from one intelligent platform.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-primary mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {["Collections", "AI Studio", "Shop Finder", "Showrooms"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href={`#${link.toLowerCase().replace(" ", "-")}`}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-primary mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              {["Instagram", "Pinterest", "Newsletter"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs tracking-wider">
            © 2026 Livion. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs tracking-wider">
            Crafted with AI & precision
          </p>
        </div>
      </motion.div>

      {/* Giant LIVION logo at the bottom — half clipped */}
      <div className="relative w-full overflow-hidden flex-1 flex items-end justify-center pointer-events-none">
        <motion.h2
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="font-display text-[32vw] md:text-[22vw] leading-none text-foreground/[0.04] select-none whitespace-nowrap translate-y-[45%]"
        >
          LIVION
        </motion.h2>
        {/* Gold glow behind logo */}
        <motion.div
          style={{ opacity: logoOpacity }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-primary/10 blur-3xl rounded-full"
        />
      </div>
    </footer>
  );
};

export default Footer;
