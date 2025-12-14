import Image from 'next/image';
import { Github, Linkedin, Twitter, Cpu, Sword } from 'lucide-react';
import { ABOUT_DATA } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
    const avatarImage = PlaceHolderImages.find(p => p.id === 'about-avatar');

    return (
        <div className="animate-in slide-in-from-bottom duration-500 max-w-4xl mx-auto py-8">
            <div className="text-center mb-8">
                <h2 className="font-headline text-white text-2xl mb-2 text-shadow-pixel">PLAYER SELECT</h2>
                <p className="font-mono text-gray-400 text-sm">CHOOSE YOUR CHARACTER</p>
            </div>
            <div className="bg-card border-4 border-black p-6 md:p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-black p-4 border-4 border-border text-center flex flex-col h-full">
                        <div className="aspect-square bg-card mb-4 overflow-hidden relative border-2 border-white">
                            {avatarImage && <Image src={avatarImage.imageUrl} className="object-cover w-full h-full" width={400} height={400} alt="Avatar" data-ai-hint={avatarImage.imageHint} />}
                            <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground text-[8px] font-headline px-1">LVL {ABOUT_DATA.level}</div>
                        </div>
                        <h3 className="text-white font-headline text-sm mb-1">{ABOUT_DATA.name}</h3>
                        <p className="text-secondary font-mono text-xs mb-6">{ABOUT_DATA.role}</p>
                        <div className="mt-auto">
                            <p className="text-gray-500 font-headline text-[8px] mb-2">CONNECT:</p>
                            <div className="flex justify-center gap-4">
                                <Button variant="ghost" size="icon" asChild><a href="https://github.com/ssanchises-uoc/pixel_blog" target='_blank' aria-label="Github"><Github className="text-gray-400 hover:text-white transition-colors" size={20} /></a></Button>
                                <Button variant="ghost" size="icon" asChild><a href="#" aria-label="LinkedIn"><Linkedin className="text-gray-400 hover:text-[#0077B5] transition-colors" size={20} /></a></Button>
                                <Button variant="ghost" size="icon" asChild><a href="#" aria-label="Twitter"><Twitter className="text-gray-400 hover:text-[#1DA1F2] transition-colors" size={20} /></a></Button>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-card p-4 border-2 border-white relative">
                            <div className="absolute -top-3 left-4 bg-white text-black px-2 font-headline text-[8px]">BIO</div>
                            <p className="font-mono text-gray-300 text-sm leading-relaxed pt-2">{ABOUT_DATA.bio}</p>
                        </div>
                        <div>
                            <h4 className="text-accent font-headline text-[10px] mb-4 flex items-center gap-2"><Cpu size={12} /> SKILL TREE</h4>
                            <div className="space-y-3">
                                {ABOUT_DATA.skills.map((skill) => (
                                    <div key={skill.name} className="flex items-center gap-4 text-xs font-mono text-white">
                                        <span className="w-20 text-right">{skill.name}</span>
                                        <div className="flex-1 h-4 bg-black border border-gray-600 relative">
                                            <div style={{ width: `${skill.level}%`, backgroundColor: skill.color }} className="h-full"></div>
                                            <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjwqgABXA6YAeR7QCdQAwAvSQzpNj2TFOgAAAAASUVORK5CYII=')] opacity-20"></div>
                                        </div>
                                        <span className="w-8">{skill.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-yellow-400 font-headline text-[10px] mb-4 flex items-center gap-2"><Sword size={12} /> INVENTORY</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {ABOUT_DATA.inventory.map((item) => (
                                    <div key={item} className="bg-black border border-gray-700 p-2 flex items-center gap-2 text-xs font-mono text-gray-300">
                                        <div className="w-2 h-2 bg-secondary"></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
