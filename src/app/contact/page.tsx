"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        // Handle contact form submission
        console.log({ name, email, message });
    }, [name, email, message]);

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
                    C
                </motion.h1>
                <div className="absolute bottom-12 left-12">
                    <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-muted-foreground text-sm tracking-[0.2em] uppercase"
                    >
                        We're Always Here To Help
                    </motion.p>
                </div>
            </motion.div>

            <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-12 relative">
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

                    <div>
                        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                            Get in touch
                        </h2>
                        <p className="text-muted-foreground mb-10">
                            Reach out to our support team and we'll get back to you shortly.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label
                                    htmlFor="name"
                                    className="text-xs tracking-[0.2em] uppercase text-muted-foreground"
                                >
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="mt-2 bg-secondary/50 border-border focus:border-primary h-12"
                                />
                            </div>
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
                                    htmlFor="message"
                                    className="text-xs tracking-[0.2em] uppercase text-muted-foreground"
                                >
                                    Message
                                </Label>
                                <Textarea
                                    id="message"
                                    placeholder="How can we help?"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="mt-2 bg-secondary/50 border-border focus:border-primary min-h-[120px] resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-sm tracking-[0.2em] uppercase"
                            >
                                Send Message
                            </Button>
                        </form>

                        <div className="h-px bg-border my-8" />

                        <div className="flex justify-center text-sm">
                            <Link
                                href="/login"
                                className="text-primary hover:text-foreground transition-colors duration-300"
                            >
                                ← Back to Login
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
