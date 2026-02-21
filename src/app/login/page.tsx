"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthAPI } from "@/lib/api/auth";

export default function LoginPage() {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"buyer" | "seller" | "admin">("buyer");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (isSignup) {
                await AuthAPI.register({ name, email, password, role });

                const signInResult = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (signInResult?.error) {
                    throw new Error("Registration successful but login failed");
                }

                router.push("/");
            } else {
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) {
                    throw new Error("Invalid email or password");
                }

                router.push("/");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [isSignup, name, email, password, role, router]);

    const toggleMode = useCallback(() => {
        setIsSignup(!isSignup);
        setError("");
    }, [isSignup]);

    return (
        <div className="min-h-screen bg-background flex">
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-secondary/30 overflow-hidden"
            >
                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.05 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="font-display text-[20vw] text-foreground select-none leading-none"
                >
                    L
                </motion.h1>
                <div className="absolute bottom-12 left-12">
                    <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-muted-foreground text-sm tracking-[0.2em] uppercase"
                    >
                        AI-Powered Furniture Platform
                    </motion.p>
                </div>
            </motion.div>

            <div className="flex-1 flex items-center justify-center px-6 md:px-12 relative">
                <Link
                    href="/"
                    aria-label="Home"
                    className="absolute top-6 right-6 md:top-12 md:right-12 flex items-center justify-center w-10 h-10 border border-border text-foreground hover:bg-secondary transition-colors duration-300 rounded-sm z-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </Link>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Link
                        href="/"
                        className="font-display text-2xl tracking-wider text-foreground hover:text-primary transition-colors duration-300 inline-block mb-12"
                    >
                        LIVION
                    </Link>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isSignup ? "signup" : "login"}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                                {isSignup ? "Create account" : "Welcome back"}
                            </h2>
                            <p className="text-muted-foreground mb-10">
                                {isSignup
                                    ? "Join the future of furniture discovery"
                                    : "Sign in to your AI-powered workspace"}
                            </p>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 mb-6 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {isSignup && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="flex bg-secondary p-1 rounded-lg mb-6">
                                            {(["buyer", "seller", "admin"] as const).map((r) => (
                                                <button
                                                    key={r}
                                                    type="button"
                                                    onClick={() => setRole(r)}
                                                    className={`flex-1 py-2 text-xs font-medium tracking-wider uppercase rounded-md transition-all ${role === r
                                                        ? "bg-background shadow-sm text-foreground"
                                                        : "text-muted-foreground hover:text-foreground"
                                                        }`}
                                                >
                                                    {r}
                                                </button>
                                            ))}
                                        </div>

                                        <Label
                                            htmlFor="name"
                                            className="text-xs tracking-[0.2em] uppercase text-muted-foreground"
                                        >
                                            Full Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            required={isSignup}
                                            className="mt-2 bg-secondary/50 border-border focus:border-primary h-12"
                                        />
                                    </motion.div>
                                )}
                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="text-xs tracking-[0.2em] uppercase text-muted-foreground"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="hello@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="mt-2 bg-secondary/50 border-border focus:border-primary h-12"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="password"
                                        className="text-xs tracking-[0.2em] uppercase text-muted-foreground"
                                    >
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        className="mt-2 bg-secondary/50 border-border focus:border-primary h-12"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 text-sm tracking-[0.2em] uppercase"
                                >
                                    {loading ? "Processing..." : isSignup ? "Create Account" : "Sign In"}
                                </Button>
                            </form>

                            <div className="h-px bg-border my-8" />

                            <p className="text-muted-foreground text-sm text-center">
                                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                                <button
                                    onClick={toggleMode}
                                    className="text-primary hover:text-foreground transition-colors duration-300"
                                    type="button"
                                >
                                    {isSignup ? "Sign in" : "Create one"}
                                </button>
                            </p>

                            <div className="mt-6">
                                <Button asChild variant="outline" className="w-full h-12 text-xs tracking-[0.2em] uppercase border-border hover:bg-secondary/50">
                                    <Link href="/contact">Need help? Contact Us</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
