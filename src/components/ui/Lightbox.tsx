'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type LightboxImage = {
    src: string;
    title: string;
    desc: string;
};

type LightboxProps = {
    images: LightboxImage[];
    initialIndex: number;
    onClose: () => void;
};

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        document.addEventListener('keydown', handleKeyDown);
        modalRef.current?.focus();
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev, onClose]);

    const currentImage = images[currentIndex];

    return (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div ref={modalRef} className="relative w-full max-w-5xl outline-none" tabIndex={-1}>
                <div className="flex justify-between items-center mb-4 text-white font-headline text-[10px]">
                    <span>ITEM {currentIndex + 1} / {images.length}</span>
                    <button onClick={onClose} className="hover:text-primary flex items-center gap-2">
                        CERRAR <X size={20} />
                    </button>
                </div>
                <div className="relative border-4 border-secondary bg-black shadow-[0_0_20px_rgba(107,224,255,0.3)]">
                    <div className="relative w-full h-[60vh]">
                        <Image
                            src={currentImage.src}
                            alt={currentImage.title}
                            layout="fill"
                            objectFit="contain"
                            className="bg-card"
                        />
                    </div>
                    <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 text-white hover:bg-primary hover:text-primary-foreground border-2 border-white transition-colors"><ChevronLeft size={32} /></button>
                    <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 text-white hover:bg-primary hover:text-primary-foreground border-2 border-white transition-colors"><ChevronRight size={32} /></button>
                    <div className="absolute bottom-0 left-0 w-full bg-black/80 border-t-4 border-secondary p-4 text-center">
                        <h3 className="text-secondary font-headline text-xs mb-2">{currentImage.title}</h3>
                        <p className="text-gray-300 font-mono text-sm">{currentImage.desc}</p>
                    </div>
                </div>
                <p className="text-center text-gray-500 font-mono text-xs mt-4">[ESC] CERRAR - [←/→] NAVEGAR</p>
            </div>
        </div>
    );
}
