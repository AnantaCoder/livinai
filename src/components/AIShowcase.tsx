"use client";

import { memo, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import aiDetectionImg from "@/assets/ai-detection.jpg";
import { Volume2, VolumeX } from "lucide-react";

type FeatureType = {
  tag: string;
  title: string;
  description: string;
  image?: any;
  video?: string;
};

const features: FeatureType[] = [
  {
    tag: "AI Room Visualization",
    title: "See it in your space before you buy",
    description:
      "Our AI engine renders any piece of furniture directly into a photo of your room — adjusting for lighting, perspective, and scale in real time.",
    video: "/AI_Materializes_Modern_Furniture.mp4",
  },
  {
    tag: "Image Recognition",
    title: "Snap. Detect. Discover.",
    description:
      "Upload a photo of any furniture — our AI identifies the piece, finds matching styles, and tells you exactly which shops carry it near you.",
    image: aiDetectionImg,
  },
];

const FeatureBlock = memo(({
  feature,
  index,
}: {
  feature: FeatureType;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const isReversed = index % 2 !== 0;
  const [isMuted, setIsMuted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, [isMounted]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${isReversed ? "md:direction-rtl" : ""
        }`}
    >
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
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
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`h-px bg-primary/40 mt-8 max-w-[200px] ${isReversed ? "md:ml-auto origin-right" : "origin-left"
            }`}
        />
      </motion.div>

      {/* Image/Video */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`relative group ${isReversed ? "md:order-1" : ""}`}
      >
        <div className="relative overflow-hidden rounded-sm">
          {feature.video ? (
            <div className="relative" suppressHydrationWarning>
              {isMounted ? (
                <>
                  <video
                    ref={videoRef}
                    src={feature.video}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-[500px] object-cover rounded-sm"
                  />
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-4 right-4 z-50 p-2 md:p-3 bg-secondary/80 backdrop-blur-md rounded-full text-foreground hover:bg-primary transition-colors border border-border"
                    aria-label={isMuted ? "Enable Audio" : "Disable Audio"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </>
              ) : (
                <div className="w-full h-[500px] bg-secondary/20 rounded-sm"></div>
              )}
            </div>
          ) : (
            <div className="relative h-[500px]">
              <Image
                src={feature.image}
                alt={feature.tag}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                placeholder="blur"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
        </div>
        <div className="absolute -inset-4 -z-10 bg-primary/5 rounded-sm blur-2xl group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
});

FeatureBlock.displayName = "FeatureBlock";

const AIShowcase = () => {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section
      id="ai-studio"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-secondary/20 -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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

        <div className="space-y-32 md:space-y-48">
          {features.map((feature, i) => (
            <FeatureBlock key={feature.tag} feature={feature} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
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
