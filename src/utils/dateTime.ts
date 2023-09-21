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

export const hh_mm = (date: Date): string => {
    const hour = zeroPad(`${date.getHours()}`);
    const min = zeroPad(`${date.getMinutes()}`);
    return `${hour}:${min}`;
};

export const yyyy_mm_dd_hh_mm = (date: Date): string => {
    return `${yyyy_mm_dd(date)} ${hh_mm(date)}`;
};

export const datetime_local = (date: Date): string => {
    // return `${date.toISOString().replace(/:\d\d\..*/, '')}`;
    return [yyyy_mm_dd(date), hh_mm(date)].join('T');
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
export const yearAfter = (n: number, date = new Date()) => {
    const base = new Date(date);
    base.setFullYear(base.getFullYear() + n);
    return base;
};

export const dayBefore = (n: number, date?: Date) => dayAfter(n * -1, date);
export const monthBefore = (n: number, date?: Date) => monthAfter(n * -1, date);
export const yearBefore = (n: number, date = new Date()) => yearAfter(n * -1, date);

/**
 * Month
 */
export const firstDayOfMonth = (date?: Date): Date => {
    date ||= getToday();
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const lastDayOfMonth = (date?: Date): Date => {
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

export const dateIsEqual = (d1?: Date, d2?: Date) => {
    if (!d1 || !d2) return false;
    return d1.getTime() === d2.getTime();
};

export const dateIsBeforeThen = (d1?: Date, d2?: Date) => {
    if (!d1 || !d2) return false;
    return d1.getTime() <= d2.getTime();
};

/**
 * Duration
 */
type DistanceOfTimeObj = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
};

export function getDistanceOfTime(date1: Date, date2: Date): DistanceOfTimeObj {
    const diff = date2.getTime() - date1.getTime();
    let msec = diff;

    const year = Math.floor(msec / 1000 / 60 / 60 / 24 / 365);
    msec -= year * 1000 * 60 * 60 * 24 * 365;

    const month = Math.floor(msec / 1000 / 60 / 60 / 24 / 30);
    msec -= month * 1000 * 60 * 60 * 24 * 30;

    const day = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= day * 1000 * 60 * 60 * 24;

    //

    const hour = Math.floor(msec / 1000 / 60 / 60);
    msec -= hour * 1000 * 60 * 60;

    const minute = Math.floor(msec / 1000 / 60);
    msec -= minute * 1000 * 60;

    const second = Math.floor(msec / 1000);
    msec -= second * 1000;

    return {year, month, day, hour, minute, second};
}

interface HumanizeTimeDistanceOption {
    shorten?: boolean;
    text?: {
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
    };
}

export function humanizeTimeDistance(obj: DistanceOfTimeObj, option?: HumanizeTimeDistanceOption): string {
    const opt = option || {};
    const text = opt.text || {};
    text.year ||= 'years';
    text.month ||= 'months';
    text.day ||= 'days';
    text.hour ||= 'hours';
    text.minute ||= 'minutes';
    text.second ||= 'seconds';

    const isShorten = (n: number) => (opt.shorten ? !n : true);

    const words: string[] = [];

    if (obj.year) words.push(`${obj.year} ${text.year}`);
    if (isShorten(obj.year) && obj.month) words.push(`${obj.month} ${text.month}`);
    if (isShorten(obj.month) && obj.day) words.push(`${obj.day} ${text.day}`);
    if (isShorten(obj.day) && obj.hour) words.push(`${obj.hour} ${text.hour}`);
    if (isShorten(obj.hour) && obj.minute) words.push(`${obj.minute} ${text.minute}`);
    if (isShorten(obj.minute) && obj.second) words.push(`${obj.second} ${text.second}`);

    return words.join(' ');
}

export function humanizeTimeDistance2(date1: Date, date2: Date, option?: HumanizeTimeDistanceOption) {
    const text = humanizeTimeDistance(getDistanceOfTime(date1, date2), {
        shorten: option?.shorten || false,
        text: option?.text || {
            year: '년',
            month: '월',
            day: '일',
            hour: '시간',
            minute: '분',
            second: '초',
        },
    }).trim();

    return text.startsWith('-') ? `${text} 지남` : `${text} 후`;
}

export function groupByDate<T>(items: T[], getDate: (item: T) => Date): Record<string, T[]> {
    const container: Record<string, T[]> = {};
    // const getDate = (item: GmailItem) => item?.metadata?.date;

    items.forEach((item) => {
        const date = getDate(item);
        container[date.toISOString()] ||= [];
        container[date.toISOString()].push(item);
    });

    return container;
}

export function groupBy<T, R extends string | number | symbol>(items: T[], fn: (item: T) => R): Record<R, T[]> {
    const container = {} as Record<R, T[]>;

    items.forEach((item) => {
        const key = fn(item);
        container[key] ||= [];
        container[key].push(item);
    });

    return container;
}
