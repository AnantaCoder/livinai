"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aiRoomImg from "@/assets/ai-room-viz.jpg";
import aiDetectionImg from "@/assets/ai-detection.jpg";

const features = [
  {
    tag: "AI Room Visualization",
    title: "See it in your space before you buy",
    description:
      "Our AI engine renders any piece of furniture directly into a photo of your room — adjusting for lighting, perspective, and scale in real time.",
    image: aiRoomImg.src,
  },
  {
    tag: "Image Recognition",
    title: "Snap. Detect. Discover.",
    description:
      "Upload a photo of any furniture — our AI identifies the piece, finds matching styles, and tells you exactly which shops carry it near you.",
    image: aiDetectionImg.src,
  },
];

const FeatureBlock = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${isReversed ? "md:direction-rtl" : ""
        }`}
    >
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={isReversed ? "md:order-2 md:text-right" : ""}
      >
        <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary mb-4 border border-primary/30 px-3 py-1">
          {feature.tag}
        </span>
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-lg max-w-md">
          {feature.description}
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`h-px bg-primary/40 mt-8 max-w-[200px] ${isReversed ? "md:ml-auto origin-right" : "origin-left"
            }`}
        />
      </motion.div>

      {/* Image with 3D-style depth effect */}
      <motion.div
        initial={{ opacity: 0, y: 80, rotateX: 8 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`relative group ${isReversed ? "md:order-1" : ""}`}
        style={{ perspective: 1000 }}
      >
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={feature.image}
            alt={feature.tag}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Scan line effect */}
          <motion.div
            initial={{ top: "-100%" }}
            animate={inView ? { top: "120%" } : {}}
            transition={{ delay: 0.8, duration: 2, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          {/* Glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
        {/* Floating depth shadows */}
        <div className="absolute -inset-4 -z-10 bg-primary/5 rounded-sm blur-2xl group-hover:bg-primary/10 transition-colors duration-700" />
      </motion.div>
    </motion.div>
  );
};

const AIShowcase = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id="atelier"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Parallax background grain */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-secondary/20 -z-10"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 50 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 md:mb-32"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            Powered by Intelligence
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground max-w-3xl mx-auto leading-tight">
            AI meets{" "}
            <span className="italic text-primary">craftsmanship</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Our platform uses cutting-edge AI to bridge the gap between
            imagination and reality — helping you find, visualize, and shop
            furniture like never before.
          </p>
        </motion.div>

        {/* Feature blocks */}
        <div className="space-y-32 md:space-y-48">
          {features.map((feature, i) => (
            <FeatureBlock key={feature.tag} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom stats / trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12"
        >
          {[
            { value: "50K+", label: "Furniture pieces indexed" },
            { value: "98%", label: "Detection accuracy" },
            { value: "2s", label: "Room render time" },
            { value: "200+", label: "Partner stores" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl text-primary">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm mt-2 tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIShowcase;
