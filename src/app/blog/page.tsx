"use client";
import { useState, useMemo, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, AlertTriangle, Calendar } from 'lucide-react';
import { BLOG_POSTS, CATEGORIES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { AppContext } from '@/context/AppContext';

export default function BlogPage() {
    const { playSfx } = useContext(AppContext);
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = useMemo(() => BLOG_POSTS.filter(post => {
        const matchesCategory = activeCategory === 'ALL' || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    }), [activeCategory, searchQuery]);

    return (
        <div className="animate-in fade-in duration-500 py-8">
            <div className="text-center mb-12">
                <h2 className="font-headline text-white text-2xl mb-4 text-shadow-pixel">CATÁLOGO DE <span className="text-accent">CARTUCHOS</span></h2>
                <p className="font-mono text-gray-400 text-sm">Archivo completo de conocimientos.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-64 space-y-8 shrink-0">
                    <div className="bg-card border-4 border-black p-4">
                        <h3 className="text-secondary font-headline text-[10px] mb-4 flex items-center gap-2">
                            <Search size={12} /> BÚSQUEDA
                        </h3>
                        <Input
                            type="text"
                            placeholder="Escribe algo..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-input border-2 border-border p-2 text-white font-mono text-xs focus:border-primary outline-none"
                        />
                    </div>
                    <div className="bg-card border-4 border-black p-4">
                        <h3 className="text-yellow-400 font-headline text-[10px] mb-4 flex items-center gap-2">
                           <Filter size={12} /> GÉNEROS
                        </h3>
                        <ul className="space-y-2">
                            {CATEGORIES.map(cat => (
                                <li key={cat}>
                                    <button
                                        onClick={() => setActiveCategory(cat)}
                                        onMouseEnter={() => playSfx && playSfx('hover')}
                                        className={`w-full text-left font-mono text-xs px-2 py-1 border-l-4 transition-all ${activeCategory === cat ? 'border-primary text-white bg-white/10' : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'}`}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="flex-1 min-w-0">
                    {filteredPosts.length > 0 ? (
                        <div className="space-y-6">
                            {filteredPosts.map((post) => {
                                const postImage = PlaceHolderImages.find(p => p.id === post.id.toString());
                                return (
                                <Link
                                    href={`/blog/${post.slug}`}
                                    key={post.id}
                                    onMouseEnter={() => playSfx && playSfx('hover')}
                                    className="flex flex-col md:flex-row bg-white border-4 border-black cursor-pointer group hover:-translate-x-2 transition-transform"
                                >
                                    <div className="md:w-48 h-32 relative overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-black shrink-0">
                                        {postImage && <Image src={postImage.imageUrl} alt={post.title} width={300} height={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-ai-hint={postImage.imageHint} />}
                                        <div className="absolute top-0 left-0 text-black font-headline text-[8px] px-1 border-r-2 border-b-2 border-black" style={{ backgroundColor: post.color }}>
                                            {post.category}
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px] mb-1">
                                            <Calendar size={12} /> {post.date}
                                        </div>
                                        <h3 className="font-headline text-sm text-black mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                                        <p className="font-body text-xs text-gray-600 line-clamp-2">{post.excerpt}</p>
                                    </div>
                                </Link>
                            )})}
                        </div>
                    ) : (
                        <div className="text-center py-12 border-4 border-dashed border-gray-700">
                            <AlertTriangle size={48} className="mx-auto text-gray-600 mb-4" />
                            <p className="text-gray-400 font-headline text-xs">NO SE ENCONTRARON ITEMS</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
