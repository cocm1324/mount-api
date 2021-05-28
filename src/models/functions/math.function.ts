export function greatestCommonDivisor(_a: number, _b: number) {
    const a = Math.floor(_a);
    const b = Math.floor(_b);

    if (!b) {
        return a;
    }
    
    return greatestCommonDivisor(b, a % b);
}