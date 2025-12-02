type HpBarProps = {
    current: number;
    max: number;
};

export function HpBar({ current, max }: HpBarProps) {
    const percentage = Math.min(100, Math.max(0, (current / max) * 100));
    return (
        <div className="fixed top-16 left-0 w-full h-4 bg-card z-40 border-b-2 border-black flex items-center px-2">
            <span className="text-[8px] text-white font-headline mr-2 animate-pulse">HP</span>
            <div className="flex-1 h-2 bg-background rounded-none overflow-hidden relative">
                <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-out"
                    style={{ width: `${percentage}%` }}
                />
                <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjwqgABXA6YAeR7QCdQAwAvSQzpNj2TFOgAAAAASUVORK5CYII=')] opacity-30"></div>
            </div>
            <span className="text-[8px] text-white font-headline ml-2">{Math.round(percentage)}%</span>
        </div>
    );
}
