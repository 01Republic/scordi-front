export const zeroPad = (num: string): string => (num.length == 1 ? `0${num}` : num);

export const intlDateLong = (dateString: string | Date) => {
    return Intl.DateTimeFormat('ko', {dateStyle: 'long'}).format(new Date(dateString));
};

export const intlDateShort = (dateString: string | Date) => {
    return Intl.DateTimeFormat('ko', {month: 'long', day: '2-digit'}).format(new Date(dateString));
};

export const yyyy_mm_dd = (date: Date): string => {
    const yyyy = date.getFullYear().toString();
    const mm = zeroPad(`${date.getMonth() + 1}`);
    const dd = zeroPad(`${date.getDate()}`);
    return `${yyyy}-${mm}-${dd}`;
};

export const getToday = () => new Date();

export const dayAfter = (n: number, date?: Date): Date => {
    const d = new Date(date || getToday());
    d.setDate(d.getDate() + n);
    return d;
};

export const monthAfter = (n: number, date?: Date): Date => {
    const d = new Date(date || getToday());
    d.setMonth(d.getMonth() + n);
    return d;
};

export const dayBefore = (n: number, date?: Date) => dayAfter(n * -1, date);
export const monthBefore = (n: number, date?: Date) => monthAfter(n * -1, date);

export const firstDayOfMonth = (date?: Date): Date => {
    date ||= getToday();
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const lastDayOfMonth = (date?: Date): Date => {
    return monthAfter(1, dayBefore(1, firstDayOfMonth(date)));
};
