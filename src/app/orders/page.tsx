"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useOrders } from "@/hooks/useOrders";

interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface Order {
    _id: string;
    orderNumber: string;
    items: OrderItem[];
    totalAmount: number;
    status: "pending" | "completed" | "cancelled";
    createdAt: string;
}

export default function OrdersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { data: orders = [], isLoading } = useOrders();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-500/20 text-green-500 border-green-500/30";
            case "cancelled":
                return "bg-red-500/20 text-red-500 border-red-500/30";
            default:
                return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
                    <div>
                        <h1 className="font-display text-3xl mb-1">My Orders</h1>
                        <p className="text-sm text-muted-foreground">
                            Track and manage your purchases
                        </p>
                    </div>
                    <Link href="/">
                        <Button variant="outline">Back to Home</Button>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/30 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground"
                            >
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                        </div>
                        <h2 className="font-display text-2xl mb-2">No orders yet</h2>
                        <p className="text-muted-foreground mb-8">
                            Start shopping to see your orders here
                        </p>
                        <Link href="/">
                            <Button>Browse Products</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                            >
                                {/* Order Header */}
                                <div className="bg-secondary/30 px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                                Order Number
                                            </p>
                                            <p className="font-mono font-medium">{order.orderNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                                Date
                                            </p>
                                            <p className="font-medium">
                                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                                Total
                                            </p>
                                            <p className="font-medium text-primary">
                                                ₹{order.totalAmount.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider border ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                                            >
                                                <div className="relative w-20 h-20 rounded bg-secondary/30 overflow-hidden flex-shrink-0">
                                                    {item.image ? (
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="80px"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="font-medium mb-1">{item.name}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">
                                                        ₹{(item.price * item.quantity).toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        ₹{item.price.toLocaleString()} each
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
