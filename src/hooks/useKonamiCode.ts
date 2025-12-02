"use client";
import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const useKonamiCode = () => {
    const [success, setSuccess] = useState(false);
    const [index, setIndex] = useState(0);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === KONAMI_CODE[index]) {
            if (index === KONAMI_CODE.length - 1) {
                setSuccess(prev => !prev);
                setIndex(0);
            } else {
                setIndex(prev => prev + 1);
            }
        } else {
            setIndex(0);
        }
    }, [index]);

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    return success;
};
