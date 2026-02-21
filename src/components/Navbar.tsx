"use client";

import { memo, useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const openMenu = useCallback(() => setIsOpen(true), []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <Link href="/" className="font-display text-2xl tracking-wider text-foreground">
          LIVION
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {["Collections", "AI Studio", "Catalog"].map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
          <Link
            href="/shop"
            className="text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Shop
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="hidden sm:block w-20 h-10 bg-secondary/50 animate-pulse rounded" />
          ) : session ? (
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {session.user.name}
              </span>
              {session.user.role === "buyer" && (
                <Link
                  href="/orders"
                  className="text-xs tracking-[0.2em] uppercase bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 transition-colors duration-300 font-medium"
                >
                  My Orders
                </Link>
              )}
              {(session.user.role === "seller" || session.user.role === "admin") && (
                <Link
                  href="/dashboard"
                  className="text-xs tracking-[0.2em] uppercase bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 transition-colors duration-300 font-medium"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="text-xs tracking-[0.2em] uppercase bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 transition-colors duration-300 font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline-flex text-xs tracking-[0.2em] uppercase bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 transition-colors duration-300 font-medium"
              >
                Login
              </Link>
              <Link
                href="/contact"
                className="hidden sm:inline-flex text-xs tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 transition-colors duration-300 font-medium"
              >
                Contact
              </Link>
            </>
          )}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={openMenu}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between p-6 h-20 border-b border-border/50">
              <Link href="/" className="font-display text-2xl tracking-wider text-foreground" onClick={closeMenu}>
                LIVION
              </Link>
              <button
                className="p-2 text-foreground"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-grow gap-8">
              {["Collections", "AI Studio", "Catalog"].map((item) => (
                <Link
                  key={item}
                  href={`/#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={closeMenu}
                  className="text-2xl font-display tracking-widest uppercase text-foreground hover:text-primary transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={closeMenu}
                className="text-2xl font-display tracking-widest uppercase text-foreground hover:text-primary transition-colors duration-300"
              >
                SHOP
              </Link>
            </div>

            <div className="p-6 flex flex-col gap-4 border-t border-border/50">
              {session ? (
                <>
                  <div className="text-center text-muted-foreground mb-2">
                    {session.user.name}
                  </div>
                  {session.user.role === "buyer" && (
                    <Link
                      href="/orders"
                      onClick={closeMenu}
                      className="w-full flex items-center justify-center text-sm tracking-[0.2em] uppercase bg-secondary text-secondary-foreground hover:bg-secondary/80 py-4 transition-colors duration-300 font-medium"
                    >
                      My Orders
                    </Link>
                  )}
                  {(session.user.role === "seller" || session.user.role === "admin") && (
                    <Link
                      href="/dashboard"
                      onClick={closeMenu}
                      className="w-full flex items-center justify-center text-sm tracking-[0.2em] uppercase bg-secondary text-secondary-foreground hover:bg-secondary/80 py-4 transition-colors duration-300 font-medium"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}
                    className="w-full flex items-center justify-center text-sm tracking-[0.2em] uppercase bg-secondary text-secondary-foreground hover:bg-secondary/80 py-4 transition-colors duration-300 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="w-full flex items-center justify-center text-sm tracking-[0.2em] uppercase bg-secondary text-secondary-foreground hover:bg-secondary/80 py-4 transition-colors duration-300 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="w-full flex items-center justify-center text-sm tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 py-4 transition-colors duration-300 font-medium"
                  >
                    Contact
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
