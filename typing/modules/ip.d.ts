
declare module 'ip' {
    export function address(): string
    export function toBuffer(string): Buffer
    export function toString(Buffer): string
}
