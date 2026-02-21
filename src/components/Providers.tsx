"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState } from "react";
import CustomCursor from "@/components/CustomCursor";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
                gcTime: 5 * 60 * 1000, // 5 minutes
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
    }));

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <CustomCursor />
                    {children}
                    <Toaster />
                    <Sonner />
                </TooltipProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
