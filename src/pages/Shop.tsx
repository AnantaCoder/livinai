"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Marketplace from "@/components/Products";

const Shop = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-20">
                <Marketplace />
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
