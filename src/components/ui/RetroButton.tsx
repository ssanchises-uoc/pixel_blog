import { cn } from "@/lib/utils";
import React from 'react';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
    as?: 'button' | 'a';
}

export const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(({ children, variant = 'primary', className = '', as = 'button', ...props }, ref) => {
    const baseStyle = "font-headline text-[10px] px-4 py-2 border-2 border-b-4 active:border-b-2 active:translate-y-[2px] transition-all uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-primary border-black text-primary-foreground hover:bg-pink-400",
        secondary: "bg-secondary border-black text-secondary-foreground hover:bg-cyan-300",
        outline: "bg-transparent border-white text-white hover:bg-white/10"
    };

    const Comp = as as React.ElementType;

    return (
        <Comp
            className={cn(baseStyle, variants[variant], className)}
            {...props}
            // @ts-ignore
            ref={ref}
        >
            {children}
        </Comp>
    );
});
RetroButton.displayName = "RetroButton";
