"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const Footer = memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-secondary/20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
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
              {["Collections", "AI Studio", "Shop", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={link === "Shop" ? "/shop" : link === "Contact" ? "/contact" : `/#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-primary mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              {["Instagram", "Pinterest", "Newsletter"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                  >
                    {link}
                  </a>
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

      <div className="relative w-full overflow-hidden flex-1 flex items-end justify-center pointer-events-none">
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 0.04 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-[32vw] md:text-[22vw] leading-none text-foreground select-none whitespace-nowrap translate-y-[45%]"
        >
          LIVION
        </motion.h2>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
