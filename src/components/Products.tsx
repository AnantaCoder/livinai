"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import chairImg from "@/assets/product-chair.jpg";
import sofaImg from "@/assets/product-sofa.jpg";
import tableImg from "@/assets/product-table.jpg";

const products = [
  { name: "Oslo Lounge Chair", price: "€2,490", image: chairImg.src },
  { name: "Aura Sofa III", price: "€5,800", image: sofaImg.src },
  { name: "Noma Side Table", price: "€1,150", image: tableImg.src },
];

const Products = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="catalog" className="py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            Selected Pieces
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            New Arrivals
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
    >
      <div className="aspect-[4/5] overflow-hidden bg-card mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
        />
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
        </div>
        <span className="text-muted-foreground text-sm tracking-wider">
          {product.price}
        </span>
      </div>
      <div className="h-px bg-border mt-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
      </div>
    </motion.div>
  );
};

export default Products;
