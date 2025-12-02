'use client';
import { useState, useContext } from 'react';
import { Mail, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { RetroButton } from '@/components/ui/RetroButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AppContext } from '@/context/AppContext';

export default function ContactPage() {
    const { playSfx } = useContext(AppContext);
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        playSfx('click');
        setStatus('sending');
        setFeedbackMessage('');
        
        // Simulate API call
        setTimeout(() => {
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') as string;

            if (name && name.toLowerCase().includes('error')) {
                setStatus('error');
                setFeedbackMessage('TRANSMISSION FAILED. CHECK CONNECTION.');
                playSfx('error'); // Assuming you have an error sound
            } else {
                setStatus('success');
                setFeedbackMessage('MESSAGE RECEIVED. OVER AND OUT.');
                playSfx('confirm');
            }
        }, 1500);
    };

    return (
        <div className="animate-in fade-in duration-500 max-w-2xl mx-auto py-8">
            <div className="text-center mb-12">
                <h2 className="font-headline text-white text-2xl mb-4 text-shadow-pixel">TRANSMISIÓN <span className="text-primary">DIRECTA</span></h2>
                <p className="text-gray-400 font-mono text-sm">Abre un canal de comunicación.</p>
            </div>

            <div className="bg-card border-4 border-black p-6 md:p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
                <div className="absolute top-2 left-2 w-2 h-2 bg-white"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-white"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-white"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-white"></div>
                
                {status === 'success' ? (
                    <div className="text-center py-10">
                        <CheckCircle size={48} className="mx-auto text-accent mb-4" />
                        <p className="text-accent font-headline text-sm animate-pulse">{feedbackMessage}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="font-headline text-secondary text-[10px] mb-2 block">ID (NOMBRE)</label>
                            <Input id="name" name="name" type="text" required placeholder="PLAYER 1" className="bg-input border-2 border-border p-2 text-white font-mono text-xs focus:border-primary" />
                        </div>
                        <div>
                             <label htmlFor="email" className="font-headline text-secondary text-[10px] mb-2 block">FRECUENCIA (EMAIL)</label>
                            <Input id="email" name="email" type="email" required placeholder="TU@EMAIL.COM" className="bg-input border-2 border-border p-2 text-white font-mono text-xs focus:border-primary" />
                        </div>
                        <div>
                             <label htmlFor="message" className="font-headline text-secondary text-[10px] mb-2 block">MENSAJE</label>
                            <Textarea id="message" name="message" required placeholder="Tu mensaje aquí..." className="bg-input border-2 border-border p-2 text-white font-mono text-xs min-h-[120px]" />
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            {status === 'error' && <p className="text-red-500 font-mono text-xs flex items-center gap-2"><AlertTriangle size={14} />{feedbackMessage}</p>}
                            <RetroButton type="submit" variant="primary" disabled={status === 'sending'}>
                                {status === 'sending' ? 'ENVIANDO...' : <><Send size={12} className="mr-2"/> ENVIAR</>}
                            </RetroButton>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
