import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
            <h1 className="font-display text-6xl md:text-8xl text-foreground mb-4">404</h1>
            <p className="text-muted-foreground text-lg mb-8">Page not found</p>
            <Button asChild>
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    );
}
