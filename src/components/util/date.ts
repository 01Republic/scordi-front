export const dateSortBy =
    <T>(method: 'ASC' | 'DESC', getDateFn?: (obj: T) => Date) =>
    (a: T, b: T) => {
        const dateA = getDateFn ? getDateFn(a) : (a as Date);
        const dateB = getDateFn ? getDateFn(b) : (b as Date);

        if (method === 'ASC') {
            return dateA.getTime() - dateB.getTime();
        } else {
            return dateB.getTime() - dateA.getTime();
        }
    };

export function largerThan(target: Date, now = new Date()) {
    const base = new Date(now);
    return base.getTime() < target.getTime();
}

export const dayAfter = (n: number, date = new Date()) => {
    const base = new Date(date);
    base.setDate(base.getDate() + n);
    return base;
};

export const dayBefore = (n: number, date = new Date()) => dayAfter(n * -1, date);

export const monthAfter = (n: number, date = new Date()) => {
    const base = new Date(date);
    base.setDate(base.getDate() + n);
    return base;
};

export const monthBefore = (n: number, date = new Date()) => monthAfter(n * -1, date);

export const yearAfter = (n: number, date = new Date()) => {
    const base = new Date(date);
    base.setFullYear(base.getFullYear() + n);
    return base;
};

export const yearBefore = (n: number, date = new Date()) => yearAfter(n * -1, date);
