"use client";

import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CRTOverlay } from "@/components/layout/CRTOverlay";

export default function AppClientLayout({ children }: { children: React.ReactNode }) {
    const { 
      crtEnabled, setCrtEnabled, 
    } = useContext(AppContext);
    
    const konamiSuccess = useKonamiCode();
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (konamiSuccess && !prefersReducedMotion) {
            setCrtEnabled(prev => !prev);
        }
    }, [konamiSuccess, prefersReducedMotion, setCrtEnabled]);
    
    return (
        <>
            {crtEnabled && !prefersReducedMotion && <CRTOverlay />}
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 relative">
                {children}
            </main>
            <Footer />
        </>
    );
}
