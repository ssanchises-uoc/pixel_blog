import { X } from 'lucide-react';
import React from 'react';

type InfoModalProps = {
    title: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
    onClose: () => void;
};

export function InfoModal({ title, content, children, onClose }: InfoModalProps) {
    return (
        <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-card border-4 border-white p-6 max-w-lg w-full relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-primary">
                    <X size={24} />
                    <span className="sr-only">Close modal</span>
                </button>
                <h2 className="text-accent font-headline text-sm mb-4 border-b-2 border-gray-600 pb-2">{title}</h2>
                <div className="text-gray-300 font-mono text-xs space-y-4 max-h-[60vh] overflow-y-auto">
                    {content || children}
                </div>
            </div>
        </div>
    );
}
