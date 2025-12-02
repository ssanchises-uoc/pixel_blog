"use client";
import { useState, useContext } from 'react';
import Link from 'next/link';
import { Twitter, Github, Mail, Heart } from 'lucide-react';
import { AppContext } from '@/context/AppContext';

export function Footer() {
    const { playSfx } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email) {
            playSfx('confirm');
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <footer className="bg-background border-t-4 border-primary mt-auto relative">
             <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="container mx-auto px-4 py-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Misión */}
                    <div className="border border-white/20 p-6">
                        <h3 className="font-headline text-secondary text-xs mb-4">MISIÓN</h3>
                        <p className="font-mono text-gray-400 text-sm leading-relaxed">
                            Preservando la estética de los 8 y 16 bits en la web moderna. Un tributo a la era dorada de los videojuegos.
                        </p>
                    </div>

                    {/* Navegación */}
                    <div className="border border-white/20 p-6">
                        <h3 className="font-headline text-accent text-xs mb-4">NAVEGACIÓN</h3>
                        <ul className="space-y-3 font-mono text-sm">
                            <li><Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white"><span className="text-primary">&gt;</span> Inicio</Link></li>
                            <li><Link href="/blog" className="flex items-center gap-2 text-gray-300 hover:text-white"><span className="text-primary">&gt;</span> Blog</Link></li>
                            <li><Link href="/gallery" className="flex items-center gap-2 text-gray-300 hover:text-white"><span className="text-primary">&gt;</span> Galería</Link></li>
                            <li><Link href="/contact" className="flex items-center gap-2 text-gray-300 hover:text-white"><span className="text-primary">&gt;</span> Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="border border-white/20 p-6">
                        <h3 className="font-headline text-yellow-400 text-xs mb-4">SOCIAL</h3>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 border-2 border-white/50 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="w-10 h-10 border-2 border-white/50 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"><Github size={20} /></a>
                            <a href="/contact" className="w-10 h-10 border-2 border-white/50 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"><Mail size={20} /></a>
                        </div>
                    </div>

                    {/* Boletín */}
                    <div className="border border-white/20 p-6">
                        <h3 className="font-headline text-primary text-xs mb-4">BOLETÍN</h3>
                        {subscribed ? (
                             <div className="text-center text-accent font-mono text-sm animate-pulse h-10 flex items-center justify-center">
                                ¡Gracias!
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex gap-0 h-10">
                                <input
                                    type="email"
                                    placeholder="Email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1 bg-black border-2 border-r-0 border-white/50 p-2 text-white font-mono text-sm outline-none focus:border-primary transition-colors"
                                />
                                <button type="submit" className="bg-primary text-primary-foreground font-headline text-xs px-4 border-2 border-primary hover:bg-pink-400 transition-colors">
                                    OK
                                </button>
                            </form>
                        )}
                        <div className="font-mono text-gray-500 text-xs mt-6">
                            <p>© 2025 PixelBlog.</p>
                            <p className="flex items-center gap-1.5">Hecho con <Heart size={12} className="text-primary"/> por IA.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
