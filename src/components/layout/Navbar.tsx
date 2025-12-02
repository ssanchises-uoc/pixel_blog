"use client";
import { useState, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, Monitor, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'INICIO' },
    { href: '/blog', label: 'BLOG' },
    { href: '/gallery', label: 'GALERÍA' },
    { href: '/sound-test', label: 'SONIDOS' },
    { href: '/about', label: 'SOBRE MÍ' },
    { href: '/contact', label: 'CONTACTO' },
];

export function Navbar() {
    const { playSfx, crtEnabled, setCrtEnabled, soundEnabled, toggleSound } = useContext(AppContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleMobileNavigate = (href: string) => {
        setIsMobileMenuOpen(false);
        playSfx('click');
    };
    
    const NavLink = ({ href, label, className }: { href: string; label: string; className?: string}) => (
        <Link
            href={href}
            onMouseEnter={() => playSfx('hover')}
            onClick={() => playSfx('click')}
            className={cn(
                "font-headline text-[10px] hover:text-secondary hover:underline decoration-2 underline-offset-4 transition-colors",
                pathname === href ? 'text-secondary underline' : 'text-white',
                className
            )}
        >
            {label}
        </Link>
    );

    return (
        <>
            <header className="bg-card border-b-4 border-black sticky top-0 z-50 h-16 flex items-center shadow-lg">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/" onMouseEnter={() => playSfx('hover')} className="flex items-center group">
                        <Gamepad2 className="w-8 h-8 text-primary mr-2 group-hover:rotate-12 transition-transform" />
                        <div className="flex flex-col items-start">
                            <span className="font-headline text-white text-sm leading-none group-hover:text-secondary transition-colors">
                                PIXEL<span className="text-primary">BLOG</span>
                            </span>
                            <span className="text-[8px] text-gray-400 font-mono tracking-widest mt-1">SNES EDITION v2.0</span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex gap-6 items-center">
                        {navLinks.map(link => (
                            <NavLink key={link.href} {...link} />
                        ))}
                        <div className="flex items-center gap-4 border-l-2 border-gray-600 pl-4">
                            <button
                                onClick={() => { setCrtEnabled(!crtEnabled); playSfx('click'); }}
                                className={`p-1 border-2 ${crtEnabled ? 'border-accent text-accent' : 'border-gray-600 text-gray-500'} hover:text-white hover:border-white transition-all`}
                                title="Toggle CRT Effect"
                                aria-label="Activar/Desactivar efecto CRT"
                                onMouseEnter={() => playSfx('hover')}
                            >
                                <Monitor size={16} />
                            </button>
                             <button
                                onClick={() => { toggleSound(); playSfx('click'); }}
                                className={`p-1 border-2 ${soundEnabled ? 'border-secondary text-secondary' : 'border-gray-600 text-gray-500'} hover:text-white hover:border-white transition-all`}
                                title="Toggle Sound"
                                aria-label="Activar/Desactivar sonido"
                                onMouseEnter={() => playSfx('hover')}
                            >
                                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                            </button>
                        </div>
                    </nav>

                    <button
                        className="md:hidden text-white hover:text-primary"
                        onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); playSfx('click'); }}
                        aria-label="Abrir menú"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex items-center justify-center md:hidden animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col gap-8 text-center">
                        <h2 className="text-accent font-headline text-xs mb-4">-- MENU PAUSA --</h2>
                        {navLinks.map(link => (
                           <Link
                             href={link.href}
                             key={`mobile-${link.href}`}
                             onClick={() => handleMobileNavigate(link.href)}
                             className={cn("font-headline text-lg", link.href === '/contact' ? 'text-primary' : 'text-white', 'hover:text-primary')}
                           >
                               {link.label}
                           </Link>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}
