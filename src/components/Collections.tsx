"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import diningImg from "@/assets/collection-dining.jpg";
import bedroomImg from "@/assets/collection-bedroom.jpg";

const collections = [
  {
    title: "Dining",
    subtitle: "Where conversations begin",
    image: diningImg.src,
  },
  {
    title: "Bedroom",
    subtitle: "Sanctuary of calm",
    image: bedroomImg.src,
  },
];

const CollectionCard = ({
  item,
  index,
}: {
  item: (typeof collections)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-500" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <p className="text-primary text-xs tracking-[0.3em] uppercase mb-2">
          {item.subtitle}
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-foreground">
          {item.title}
        </h3>
        <div className="h-px bg-primary/50 mt-4 w-0 group-hover:w-full transition-all duration-700" />
      </div>
    </motion.div>
  );
};

const Collections = () => {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="collections" className="py-32 max-w-7xl mx-auto px-6 md:px-12">
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
          Our World
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">
          Collections
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-8">
        {collections.map((item, i) => (
          <CollectionCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Collections;
