"use client";
import React, { createContext, useState, useRef, useEffect, useCallback } from 'react';
import * as Tone from 'tone';

type AppContextType = {
    crtEnabled: boolean;
    setCrtEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
    playSfx: (type: 'hover' | 'click' | 'confirm' | 'error') => void;
    soundEnabled: boolean;
    toggleSound: () => void;
};

export const AppContext = createContext<AppContextType>({
    crtEnabled: false,
    setCrtEnabled: () => {},
    volume: 0.5,
    setVolume: () => {},
    playSfx: () => {},
    soundEnabled: true,
    toggleSound: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [crtEnabled, setCrtEnabledState] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const storedVolumeRef = useRef(0.5);
    const sfxGainRef = useRef<Tone.Gain | null>(null);

    const setCrtEnabled = useCallback((value: boolean | ((prevState: boolean) => boolean)) => {
        setCrtEnabledState(prev => {
            const newValue = typeof value === 'function' ? value(prev) : value;
            localStorage.setItem('pixelblog_crt_enabled', JSON.stringify(newValue));
            return newValue;
        });
    }, []);

    useEffect(() => {
        try {
            const savedCrt = localStorage.getItem('pixelblog_crt_enabled');
            if (savedCrt !== null) {
                setCrtEnabledState(JSON.parse(savedCrt));
            }
        } catch (error) {
            console.error("Could not parse CRT setting from localStorage", error);
        }
    }, []);
    
    const playSfx = useCallback((type: 'hover' | 'click' | 'confirm' | 'error') => {
        if (!soundEnabled || volume === 0) return;

        const initializeAndPlay = async () => {
             if (Tone.context.state !== 'running') {
                await Tone.start();
            }
            if (!sfxGainRef.current) {
                sfxGainRef.current = new Tone.Gain(volume).toDestination();
            }
            sfxGainRef.current.gain.value = volume;

            const synth = new Tone.Synth().connect(sfxGainRef.current);
            const now = Tone.now();

            switch (type) {
                case 'hover':
                    synth.triggerAttackRelease(880, '32n', now);
                    break;
                case 'click':
                     synth.oscillator.type = 'triangle';
                     synth.triggerAttackRelease(440, '16n', now);
                    break;
                case 'confirm':
                    const confirmSynth = new Tone.Synth({oscillator: {type: 'square'}}).connect(sfxGainRef.current);
                    confirmSynth.triggerAttackRelease("C5", "16n", now);
                    confirmSynth.triggerAttackRelease("G5", "16n", now + 0.1);
                    break;
                case 'error':
                    const errorSynth = new Tone.Synth({oscillator: {type: 'sawtooth'}}).connect(sfxGainRef.current);
                    errorSynth.triggerAttackRelease("G#2", "8n", now);
                    break;
            }
            // Clean up synth to avoid memory leaks
            setTimeout(() => synth.dispose(), 200);
        };

        initializeAndPlay();
    }, [volume, soundEnabled]);
    
    const toggleSound = () => {
        setSoundEnabled(prev => {
            const isEnabled = !prev;
            if (isEnabled) {
                setVolume(storedVolumeRef.current);
            } else {
                storedVolumeRef.current = volume;
                setVolume(0);
            }
            return isEnabled;
        });
    };

    const value = {
        crtEnabled,
        setCrtEnabled,
        volume,
        setVolume,
        playSfx,
        soundEnabled,
        toggleSound,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
