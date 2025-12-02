
"use client";
import { useState, useEffect, useContext, useRef } from 'react';
import * as Tone from 'tone';
import { Play, Pause, Disc, Headphones, Sliders, FileAudio } from 'lucide-react';
import { MUSIC_TRACKS } from '@/lib/data';
import { AppContext } from '@/context/AppContext';
import { RetroButton } from '@/components/ui/RetroButton';

type MusicTrack = typeof MUSIC_TRACKS[0];

export default function SoundTestPage() {
    const { volume, setVolume, playSfx } = useContext(AppContext);
    const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    
    const playerRef = useRef<Tone.Player | null>(null);
    const gainRef = useRef<Tone.Gain | null>(null);

    const initializeAudio = async () => {
        if (isInitialized) return;
        await Tone.start();
        gainRef.current = new Tone.Gain(volume).toDestination();
        playerRef.current = new Tone.Player().connect(gainRef.current);
        setIsInitialized(true);
        console.log("Audio Context started");
    };

    useEffect(() => {
        if (gainRef.current) {
            gainRef.current.gain.rampTo(volume, 0.1);
        }
    }, [volume]);

    useEffect(() => {
        return () => {
            playerRef.current?.stop();
            playerRef.current?.dispose();
        };
    }, []);

    const stopSound = () => {
        playerRef.current?.stop();
        setIsPlaying(false);
    };

    const playTrack = async (track: MusicTrack) => {
        if (!playerRef.current) return;
        
        stopSound();
        
        await playerRef.current.load(track.sound.path);
        playerRef.current.loop = track.type !== 'SFX';
        if (track.type === 'SFX') {
            playerRef.current.onstop = () => {
            setIsPlaying(false);
            setActiveTrackId(null);
            }
        }
        playerRef.current.start();

        setIsPlaying(true);
        setActiveTrackId(track.id);
    };

    const handleTrackToggle = async (track: MusicTrack) => {
        if (!isInitialized) {
            await initializeAudio();
        }
        playSfx('click');

        if (activeTrackId === track.id && isPlaying) {
            stopSound();
        } else {
            await playTrack(track);
        }
    };
    
    const handleMasterPlayPause = () => {
        if (!activeTrackId) return;
        playSfx('click');
        if (isPlaying) {
            stopSound();
        } else {
            const track = MUSIC_TRACKS.find(t => t.id === activeTrackId);
            if(track) playTrack(track);
        }
    };

    const activeTrack = MUSIC_TRACKS.find(t => t.id === activeTrackId);

    return (
        <div className="animate-in slide-in-from-bottom duration-500 max-w-4xl mx-auto py-8">
            <div className="border-4 border-black bg-card p-6 md:p-12 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
                 <div className="absolute top-2 left-2 w-2 h-2 bg-white"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-white"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-white"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-white"></div>
                
                <div className="text-center mb-12">
                    <h2 className="font-headline text-accent text-2xl mb-4 tracking-widest">SOUND TEST</h2>
                    <p className="text-secondary font-mono text-xs uppercase tracking-widest">TONE.JS AUDIO CHIP EMULATION</p>
                </div>
                 {!isInitialized && (
                    <div className="text-center my-8">
                        <RetroButton variant="primary" onClick={initializeAudio}>PRESS START</RetroButton>
                    </div>
                )}
                <div className={`transition-opacity duration-500 ${isInitialized ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
                  <div className="flex justify-center items-center gap-4 mb-8 bg-black/50 p-4 border border-border w-fit mx-auto">
                      <label htmlFor="volume-slider" className="text-white font-mono text-xs">MASTER VOL:</label>
                      <input 
                        id="volume-slider"
                        type="range" min="0" max="1" step="0.05" value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-32 h-2 bg-border appearance-none cursor-pointer border border-white/20 accent-primary"
                      />
                      <span className="text-primary font-mono text-xs w-8">{Math.round(volume * 100)}%</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-2 space-y-4">
                          <div className="flex justify-between text-gray-500 font-headline text-[8px] border-b-2 border-border pb-2 mb-4"><span>ID</span><span>TITLE</span><span>TIME</span></div>
                          {MUSIC_TRACKS.map((track) => (
                              <div key={track.id} onClick={() => handleTrackToggle(track)}
                                  className={`group flex items-center justify-between p-3 cursor-pointer border-2 transition-all font-mono text-xs ${activeTrackId === track.id ? 'bg-primary border-primary text-primary-foreground' : 'bg-transparent border-border text-gray-300 hover:border-secondary'}`}>
                                  <div className="flex items-center gap-4">
                                      <span className="font-headline text-[10px] w-6 opacity-50">{track.id}</span>
                                      <span className="font-bold">{track.title}</span>
                                      <FileAudio size={12} className="opacity-60"/>
                                  </div>
                                  <div className="flex items-center gap-4">
                                      <span>{track.duration}</span>
                                      {activeTrackId === track.id && isPlaying ? <div className="w-2 h-2 bg-current animate-pulse"></div> : <Play size={10} />}
                                  </div>
                              </div>
                          ))}
                      </div>

                      <div className="border-4 border-border bg-black p-4 flex flex-col items-center justify-center relative min-h-[300px]">
                          {activeTrack ? (
                              <>
                                  <div className="w-full flex justify-center items-end gap-1 h-32 mb-8 px-4">
                                      {[...Array(8)].map((_, i) => (
                                          <div key={i} className={`w-full bg-accent transition-all duration-100 ${isPlaying ? 'animate-pulse' : 'h-[2px]'}`}
                                               style={{ height: isPlaying ? `${Math.random() * 100}%` : '2px', animationDuration: `${0.2 + Math.random() * 0.5}s` }}></div>
                                      ))}
                                  </div>
                                  <div className="text-center space-y-4">
                                      <div className="space-y-1">
                                          <p className="text-primary font-headline text-[10px] animate-pulse">{isPlaying ? 'NOW PLAYING' : 'PAUSED'}</p>
                                          <p className="text-white font-headline text-xs">{activeTrack.title}</p>
                                      </div>
                                      <button onClick={handleMasterPlayPause} className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors mx-auto" aria-label={isPlaying ? 'Pause' : 'Play'}>
                                          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                                      </button>
                                       <div className="flex justify-center gap-4 mt-4 text-gray-500">
                                            <div className="flex flex-col items-center gap-1"><Disc size={16} /><span className="text-[8px] font-mono">STEREO</span></div>
                                            <div className="flex flex-col items-center gap-1"><Headphones size={16} /><span className="text-[8px] font-mono">Hi-Fi</span></div>
                                        </div>
                                  </div>
                              </>
                          ) : (
                              <div className="text-center text-gray-600">
                                  <Sliders size={48} className="mx-auto mb-4 opacity-50" />
                                  <p className="font-headline text-[10px]">SELECT TRACK</p>
                              </div>
                          )}
                      </div>
                  </div>
                </div>
            </div>
        </div>
    );
}
