import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function generateHash(url: string): Promise<string> {
    // converting the URL to a hexadecimal value, so we can encode it to Base62 later
    const buf = new TextEncoder().encode(url)
    const hashBuffer = await crypto.subtle.digest('SHA-256', buf);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const uid = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return shuffleString(toBase62(uid)).slice(0, 7);
}

function toBase62(hashHex: string): string {
    const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    // Convert hexadecimal string to BigInt
    let value = BigInt('0x' + hashHex);

    // Convert to Base62
    while (value > 0) {
        result = charset.charAt(Number(value % BigInt(62))) + result;
        value = value / BigInt(62);
    }

    return result;
}

function shuffleString(str: string){
    const chars = str.split('');
    return chars.sort(() => Math.random() - .5).join('');
}