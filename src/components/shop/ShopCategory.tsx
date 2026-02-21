"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import { categoryData, defaultProducts, popularBrands } from "@/data/shopData";
import Image from "next/image";

const freshFinds = [
    { title: "Swivel Chairs", options: "70+", price: "4,949" },
    { title: "Curated Coffee Tables", options: "130+", price: "15,920" },
    { title: "Kids Bedroom", options: "600+", price: "599" },
];

const ShopCategory = ({ slug }: { slug: string }) => {
    // Decoding slug for title display
    const title = decodeURIComponent(slug).replace(/-/g, " ");

    // Select products based on slug, default to empty list if not found
    const currentProducts = categoryData[slug.toLowerCase()] || defaultProducts; // Fallback to original list or empty

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto pb-12">
                <Link href="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm tracking-wide uppercase">
                    <ArrowLeft className="w-4 h-4" /> Back to Shop
                </Link>

                <h1 className="font-display text-4xl md:text-5xl mb-4 capitalize">{title}</h1>
                <p className="text-muted-foreground mb-12 max-w-2xl">
                    Discover our curated selection for {title}. Each piece is crafted to elevate your space.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {currentProducts.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-secondary/20 relative">
                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
                                            <span className="text-sm">Image Placeholder</span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-display text-lg mb-1">{product.name}</h3>
                                <p className="text-muted-foreground text-sm mb-3">₹{product.price}</p>
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto text-xs tracking-wider uppercase border-primary text-primary hover:bg-primary hover:text-white pointer-events-none"
                                    asChild
                                >
                                    <span>Buy Now</span>
                                </Button>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ═══ Freshly Fried Finds ═══ */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="mb-10">
                    <p className="text-primary tracking-[0.3em] uppercase text-xs mb-3">Trending</p>
                    <h2 className="font-display text-3xl md:text-4xl text-foreground">Freshly Fried Finds</h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                    {freshFinds.map((item) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="group p-8 rounded-lg border border-border hover:border-primary/40 bg-card/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-display text-2xl text-foreground mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">
                                    {item.options} Options · Starting at ₹{item.price}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 mt-6 text-primary text-sm tracking-wider group-hover:gap-2 transition-all duration-300">
                                Shop Now <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══ Popular Brands ═══ */}
            <div className="py-24 border-t border-border overflow-hidden relative">
                <div className="text-center mb-12">
                    <p className="text-primary tracking-[0.3em] uppercase text-xs mb-3">Partners</p>
                    <h2 className="font-display text-3xl md:text-4xl text-foreground">Most Popular Brands</h2>
                </div>

                <div className="relative flex w-full overflow-hidden mask-fade-sides">
                    <motion.div
                        className="flex items-center gap-16 md:gap-24 whitespace-nowrap min-w-full"
                        animate={{ x: "-50%" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30
                        }}
                    >
                        {[...popularBrands, ...popularBrands, ...popularBrands].map((brand, i) => (
                            <span
                                key={i}
                                className="font-display text-2xl md:text-4xl text-muted-foreground/40 hover:text-foreground transition-colors duration-500 cursor-default uppercase tracking-widest"
                            >
                                {brand}
                            </span>
                        ))}
                    </motion.div>
                </div>

                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default ShopCategory;
