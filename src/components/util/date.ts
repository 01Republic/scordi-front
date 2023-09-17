export const dateSortBy = <T>(method: 'ASC' | 'DESC', getDateFn?: (obj: T) => Date) => {
    return (a: T, b: T) => {
        const dateA = getDateFn ? getDateFn(a) : (a as Date);
        const dateB = getDateFn ? getDateFn(b) : (b as Date);

        if (method === 'ASC') {
            return dateA.getTime() - dateB.getTime();
        } else {
            return dateB.getTime() - dateA.getTime();
        }
    };
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
export const monthAfter = (n: number, date = new Date()) => {
    const base = new Date(date);
    base.setMonth(base.getMonth() + n);
    return base;
};
export const yearAfter = (n: number, date = new Date()) => {
    const base = new Date(date);
    base.setFullYear(base.getFullYear() + n);
    return base;
};

export const dayBefore = (n: number, date = new Date()) => dayAfter(n * -1, date);
export const monthBefore = (n: number, date = new Date()) => monthAfter(n * -1, date);
export const yearBefore = (n: number, date = new Date()) => yearAfter(n * -1, date);

/**
 * Month
 */
export const firstDayOfMonth = (date = new Date()): Date => {
    const base = new Date(date);
    return new Date(base.getFullYear(), base.getMonth(), 1);
};
export const lastDayOfMonth = (date = new Date()): Date => {
    return monthAfter(1, dayBefore(1, firstDayOfMonth(date)));
};

/**
 * Year
 */
export const firstDayOfYear = (date = new Date()): Date => {
    const base = new Date(date);
    return new Date(base.getFullYear(), 0, 1);
};
export const lastDayOfYear = (date = new Date()): Date => {
    return yearAfter(1, dayBefore(1, firstDayOfYear(date)));
};
