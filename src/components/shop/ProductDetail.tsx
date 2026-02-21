"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Star, Truck, ShieldCheck, RefreshCcw, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { findProductById, categoryData } from "@/data/shopData";
import { useProducts } from "@/hooks/useProducts";
import { useCreateOrder } from "@/hooks/useOrders";
import { useState } from "react";
import OrderSuccessModal from "./OrderSuccessModal";
import { useSession } from "next-auth/react";

const ProductDetail = ({ id }: { id: string }) => {
    const { data: session } = useSession();
    const data = findProductById(id);
    const { data: dbProducts } = useProducts();
    const createOrder = useCreateOrder();
    const [isBuying, setIsBuying] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successOrder, setSuccessOrder] = useState<{
        orderNumber: string;
        items: { name: string; quantity: number; price: number }[];
        totalAmount: number;
    } | null>(null);

    const handleBuy = async () => {
        if (!data || !dbProducts) return;

        if (!session) {
            alert("🔒 Please login first to place an order.");
            return;
        }

        if (session.user.role !== 'buyer') {
            alert("Only buyers can purchase items. Please login with a buyer account.");
            return;
        }

        setIsBuying(true);

        // Find corresponding DB product by name
        const dbProduct = dbProducts.find(p => p.name === data.product.name);

        if (!dbProduct) {
            alert("This product is currently out of stock or not available for system purchase.");
            setIsBuying(false);
            return;
        }

        try {
            const order = await createOrder.mutateAsync({
                items: [{ productId: dbProduct._id, quantity: quantity }]
            });

            const price = parseFloat(data.product.price.replace(/,/g, ''));

            setSuccessOrder({
                orderNumber: order.orderNumber,
                items: [{ name: data.product.name, quantity: quantity, price: price }],
                totalAmount: price * quantity,
            });
            setShowSuccessModal(true);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to place order";
            if (message.includes("Unauthorized") || message.includes("login")) {
                alert("🔒 Please login first to place an order.");
            } else {
                alert(`❌ Order failed: ${message}`);
            }
        } finally {
            setIsBuying(false);
        }
    };

    if (!data) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                    <Link href="/shop">
                        <Button>Return to Shop</Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const { product, categorySlug, categoryName } = data;

    // Get related products (same category, excluding current one)
    const relatedProducts = (categoryData[categorySlug] || [])
        .filter((p) => p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            {showSuccessModal && successOrder && (
                <OrderSuccessModal
                    isOpen={showSuccessModal}
                    onClose={() => setShowSuccessModal(false)}
                    orderDetails={successOrder}
                />
            )}

            <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto pb-12">
                <Link href={`/shop/${categorySlug}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm tracking-wide uppercase">
                    <ArrowLeft className="w-4 h-4" /> Back to {categoryName}
                </Link>

                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="aspect-square bg-secondary/20 rounded-lg overflow-hidden flex items-center justify-center relative group"
                    >
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="text-muted-foreground/30 text-6xl font-display">
                                No Image
                            </div>
                        )}
                    </motion.div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <p className="text-primary tracking-widest uppercase text-xs mb-2">New Arrival</p>
                        <h1 className="font-display text-4xl md:text-5xl mb-4">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-2xl font-medium">₹{product.price}</span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-foreground text-sm font-medium">{product.rating || 4.8}</span>
                                <span className="text-muted-foreground text-xs">({product.reviews || 12} reviews)</span>
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                            {product.desc}
                        </p>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Quantity</span>
                            <div className="flex items-center border border-border rounded-md">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-none border-r border-border"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1 || isBuying}
                                >
                                    <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-none border-l border-border"
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={isBuying}
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-8">
                            <Button
                                onClick={handleBuy}
                                disabled={isBuying || createOrder.isPending}
                                className="flex-1 h-12 text-sm tracking-widest uppercase"
                            >
                                {isBuying ? "Processing..." : "Buy Now"}
                            </Button>
                            <Button variant="outline" className="flex-1 h-12 text-sm tracking-widest uppercase border-border hover:bg-secondary">
                                Add to Wishlist
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-6 border-t border-border">
                            <div className="flex flex-col items-center text-center gap-2">
                                <Truck className="w-5 h-5 text-muted-foreground" />
                                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Free Shipping</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">1 Year Warranty</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <RefreshCcw className="w-5 h-5 text-muted-foreground" />
                                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-border pt-12">
                        <h3 className="font-display text-2xl mb-8">You Might Also Like</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((rp) => (
                                <Link href={`/product/${rp.id}`} key={rp.id} className="group block">
                                    <div className="relative aspect-[4/5] bg-secondary/10 rounded-sm overflow-hidden mb-4">
                                        {rp.image && (
                                            <Image
                                                src={rp.image}
                                                alt={rp.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}
                                    </div>
                                    <h4 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">{rp.name}</h4>
                                    <p className="text-muted-foreground">₹{rp.price}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetail;
