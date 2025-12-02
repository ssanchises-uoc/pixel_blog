import type { Metadata } from 'next';
import { Inter, Press_Start_2P, VT323 } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from '@/components/ui/toaster';
import AppClientLayout from '@/components/AppClientLayout';

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-press-start-2p',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
});

export const metadata: Metadata = {
  title: 'PixelBlog',
  description: 'Explora la era dorada de los videojuegos a través de análisis, recuerdos y pixel art.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${pressStart2P.variable} ${inter.variable} ${vt323.variable} font-body bg-background min-h-screen flex flex-col`}
      >
        <AppProvider>
          <AppClientLayout>
            {children}
          </AppClientLayout>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
