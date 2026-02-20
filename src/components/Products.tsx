"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import chairImg from "@/assets/product-chair.jpg";
import sofaImg from "@/assets/product-sofa.jpg";
import tableImg from "@/assets/product-table.jpg";

const products = [
  {
    name: "Oslo Lounge Chair",
    category: "Seating",
    description: "A minimalist lounge chair designed for ultimate comfort and modern elegance.",
    price: "₹2,490",
    image: chairImg.src
  },
  {
    name: "Aura Sofa III",
    category: "Sofas",
    description: "Spacious three-seater sofa with premium fabric and deep cushioning.",
    price: "₹5,800",
    image: sofaImg.src
  },
  {
    name: "Noma Side Table",
    category: "Tables",
    description: "Sculptural side table crafted from solid oak with a sleek finish.",
    price: "₹1,150",
    image: tableImg.src
  },
];

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

const Marketplace = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="shop" className="py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            Curated For You
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            The Marketplace
          </h2>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-xs tracking-[0.15em] uppercase transition-all duration-300 ${selectedCategory === category
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid md:grid-cols-3 gap-10"
        >
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </motion.div>
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
  const [quantity, setQuantity] = useState<number>(1);

  const increment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev: number) => prev + 1);
  };

  const decrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((prev: number) => prev - 1);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer flex flex-col h-full"
    >
      <div className="aspect-[4/5] overflow-hidden bg-card mb-6 rounded-sm">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
        />
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex flex-col mb-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-[10px] text-primary tracking-[0.2em] uppercase mb-1">
                {product.category}
              </p>
              <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                {product.name}
              </h3>
            </div>
            <span className="text-primary font-medium tracking-wider whitespace-nowrap ml-4">
              {product.price}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          {/* Quantity Selector */}
          <div className="flex items-center border border-border rounded-sm overflow-hidden h-10 w-28">
            <button
              onClick={decrement}
              className="flex-1 h-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              onClick={increment}
              className="flex-1 h-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              +
            </button>
          </div>

          {/* Buy Now Button */}
          <button
            onClick={(e) => { e.stopPropagation(); /* handle buy */ }}
            className="h-10 px-6 bg-primary text-primary-foreground text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-primary/90 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="h-px bg-border mt-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
      </div>
    </motion.div>
  );
};

export default Marketplace;
