export function oneOfList<T, F = undefined>(iter: T[], fallback?: F): T | F {
    return (iter[0] || fallback) as T | F;
}

export function pick<T, F = undefined>(item: T, fallback?: F): T | F {
    return (item || fallback) as T | F;
}
