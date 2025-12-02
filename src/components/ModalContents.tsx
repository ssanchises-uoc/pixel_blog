import { NotFound } from "@/components/NotFound";

export function CreditsModalContent() {
    return (
        <>
            <p>DESIGN & CODE:<br />DEV_PLAYER_1</p>
            <p>IMAGES:<br />UNSPLASH.COM</p>
            <p>FONTS:<br />GOOGLE FONTS</p>
            <p className="text-primary mt-4">THANKS FOR PLAYING!</p>
        </>
    );
}

export function LegalModalContent() {
    return (
        <>
            <p>TERMS OF SERVICE v1.0</p>
            <p>This is a portfolio project. All retro assets are used for educational/demo purposes.</p>
            <p>No cookies were harmed in the making of this website.</p>
        </>
    );
}

export function DebugModalContent() {
    return (
        <div className="py-10">
            <NotFound minimal />
        </div>
    );
}
