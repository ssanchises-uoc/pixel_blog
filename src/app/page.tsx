"use client";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, Play, Calendar } from "lucide-react";
import { BLOG_POSTS, GALLERY_IMAGES, MUSIC_TRACKS } from "@/lib/data";
import { RetroButton } from "@/components/ui/RetroButton";
import { AppContext } from "@/context/AppContext";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const { playSfx } = useContext(AppContext);

  const homeHeroImage = PlaceHolderImages.find(p => p.id === "home-hero");
  
  return (
    <div className="animate-in fade-in duration-500">
      <section className="bg-card text-white p-6 md:p-12 mb-8 border-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVQoU2NkIBIwEqmOgXyFU4d/FIZ3sQyI72IZgD8FYvA/CkM7dgaE97EMgH8OxOg/CsNrdgaE97EMgH8SxNgA7AcAm4cIuimAq2kAAAAASUVORK5CYII=')]"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block bg-primary text-primary-foreground text-[10px] font-headline px-2 py-1 mb-4">
            NUEVA ACTUALIZACIÓN v2.0
          </span>
          <h1 className="font-headline text-2xl md:text-4xl mb-6 leading-relaxed text-shadow-pixel">
            BIENVENIDO AL <br />
            <span className="text-secondary">MUNDO 16 BITS</span>
          </h1>
          <p className="font-mono text-gray-300 mb-6 text-sm md:text-base leading-relaxed max-w-lg">
            Repositorio de assets generados con IA y tutoriales técnicos enfocados en la creación de videojuegos 2D en pixel art estilo 16-bits (SNES/GBA).
            Incluye sprites optimizados, control de paletas, animaciones coherentes, buenas prácticas para spritesheets y flujos de trabajo integrables en motores como Unity, Godot o GameMaker..
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/blog">
              <RetroButton variant="secondary" onMouseEnter={() => playSfx("hover")}>
                LEER BLOG
              </RetroButton>
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-1 flex-1 bg-gray-700"></div>
          <h2 className="font-headline text-white text-sm md:text-base">REPOSITORIO DE IMÁGENES</h2>
          <div className="h-1 flex-1 bg-gray-700"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {GALLERY_IMAGES.slice(0, 4).map((imgData) => {
             const img = PlaceHolderImages.find(p => p.id === `gallery-${imgData.id}`)
            return (
            <Link
              href="/gallery"
              key={imgData.id}
              onMouseEnter={() => playSfx && playSfx("hover")}
              className="group relative border-4 border-card hover:border-secondary cursor-pointer transition-all duration-200 block"
            >
              <div className="aspect-square overflow-hidden bg-black">
               {img && <Image src={img.imageUrl} alt={imgData.title} width={400} height={400} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" data-ai-hint={img.imageHint} />}
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-black/70 p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] text-white font-headline">{imgData.title}</span>
              </div>
            </Link>
          )})}
        </div>
        <div className="text-center">
          <Link href="/gallery">
            <RetroButton variant="outline" onMouseEnter={() => playSfx("hover")}>
              VER REPOSITORIO COMPLETO
            </RetroButton>
          </Link>
        </div>
      </section>

      <section className="mb-12 bg-black border-4 border-card p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20 transform rotate-12">
          <Music size={120} className="text-primary" />
        </div>
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="w-2 h-2 bg-accent animate-pulse"></div>
          <h2 className="font-headline text-white text-sm md:text-base tracking-widest">
            CHIPTUNE <span className="text-primary">FM-SYNTH</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="flex flex-col justify-between">
            <p className="font-mono text-gray-400 text-xs mb-4 max-w-xs">
              Repositorio de música creada con IA.
            </p>
            <div>
              <Link href="/sound-test">
                <RetroButton variant="secondary" onMouseEnter={() => playSfx("hover")}>
                  ABRIR REPRODUCTOR
                </RetroButton>
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            {MUSIC_TRACKS.slice(0, 3).map((track) => (
              <Link
                href="/sound-test"
                key={track.id}
                onMouseEnter={() => playSfx && playSfx("hover")}
                className="flex items-center justify-between p-2 border border-card hover:border-accent hover:bg-card cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary font-headline text-[8px] group-hover:text-accent">
                    <Play size={10} />
                  </span>
                  <span className="text-white font-mono text-xs group-hover:text-accent">{track.title}</span>
                </div>
                <span className="text-gray-600 font-mono text-[10px]">{track.duration}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-1 flex-1 bg-gray-700"></div>
          <h2 className="font-headline text-white text-sm md:text-base">ÚLTIMOS POSTS</h2>
          <div className="h-1 flex-1 bg-gray-700"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post) => {
             const img = PlaceHolderImages.find(p => p.id === post.id.toString());
            return(
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group bg-white border-4 border-black relative hover:-translate-y-2 transition-transform duration-300 cursor-pointer block"
              onMouseEnter={() => playSfx && playSfx("hover")}
            >
              <div className="absolute top-2 left-2 w-full h-full bg-black -z-10"></div>
              <div className="h-48 overflow-hidden border-b-4 border-black relative">
                {img && <Image
                  src={img.imageUrl}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  data-ai-hint={img.imageHint}
                />}
                <div
                  className="absolute top-0 right-0 text-black font-headline text-[8px] px-2 py-1 border-l-2 border-b-2 border-black"
                  style={{ backgroundColor: post.color }}
                >
                  {post.category}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 mb-2">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </div>
                <h3 className="font-headline text-xs text-black leading-5 mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <span className="text-[10px] font-headline text-card-bg underline decoration-2 underline-offset-2 hover:text-secondary">
                  INSERT COIN TO READ &gt;&gt;
                </span>
              </div>
            </Link>
          )})}
        </div>
      </section>
    </div>
  );
}
