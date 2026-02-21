"use client";

import { memo, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import { useCreateOrder } from "@/hooks/useOrders";
import type { Product } from "@/lib/api/products";

const ProductCard = memo(({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [quantity, setQuantity] = useState<number>(1);
  const createOrder = useCreateOrder();

  const increment = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => {
      if (prev >= product.stock) {
        return prev; // Don't exceed available stock
      }
      return prev + 1;
    });
  }, [product.stock]);

  const decrement = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }, []);

  const handleBuy = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();

    // Check if this is a sample product
    if (product._id.toString().startsWith("sample-")) {
      alert("⚠️ Sample products cannot be purchased.\n\nPlease run 'npm run seed' to add real products to the database, or ask a seller to add products via the Dashboard.");
      return;
    }

    // Check stock availability
    if (product.stock < quantity) {
      alert(`❌ Insufficient stock!\n\nOnly ${product.stock} items available.`);
      return;
    }

    // Disable button during processing
    if (createOrder.isPending) {
      return;
    }

    try {
      const order = await createOrder.mutateAsync({
        items: [{ productId: product._id, quantity }],
      });

      alert(
        `✅ Order placed successfully!\n\n` +
        `Order Number: ${order.orderNumber}\n` +
        `Total Amount: ₹${order.totalAmount.toLocaleString()}\n` +
        `Items: ${quantity} x ${product.name}\n\n` +
        `View your orders in "My Orders" page.`
      );
      setQuantity(1);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to place order";

      if (message.includes("Unauthorized") || message.includes("login")) {
        alert("🔒 Please login first to place an order.\n\nClick 'Login' in the navigation bar.");
      } else if (message.includes("stock")) {
        alert(`❌ ${message}\n\nPlease reduce the quantity or choose another product.`);
      } else {
        alert(`❌ Error: ${message}\n\nPlease try again or contact support.`);
      }
    }
  }, [product._id, product.name, product.stock, quantity, createOrder]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group cursor-pointer flex flex-col h-full"
    >
      <div className="aspect-[4/5] overflow-hidden bg-card mb-6 rounded-sm relative">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
          />
        ) : (
          <div className="w-full h-full bg-secondary/20 flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
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
              <p className="text-xs text-muted-foreground mt-1">
                Stock: {product.stock} available
              </p>
            </div>
            <span className="text-primary font-medium tracking-wider whitespace-nowrap ml-4">
              ₹{product.price ? product.price.toLocaleString() : "0"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center border border-border rounded-sm overflow-hidden h-10 w-28">
            <button
              onClick={decrement}
              className="flex-1 h-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              onClick={increment}
              className="flex-1 h-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={handleBuy}
            disabled={createOrder.isPending || product.stock === 0}
            className="h-10 px-6 bg-primary text-primary-foreground text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createOrder.isPending ? "Processing..." : product.stock === 0 ? "Out of Stock" : "Buy Now"}
          </button>
        </div>
      </div>

      <div className="h-px bg-border mt-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

const Marketplace = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: products = [], isLoading, error } = useProducts();

  // Fallback sample products if database is empty
  const sampleProducts: Product[] = [
    {
      _id: "sample-1",
      name: "Modern Velvet Sofa",
      category: "Living Room",
      description: "Luxurious 3-seater sofa with premium velvet upholstery and solid wood frame",
      price: 45999,
      images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"],
      stock: 10,
      sellerId: "sample-seller",
    },
    {
      _id: "sample-2",
      name: "Scandinavian Dining Table",
      category: "Dining",
      description: "Elegant solid oak dining table with minimalist design, seats 6 people",
      price: 35999,
      images: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80"],
      stock: 5,
      sellerId: "sample-seller",
    },
    {
      _id: "sample-3",
      name: "Ergonomic Office Chair",
      category: "Office",
      description: "Premium office chair with adjustable lumbar support and breathable mesh",
      price: 12999,
      images: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80"],
      stock: 20,
      sellerId: "sample-seller",
    },
  ];

  // Show only first 3 products, use sample products if database is empty
  const displayProducts = products.length > 0 ? products.slice(0, 3) : sampleProducts;

  if (isLoading) {
    return (
      <section id="shop" className="py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <div className="h-4 w-32 bg-secondary/50 animate-pulse mb-4 rounded" />
            <div className="h-12 w-64 bg-secondary/50 animate-pulse rounded" />
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/5] bg-secondary/50 animate-pulse rounded-sm" />
                <div className="h-4 bg-secondary/50 animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-secondary/50 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="shop" className="py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-red-500">Error loading products: {(error as Error).message}</p>
          <p className="text-muted-foreground mt-2">Please try again later</p>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            Curated For You
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            The Marketplace
          </h2>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-3 gap-10">
          {displayProducts.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </motion.div>

        {displayProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Marketplace;
