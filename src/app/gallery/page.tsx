'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { GALLERY_IMAGES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Lightbox } from '@/components/ui/Lightbox';

export default function GalleryPage() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const galleryImagesWithData = GALLERY_IMAGES.map(galleryImg => {
        const placeholder = PlaceHolderImages.find(p => p.id === `gallery-${galleryImg.id}`);
        return {
            ...galleryImg,
            imageUrl: placeholder?.imageUrl,
            imageHint: placeholder?.imageHint,
        };
    }).filter(img => img.imageUrl);

    const lightboxImages = galleryImagesWithData.map(img => ({
        src: img.imageUrl!,
        title: img.title,
        desc: img.desc,
    }));

    return (
        <div className="animate-in zoom-in-95 duration-500 py-8">
            <div className="text-center mb-12">
                <h2 className="font-headline text-white text-2xl mb-4 text-shadow-pixel">GALERÍA DE <span className="text-accent">SPRITES</span></h2>
                <p className="font-mono text-gray-400 text-sm">Colección de artefactos visuales recuperados.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {galleryImagesWithData.map((img, index) => (
                    <div
                        key={img.id}
                        onClick={() => setLightboxIndex(index)}
                        className="group relative cursor-pointer border-4 border-card bg-card p-2 hover:border-primary transition-colors duration-300"
                    >
                        <div className="absolute inset-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center flex-col gap-2">
                            <Camera className="text-white w-8 h-8 mb-2" />
                            <span className="font-headline text-[8px] text-secondary">EXAMINAR</span>
                        </div>
                        <div className="aspect-square overflow-hidden relative">
                            <Image
                                src={img.imageUrl!}
                                alt={img.title}
                                width={800}
                                height={800}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                data-ai-hint={img.imageHint}
                            />
                        </div>
                        <div className="mt-2 flex justify-between items-center px-1">
                            <span className="font-headline text-[8px] text-gray-300 truncate max-w-[80%]">{img.title}</span>
                            <ImageIcon size={12} className="text-secondary" />
                        </div>
                    </div>
                ))}
            </div>
            {lightboxIndex !== null && (
                <Lightbox
                    images={lightboxImages}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </div>
    );
}
