"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only — no backend
    console.log("Role:", role);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: decorative side */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-secondary/30 overflow-hidden"
      >
        {/* Floating LIVINAI watermark */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ delay: 0.5, duration: 2 }}
          className="font-display text-[20vw] text-foreground select-none leading-none"
        >
          L
        </motion.h1>
        <div className="absolute bottom-12 left-12">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-muted-foreground text-sm tracking-[0.2em] uppercase"
          >
            AI-Powered Furniture Platform
          </motion.p>
        </div>
      </motion.div>

      {/* Right: form */}
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
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                {isSignup ? "Create account" : "Welcome back"}
              </h2>
              <p className="text-muted-foreground mb-10">
                {isSignup
                  ? "Join the future of furniture discovery"
                  : "Sign in to your AI-powered workspace"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignup && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex bg-secondary p-1 rounded-lg mb-6">
                      {["buyer", "seller", "admin"].map((r) => (
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
                      placeholder="Your name"
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
                    className="mt-2 bg-secondary/50 border-border focus:border-primary h-12"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-sm tracking-[0.2em] uppercase"
                >
                  {isSignup ? "Create Account" : "Sign In"}
                </Button>
              </form>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-px bg-border my-8 origin-left"
              />

              <p className="text-muted-foreground text-sm text-center">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-primary hover:text-foreground transition-colors duration-300"
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
};

export default Login;
