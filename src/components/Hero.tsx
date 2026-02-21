"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-living.jpg";
import Link from "next/link";
import Image from "next/image";

const Hero = memo(() => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={heroImg}
          alt="Luxury modern living room"
          className="object-cover"
          fill
          priority
          quality={85}
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-background/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-primary tracking-[0.3em] uppercase text-sm mb-6"
        >
          Curated Living Since 2026
        </motion.p>
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] text-foreground max-w-4xl"
        >
          Furniture that
          <br />
          <span className="italic text-primary">defines</span> space
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="h-px bg-primary/40 mt-10 origin-left max-w-md"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-6 text-muted-foreground max-w-md text-lg leading-relaxed"
        >
          AI-powered furniture discovery. Visualize any piece in your room, detect styles from a photo, and find the perfect shop — instantly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8 flex items-center gap-6"
        >
          <Link
            href="#ai-studio"
            className="inline-flex items-center gap-3 text-primary tracking-[0.2em] uppercase text-sm group"
          >
            Discover AI Features
            <span className="inline-block w-8 h-px bg-primary group-hover:w-14 transition-all duration-300" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
