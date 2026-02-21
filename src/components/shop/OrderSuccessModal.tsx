"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Truck, Package, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface OrderSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderDetails: {
        orderNumber: string;
        items: { name: string; quantity: number; price: number }[];
        totalAmount: number;
        email?: string;
    } | null;
}

export default function OrderSuccessModal({
    isOpen,
    onClose,
    orderDetails,
}: OrderSuccessModalProps) {
    const [stage, setStage] = useState(0);

    // Animation sequence
    useEffect(() => {
        if (isOpen) {
            setStage(0);
            const timer1 = setTimeout(() => setStage(1), 500); // Start
            const timer2 = setTimeout(() => setStage(2), 2000); // Middle
            const timer3 = setTimeout(() => setStage(3), 3500); // Arrived at "Placed"

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [isOpen]);

    if (!isOpen || !orderDetails) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-background border border-border rounded-xl shadow-2xl max-w-md w-full overflow-hidden relative"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 z-10"
                            onClick={onClose}
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        {/* Header / Success Banner */}
                        <div className="bg-primary/10 p-6 text-center border-b border-border">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.2,
                                }}
                                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20"
                            >
                                <CheckCircle className="w-8 h-8 text-white" />
                            </motion.div>
                            <h2 className="font-display text-2xl font-bold text-foreground">
                                Order Confirmed!
                            </h2>
                            <p className="text-muted-foreground text-sm mt-1">
                                Thank you for your purchase
                            </p>
                        </div>

                        {/* Roadmap Animation */}
                        <div className="p-6 bg-secondary/20 border-b border-border relative overflow-hidden">
                            <div className="flex justify-between items-center text-xs font-medium text-muted-foreground mb-8 px-2">
                                <span className={stage >= 1 ? "text-primary" : ""}>Placed</span>
                                <span className={stage >= 2 ? "text-primary" : ""}>Processing</span>
                                <span className={stage >= 3 ? "text-primary" : ""}>Ready</span>
                            </div>

                            {/* Road Line */}
                            <div className="h-1 bg-border rounded-full w-full relative mb-2">
                                <motion.div
                                    className="absolute left-0 top-0 bottom-0 bg-primary rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: stage >= 3 ? "100%" : stage >= 2 ? "66%" : stage >= 1 ? "33%" : "0%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />

                                {/* Truck Icon */}
                                <motion.div
                                    className="absolute top-1/2 -translate-y-1/2 z-10 bg-background border border-primary p-1 rounded-full text-primary"
                                    initial={{ left: "0%" }}
                                    animate={{ left: stage >= 3 ? "100%" : stage >= 2 ? "66%" : stage >= 1 ? "33%" : "0%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    style={{ x: "-50%" }}
                                >
                                    <Truck className="w-4 h-4" />
                                </motion.div>
                            </div>
                            <p className="text-center text-xs text-muted-foreground mt-4 italic">
                                {stage === 0 && "Initiating..."}
                                {stage === 1 && "Order received..."}
                                {stage === 2 && "Preparing items..."}
                                {stage === 3 && "Ready for dispatch!"}
                            </p>
                        </div>

                        {/* Order Details */}
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                        Order Number
                                    </p>
                                    <p className="font-mono font-medium">{orderDetails.orderNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                        Total Amount
                                    </p>
                                    <p className="font-bold text-primary text-lg">
                                        ₹{orderDetails.totalAmount.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-secondary/30 rounded-lg p-3 text-sm">
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <Package className="w-4 h-4" /> Items
                                </h4>
                                <ul className="space-y-1 text-muted-foreground">
                                    {orderDetails.items.map((item, i) => (
                                        <li key={i} className="flex justify-between">
                                            <span>{item.name} <span className="text-xs opacity-70">x{item.quantity}</span></span>
                                            <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button variant="outline" className="flex-1" onClick={onClose}>
                                    Continue Shopping
                                </Button>
                                <Link href="/orders" className="flex-1">
                                    <Button className="w-full">Track Order</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
