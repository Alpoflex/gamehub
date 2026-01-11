import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatRating(rating: number): string {
    return rating.toFixed(1);
}

export function getPlatformIcon(platformName: string): string {
    const name = platformName.toLowerCase();
    if (name.includes('playstation') || name.includes('ps')) return '🎮';
    if (name.includes('xbox')) return '🎮';
    if (name.includes('pc')) return '💻';
    if (name.includes('nintendo') || name.includes('switch')) return '🎮';
    if (name.includes('ios') || name.includes('iphone')) return '📱';
    if (name.includes('android')) return '📱';
    return '🎮';
}
