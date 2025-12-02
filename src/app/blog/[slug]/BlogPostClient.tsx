
"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowLeft, User, Calendar, Heart, Share2 } from "lucide-react";
import { HpBar } from "@/components/ui/HpBar";
import { RetroButton } from "@/components/ui/RetroButton";
import { Textarea } from "@/components/ui/textarea";
import { AppContext } from "@/context/AppContext";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  color: string;
  content?: string; // 👈 ahora es opcional
};

type BlogPostClientProps = {
  post: BlogPost;
};

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { playSfx } = useContext(AppContext);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const postImage = PlaceHolderImages.find(
    (p) => p.id === post.id.toString()
  );

  return (
    <div className="animate-in slide-in-from-right duration-500 relative">
      <HpBar current={scrollProgress} max={100} />
      <div className="mt-8 mb-4">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-white font-headline text-[10px] hover:text-primary group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          VOLVER AL BLOG
        </Link>
      </div>

      <article className="bg-gray-200 border-4 border-black p-0 max-w-4xl mx-auto relative shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
        <div className="h-64 md:h-80 overflow-hidden relative border-b-4 border-black">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          {postImage && (
            <Image
              src={postImage.imageUrl}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              data-ai-hint={postImage.imageHint}
            />
          )}
          <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black to-transparent">
            <span
              className="inline-block text-black font-headline text-[8px] px-2 py-1 mb-2 border border-black"
              style={{ backgroundColor: post.color }}
            >
              {post.category}
            </span>
            <h1 className="text-white font-headline text-xl md:text-3xl leading-snug text-shadow-sm">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="bg-gray-300 border-b-4 border-black p-4 flex flex-wrap gap-x-6 gap-y-2 items-center font-mono text-xs text-black">
          <div className="flex items-center gap-2">
            <User size={14} />
            <span>PLAYER 1: {post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="p-2 hover:bg-white border border-transparent hover:border-black transition-colors">
              <Heart size={16} className="text-red-500" />
            </button>
            <button className="p-2 hover:bg-white border border-transparent hover:border-black transition-colors">
              <Share2 size={16} className="text-blue-500" />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-12 post-content max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content ?? "" }} />
          <div className="my-8 bg-card border-4 border-secondary p-6 relative">
            <div className="absolute -top-3 left-6 bg-secondary text-secondary-foreground px-2 font-headline text-[8px]">
              NPC DICE:
            </div>
            <p className="text-white font-mono italic text-sm pt-2">
              "Es peligroso ir solo. Toma esto."
            </p>
          </div>
        </div>

        <div className="bg-card p-6 border-t-4 border-black">
          <h3 className="text-white font-headline text-xs mb-6">
            COMENTARIOS (1)
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-primary border-2 border-white flex items-center justify-center font-headline text-white text-xs shrink-0">
                P2
              </div>
              <div className="bg-white p-3 flex-1 border-2 border-gray-500 text-black arrow-left">
                <p className="text-xs font-mono">
                  ¡Gran artículo! Chrono Trigger sigue siendo el GOAT.
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-4 items-start">
              <div className="w-10 h-10 bg-gray-500 border-2 border-white flex items-center justify-center shrink-0">
                <User size={20} color="white" />
              </div>
              <Textarea
                className="flex-1 bg-card border-2 border-secondary p-2 text-white font-mono text-xs h-20"
                placeholder="Escribe tu mensaje..."
              />
            </div>
            <div className="flex justify-end mt-2">
              <RetroButton
                variant="primary"
                onMouseEnter={() => playSfx("hover")}
              >
                ENVIAR
              </RetroButton>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
