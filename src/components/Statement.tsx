"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Statement = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-40 max-w-5xl mx-auto px-6 md:px-12 text-center">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-16 h-px bg-primary mx-auto mb-10 origin-center"
        />
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight italic">
          "Where artificial intelligence
          <br />
          meets{" "}
          <span className="text-primary not-italic">artisan</span> craft."
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-16 h-px bg-primary mx-auto mt-10 origin-center"
        />
        <p className="mt-8 text-muted-foreground tracking-[0.2em] uppercase text-sm">
          — The Livinai Vision
        </p>
      </motion.div>
    </section>
  );
};

export default Statement;
