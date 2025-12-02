'use client'
import Link from 'next/link';
import { RetroButton } from '@/components/ui/RetroButton';
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

export function NotFound({ minimal = false }: { minimal?: boolean }) {
  const { playSfx, setActiveModal } = useContext(AppContext);
  
  const handleContinue = () => {
    playSfx('click');
    if (minimal) {
      setActiveModal(null);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
       <h1 className={`font-headline text-red-600 mb-4 animate-pulse ${minimal ? 'text-4xl' : 'text-6xl md:text-8xl'}`} style={{textShadow: '4px 4px 0 #000'}}>GAME OVER</h1>
       <p className="text-white font-headline text-xs md:text-sm mb-8 tracking-widest bg-black px-4 py-2 border-2 border-red-600">ERROR 404: CARTRIDGE NOT FOUND</p>
       <div className="space-y-4">
           <p className="text-gray-500 font-mono text-xs">BLOW ON THE CARTRIDGE AND TRY AGAIN</p>
           <RetroButton variant="primary" onClick={handleContinue} asChild>
             <Link href="/">CONTINUE? 9</Link>
           </RetroButton>
        </div>
    </div>
  );
}
