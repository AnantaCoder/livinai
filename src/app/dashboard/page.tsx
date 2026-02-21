"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import { useCreateProduct, useProducts, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import type { Order } from "@/lib/api/orders";
import type { CreateProductRequest, Product } from "@/lib/api/products";
import { Pencil, Trash2, Plus, Minus } from "lucide-react";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"products" | "orders" | "listings">("listings");
    const { data: orders = [] } = useOrders();
    const { data: allProducts = [] } = useProducts();
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();
    const updateOrderStatus = useUpdateOrderStatus();
    const [loading, setLoading] = useState(false);

    // Filter products for current seller
    const myProducts = allProducts.filter(p => {
        if (typeof p.sellerId === 'string') return p.sellerId === session?.user?.id;
        return p.sellerId._id === session?.user?.id;
    });

    // Product form state
    const [productForm, setProductForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        images: "",
        stock: "",
    });

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (editingProduct) {
            setProductForm({
                name: editingProduct.name,
                description: editingProduct.description,
                price: editingProduct.price.toString(),
                category: editingProduct.category,
                images: editingProduct.images.join(", "),
                stock: editingProduct.stock.toString(),
            });
            setActiveTab("products"); // Switch to form tab
        }
    }, [editingProduct]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (session?.user?.role === "buyer") {
            router.push("/");
        }
    }, [status, session, router]);

    const handleAddOrUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (activeTab === "products") {
                // ... handled by handleAddProduct
            }
            if (activeTab === "listings") {
                // If this is triggered, it's weird, but okay
            }

            const productData: CreateProductRequest = {
                name: productForm.name,
                description: productForm.description,
                price: parseFloat(productForm.price),
                category: productForm.category,
                images: productForm.images.split(",").map((url) => url.trim()),
                stock: parseInt(productForm.stock),
            };

            if (editingProduct) {
                await updateProduct.mutateAsync({ id: editingProduct._id, data: productData });
                alert("Product updated successfully!");
                setEditingProduct(null);
            } else {
                await createProduct.mutateAsync(productData);
                alert("Product added successfully!");
            }

            // Reset form
            setProductForm({
                name: "",
                description: "",
                price: "",
                category: "",
                images: "",
                stock: "",
            });

            // If editing, return to listings
            if (editingProduct) setActiveTab("listings");
            // If adding new, stay on products or go to listings?
            // User probably wants to add another or see it listed.
            // Let's go to listings.
            setActiveTab("listings");

        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to save product";
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    const handleStockUpdate = async (product: Product, change: number) => {
        const newStock = Math.max(0, product.stock + change);
        try {
            await updateProduct.mutateAsync({
                id: product._id,
                data: { stock: newStock }
            });
        } catch (error) {
            alert("Failed to update stock");
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct.mutateAsync(id);
            } catch (error) {
                alert("Failed to delete product");
            }
        }
    };

    const handleUpdateOrderStatus = async (orderId: string, status: "pending" | "completed" | "cancelled") => {
        try {
            await updateOrderStatus.mutateAsync({ orderId, status });
            alert("Order status updated!");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update order";
            alert(message);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!session || session.user.role === "buyer") {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b border-border">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
                    <h1 className="font-display text-3xl">Seller Dashboard</h1>
                    <Link href="/">
                        <Button variant="outline">Back to Home</Button>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-border">
                    <button
                        onClick={() => setActiveTab("listings")}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === "listings"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        My Listings
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("products");
                            setEditingProduct(null);
                        }}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === "products"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {editingProduct ? "Edit Product" : "Add Product"}
                    </button>
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === "orders"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Manage Orders
                    </button>
                </div>

                {/* My Listings Tab */}
                {activeTab === "listings" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-display">My Listed Items</h2>
                            <Button onClick={() => setActiveTab("products")}>Add New Item</Button>
                        </div>

                        {allProducts.length === 0 ? (
                            <p className="text-muted-foreground">Loading products...</p>
                        ) : myProducts.length === 0 ? (
                            <p className="text-muted-foreground">You haven't listed any products yet.</p>
                        ) : (
                            <div className="grid gap-6">
                                {myProducts.map((product) => (
                                    <div key={product._id} className="border border-border rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start">
                                        <div className="w-24 h-24 relative bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                                            {product.images[0] ? (
                                                <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-display text-xl mb-1 truncate">{product.name}</h3>
                                                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                                                    <p className="font-bold text-lg text-primary">₹{product.price.toLocaleString()}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => {
                                                        setEditingProduct(product);
                                                        setActiveTab("products");
                                                    }}>
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={() => handleDeleteProduct(product._id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center gap-4 bg-secondary/10 p-2 rounded-lg w-fit">
                                                <span className="text-sm font-medium ml-2">Stock Level:</span>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => handleStockUpdate(product, -1)}
                                                        disabled={product.stock <= 0}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </Button>
                                                    <span className="w-8 text-center font-mono font-medium">{product.stock}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => handleStockUpdate(product, 1)}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Add/Edit Products Tab */}
                {activeTab === "products" && (
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-display mb-6">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                        <form onSubmit={handleAddOrUpdateProduct} className="space-y-6">
                            <div>
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    value={productForm.name}
                                    onChange={(e) =>
                                        setProductForm({ ...productForm, name: e.target.value })
                                    }
                                    required
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={productForm.description}
                                    onChange={(e) =>
                                        setProductForm({
                                            ...productForm,
                                            description: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-2"
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="price">Price (₹)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={productForm.price}
                                        onChange={(e) =>
                                            setProductForm({ ...productForm, price: e.target.value })
                                        }
                                        required
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        value={productForm.stock}
                                        onChange={(e) =>
                                            setProductForm({ ...productForm, stock: e.target.value })
                                        }
                                        required
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={productForm.category}
                                    onChange={(e) =>
                                        setProductForm({ ...productForm, category: e.target.value })
                                    }
                                    required
                                    className="mt-2"
                                    placeholder="e.g., Living Room, Office, Dining"
                                />
                            </div>

                            <div>
                                <Label htmlFor="images">Image URLs (comma-separated)</Label>
                                <Textarea
                                    id="images"
                                    value={productForm.images}
                                    onChange={(e) =>
                                        setProductForm({ ...productForm, images: e.target.value })
                                    }
                                    required
                                    className="mt-2"
                                    rows={3}
                                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                                />
                            </div>

                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? (editingProduct ? "Updating..." : "Adding...") : (editingProduct ? "Update Product" : "Add Product")}
                            </Button>
                        </form>
                    </div>
                )}

                {/* Manage Orders Tab */}
                {activeTab === "orders" && (
                    <div>
                        <h2 className="text-2xl font-display mb-6">Manage Orders</h2>
                        {orders.length === 0 ? (
                            <p className="text-muted-foreground">No orders yet</p>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order._id}
                                        className="border border-border rounded-lg p-6"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-display text-xl">
                                                    {order.orderNumber}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Customer: {order.buyerId.name} ({order.buyerId.email})
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Date: {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-primary">
                                                    ₹{order.totalAmount.toLocaleString()}
                                                </p>
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${order.status === "completed"
                                                        ? "bg-green-500/20 text-green-500"
                                                        : order.status === "cancelled"
                                                            ? "bg-red-500/20 text-red-500"
                                                            : "bg-yellow-500/20 text-yellow-500"
                                                        }`}
                                                >
                                                    {order.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="font-medium mb-2">Items:</h4>
                                            <ul className="space-y-1">
                                                {order.items.map((item, idx) => (
                                                    <li key={idx} className="text-sm text-muted-foreground">
                                                        {item.name} x {item.quantity} = ₹
                                                        {(item.price * item.quantity).toLocaleString()}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {order.status !== "completed" && order.status !== "cancelled" && (
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        handleUpdateOrderStatus(order._id, "completed")
                                                    }
                                                >
                                                    Mark as Completed
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleUpdateOrderStatus(order._id, "cancelled")
                                                    }
                                                >
                                                    Cancel Order
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
