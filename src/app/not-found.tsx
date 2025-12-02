import Link from 'next/link';
import { RetroButton } from '@/components/ui/RetroButton';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center animate-in zoom-in duration-300 py-16">
       <h1 className="font-headline text-6xl md:text-8xl text-red-600 mb-4 animate-pulse" style={{textShadow: '4px 4px 0 #000'}}>GAME OVER</h1>
       <p className="text-white font-headline text-xs md:text-sm mb-8 tracking-widest bg-black px-4 py-2 border-2 border-red-600">ERROR 404: CARTRIDGE NOT FOUND</p>
       <div className="space-y-4">
           <p className="text-gray-500 font-mono text-xs">BLOW ON THE CARTRIDGE AND TRY AGAIN</p>
           <Link href="/">
             <RetroButton variant="primary">CONTINUE? 9</RetroButton>
           </Link>
        </div>
    </div>
  );
}
