import { useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MapPin, Store, ChevronRight, Sofa, Bed, UtensilsCrossed, Lamp, BookOpen, Armchair, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import shopHero from "@/assets/shop-hero.jpg";
import victorianImg from "@/assets/style-victorian.jpg";
import industrialImg from "@/assets/style-industrial.jpg";
import retroImg from "@/assets/style-retro.jpg";
import minimalImg from "@/assets/style-minimal.jpg";
import coffeeImg from "@/assets/life-coffee.jpg";
import wfhImg from "@/assets/life-wfh.jpg";
import balconyImg from "@/assets/life-balcony.jpg";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── Data ─── */
const topCategories = [
    { icon: Sofa, label: "Sofas & Seating" },
    { icon: Bed, label: "Mattresses" },
    { icon: Lamp, label: "Lamps & Lighting" },
    { icon: UtensilsCrossed, label: "Kitchen & Dining" },
    { icon: BookOpen, label: "Home Decor" },
    { icon: Armchair, label: "Furnishings" },
    { icon: ShoppingBag, label: "Luxury" },
    { icon: Store, label: "Modular" },
];

const shopByCategories = [
    "Sofas", "Beds", "Dining Sets", "Study Tables", "Centre Tables",
    "Recliners", "Sectional Sofas", "Wardrobes", "Cabinets & Sideboards",
    "Office Furniture", "Shoe Racks", "Bar Furniture",
];

const allCategories = [
    ...shopByCategories, "Bookshelves", "TV Units", "Dressing Tables",
    "Chest of Drawers", "Ottomans", "Bean Bags", "Dividers",
    "Console Tables", "Benches", "Outdoor Furniture", "Kids Furniture", "Vanity Sets",
];

const curatedDesigns = [
    { title: "Victorian Charm", options: "120+", price: "3,999", image: victorianImg },
    { title: "Industrial Edge", options: "2000+", price: "9,999", image: industrialImg },
    { title: "Retro Curves", options: "360+", price: "6,239", image: retroImg },
    { title: "Modern Minimalism", options: "400+", price: "420", image: minimalImg },
];

const stores = [
    { city: "Bengaluru", count: 8 }, { city: "Agra", count: 1 },
    { city: "Shimla", count: 1 }, { city: "Mumbai", count: 6 },
    { city: "New Delhi", count: 2 }, { city: "Pune", count: 5 },
    { city: "Hyderabad", count: 5 }, { city: "Chennai", count: 5 },
    { city: "Kolkata", count: 6 }, { city: "Navi Mumbai", count: 2 },
];

const brands = [
    { name: "Casagold", options: "140+", price: "7,999" },
    { name: "Madesa", options: "60+", price: "6,599" },
    { name: "Woodbuzz", options: "60+", price: "5,249" },
    { name: "Outkarft", options: "35+", price: "4,294" },
];

const lifeMoments = [
    { title: "The First Cup Moment", options: "500+", price: "1,299", image: coffeeImg },
    { title: "WFH Hustle", options: "280+", price: "999", image: wfhImg },
    { title: "The Balcony Escape", options: "110+", price: "1,199", image: balconyImg },
    { title: "The Movie Night", options: "35+", price: "32,221", image: shopHero },
    { title: 'The "I\'M FINALLY HOME" Moment', options: "70+", price: "13,352", image: industrialImg },
    { title: "Comfy Dream Zone", options: "85+", price: "10,899", image: retroImg },
];

const freshFinds = [
    { title: "Swivel Chairs", options: "70+", price: "4,949" },
    { title: "Curated Coffee Tables", options: "130+", price: "15,920" },
    { title: "Kids Bedroom", options: "600+", price: "599" },
];

/* ─── Section wrapper ─── */
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
            className={`max-w-7xl mx-auto px-6 md:px-12 ${className}`}
        >
            {children}
        </motion.section>
    );
};

const SectionTitle = ({ label, title }: { label: string; title: string }) => (
    <motion.div variants={fadeUp} transition={{ duration: 0.7 }} className="mb-10">
        <p className="text-primary tracking-[0.3em] uppercase text-xs mb-3">{label}</p>
        <h2 className="font-display text-3xl md:text-4xl text-foreground">{title}</h2>
    </motion.div>
);

/* ─── Page ─── */
const ShopMain = () => {
    const [showAll, setShowAll] = useState(false);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const categoriesToShow = showAll ? allCategories : shopByCategories;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* ═══ Hero ═══ */}
            <div ref={heroRef} className="relative h-[70vh] overflow-hidden flex items-end">
                <motion.img
                    src={shopHero.src}
                    alt="Shop"
                    style={{ scale: heroScale }}
                    className=" absolute inset-0 "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-16 w-full"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="text-primary tracking-[0.3em] uppercase text-xs mb-3"
                    >
                        Explore Our World
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="font-display text-5xl md:text-7xl text-foreground"
                    >
                        The Shop
                    </motion.h1>
                </motion.div>
            </div>

            {/* ═══ Top Category Bar ═══ */}
            <Section className="py-12">
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {topCategories.map((cat) => (
                        <motion.button
                            key={cat.label}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                            className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-secondary/50 transition-colors duration-300"
                        >
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                <cat.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                            </div>
                            <span className="text-[11px] md:text-xs text-muted-foreground group-hover:text-foreground text-center leading-tight tracking-wide transition-colors duration-300">
                                {cat.label}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </Section>

            {/* ═══ Shop By Categories ═══ */}
            <Section className="py-16">
                <SectionTitle label="Browse" title="Shop By Categories" />
                <motion.div variants={stagger} className="flex flex-wrap gap-3">
                    {categoriesToShow.map((cat) => (
                        <motion.button
                            key={cat}
                            variants={fadeUp}
                            transition={{ duration: 0.4 }}
                            className="px-5 py-2.5 rounded-full border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
                        >
                            {cat}
                        </motion.button>
                    ))}
                </motion.div>
                <motion.button
                    variants={fadeUp}
                    onClick={() => setShowAll(!showAll)}
                    className="mt-6 flex items-center gap-2 text-primary text-sm tracking-wider hover:gap-3 transition-all duration-300"
                >
                    {showAll ? "Show Less" : `Show all Categories (${allCategories.length})`}
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            </Section>

            {/* ═══ Curated Categories — Designs That Travel Through Time ═══ */}
            <Section className="py-20">
                <SectionTitle label="Curated Categories" title="Designs That Travel Through Time" />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {curatedDesigns.map((item, i) => (
                        <motion.div
                            key={item.title}
                            variants={fadeUp}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-lg cursor-pointer"
                        >
                            <div className="aspect-[3/4] overflow-hidden">
                                <img
                                    src={item.image.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="font-display text-xl text-foreground mb-1">{item.title}</h3>
                                <p className="text-muted-foreground text-xs">
                                    {item.options} Options, Starting at ₹{item.price}
                                </p>
                                <div className="flex items-center gap-1 mt-3 text-primary text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Explore <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* ═══ Clearance Sale Banner ═══ */}
            <Section className="py-10">
                <motion.div
                    variants={fadeUp}
                    transition={{ duration: 0.7 }}
                    className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/30 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full" />
                    <div>
                        <p className="text-primary tracking-[0.3em] uppercase text-xs mb-2">Limited Time</p>
                        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-2">Clearance Sale</h2>
                        <p className="text-muted-foreground text-sm">Up to 70% off on selected pieces</p>
                    </div>
                    <button className="mt-6 md:mt-0 px-8 py-3 bg-primary text-primary-foreground font-body text-sm tracking-wider rounded hover:bg-primary/90 transition-colors duration-300 flex items-center gap-2">
                        Shop Now <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </Section>

            {/* ═══ Stores Near You ═══ */}
            <Section className="py-20">
                <SectionTitle label="Visit Us" title="Stores Near You" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {stores.map((s) => (
                        <motion.div
                            key={s.city}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                            className="group p-5 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                <span className="text-foreground text-sm font-medium">{s.city}</span>
                            </div>
                            <span className="text-muted-foreground text-xs">{s.count} Stores</span>
                        </motion.div>
                    ))}
                </div>
                <motion.button
                    variants={fadeUp}
                    className="mt-8 flex items-center gap-2 text-primary text-sm tracking-wider hover:gap-3 transition-all duration-300"
                >
                    Explore More <ArrowRight className="w-4 h-4" />
                </motion.button>
            </Section>

            {/* ═══ Furniture Bazaar — Brands ═══ */}
            <Section className="py-20">
                <SectionTitle label="Furniture Bazaar" title="Explore Popular Brands" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {brands.map((b) => (
                        <motion.div
                            key={b.name}
                            variants={fadeUp}
                            transition={{ duration: 0.5 }}
                            className="group p-6 rounded-lg border border-border hover:border-primary/40 transition-all duration-300 cursor-pointer"
                        >
                            <h3 className="font-display text-xl text-foreground mb-1">{b.name}</h3>
                            <p className="text-muted-foreground text-xs">
                                {b.options} Options, Starting at ₹{b.price}
                            </p>
                            <ChevronRight className="w-4 h-4 text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* ═══ Your Life, In Furniture ═══ */}
            <Section className="py-20">
                <SectionTitle label="Lifestyle" title="Your Life, In Furniture" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lifeMoments.map((item, i) => (
                        <motion.div
                            key={item.title}
                            variants={fadeUp}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            className="group relative overflow-hidden rounded-lg cursor-pointer"
                        >
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={item.image.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <h3 className="font-display text-lg text-foreground mb-1">{item.title}</h3>
                                <p className="text-muted-foreground text-xs">
                                    {item.options} options · Starting at ₹{item.price}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* ═══ Freshly Fried Finds ═══ */}
            <Section className="py-20">
                <SectionTitle label="Trending" title="Freshly Fried Finds" />
                <div className="grid sm:grid-cols-3 gap-6">
                    {freshFinds.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={fadeUp}
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
            </Section>

            <Footer />
        </div>
    );
};

export default ShopMain;
