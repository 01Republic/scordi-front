import {captures} from '^utils/array';
import {format, formatDistance, formatDistanceToNow} from 'date-fns';
import {ko} from 'date-fns/locale';

export const zeroPad = (num: string): string => (num.length == 1 ? `0${num}` : num);

export const intlDateLong = (dateString: string | Date) => {
    return Intl.DateTimeFormat('ko', {dateStyle: 'long'}).format(new Date(dateString));
};

export const intlDateShort = (dateString: string | Date, options: Intl.DateTimeFormatOptions = {}) => {
    return Intl.DateTimeFormat('ko', {month: 'long', day: '2-digit', ...options}).format(new Date(dateString));
};

export const intlDateRangeShort = (
    startDateString: string | Date,
    endDateString: string | Date,
    options: Intl.DateTimeFormatOptions = {},
) => {
    const from = new Date(startDateString);
    const to = new Date(endDateString);
    return Intl.DateTimeFormat('ko', {month: 'long', day: '2-digit', ...options}).formatRange(from, to);
};

export const yyyy_mm_dd = (date: Date, sep = '-'): string => {
    const yyyy = date.getFullYear().toString();
    const mm = zeroPad(`${date.getMonth() + 1}`);
    const dd = zeroPad(`${date.getDate()}`);
    return [yyyy, mm, dd].join(sep);
};

export const hh_mm = (date: Date, sep = ':'): string => {
    const hour = zeroPad(`${date.getHours()}`);
    const min = zeroPad(`${date.getMinutes()}`);
    return [hour, min].join(sep);
};

export const yyyy_mm_dd_hh_mm = (date: Date): string => {
    return `${yyyy_mm_dd(date)} ${hh_mm(date)}`;
};

export const yyyy_mm = (date: Date, year = '년', month = '월'): string => {
    const yyyy = date.getFullYear().toString() + year;
    const mm = zeroPad(`${date.getMonth() + 1}`) + month;
    return [yyyy, mm].join(' ');
};

export const mm_dd = (date: Date, sep = '.'): string => {
    const mm = zeroPad(`${date.getMonth() + 1}`);
    const dd = zeroPad(`${date.getDate()}`);
    return [mm, dd].join(sep);
};

export const datetime_local = (date: Date): string => {
    // return `${date.toISOString().replace(/:\d\d\..*/, '')}`;
    return [yyyy_mm_dd(date), hh_mm(date)].join('T');
};

export function yyyymmddToDate(yyyymmdd: string): Date {
    const [year, month, day] = captures(yyyymmdd, /(\d{4})(\d{2})(\d{2})/);
    return new Date(`${year}-${month}-${day} `);
}

export const getToday = () => new Date();

export const getLocalOffset = (): number => {
    const ymd = yyyy_mm_dd(new Date());
    const dateWithOffset = new Date(ymd);
    const dateWithoutOffset = new Date(`${ymd} `);
    return dateWithOffset.getHours() - dateWithoutOffset.getHours();
};

export const secondAfter = (n: number, date?: Date): Date => {
    const d = new Date(date || getToday());
    d.setHours(d.getHours() + n);
    return d;
};
export const minuteAfter = (n: number, date?: Date): Date => {
    const d = new Date(date || getToday());
    d.setHours(d.getHours() + n);
    return d;
};
export const hourAfter = (n: number, date?: Date): Date => {
    const d = new Date(date || getToday());
    d.setHours(d.getHours() + n);
    return d;
};
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

export const secondBefore = (n: number, date?: Date) => secondAfter(n * -1, date);
export const minuteBefore = (n: number, date?: Date) => minuteAfter(n * -1, date);
export const hourBefore = (n: number, date?: Date) => hourAfter(n * -1, date);
export const dayBefore = (n: number, date?: Date) => dayAfter(n * -1, date);
export const monthBefore = (n: number, date?: Date) => monthAfter(n * -1, date);
export const yearBefore = (n: number, date = new Date()) => yearAfter(n * -1, date);

/**
 * Day
 */
export const startOfDay = (date?: Date) => hourBefore(getLocalOffset(), date);

export function todayOf(date: Date, sep = '-') {
    return yyyy_mm_dd(dayBefore(0, startOfDay(date)), sep);
}

export function yesterdayOf(date: Date, sep = '-') {
    return yyyy_mm_dd(dayBefore(1, startOfDay(date)), sep);
}

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
export const firstDayOfYear = (base = new Date()): Date => {
    const date = new Date(base);
    return new Date(date.getFullYear(), 0, 1);
};
export const lastDayOfYear = (base = new Date()): Date => {
    return yearAfter(1, dayBefore(1, firstDayOfYear(base)));
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

/**
 * D-day 계산기 (자연수면 남은거, 음수면 지난거)
 * @param target: 목표일
 * @param base: 기준일(기본값: 오늘)
 * @return number
 */
export function d_day(target: Date, base?: Date) {
    base ||= new Date();

    const diff = target.getTime() - base.getTime(); // ms 기준 차이 계산하여 정수 반환
    const distance = Math.abs(diff); // 절대값 적용하여 차이를 양수로 만듦.
    const direction = diff >= 0 ? 1 : -1;

    const distanceOfDay = Math.ceil(distance / (1000 * 3600 * 24));
    return distanceOfDay * direction;
}

export function ago(
    target: Date,
    base: Date = new Date(),
    options: {
        locale?: Locale;
        weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        firstWeekContainsDate?: number;
        useAdditionalWeekYearTokens?: boolean;
        useAdditionalDayOfYearTokens?: boolean;
    } = {locale: ko},
) {
    const diff = target.getTime() - base.getTime(); // ms 기준 차이 계산하여 정수 반환
    const distance = Math.abs(diff); // 절대값 적용하여 차이를 양수로 만듦.
    const distanceOfDay = Math.floor(distance / (1000 * 3600 * 24));

    return distanceOfDay > 0 ? format(target, 'yyyy-MM-dd', options) : `${formatDistance(target, base, options)}전`;
}

export function formatDate(date: Date) {
    const d = new Date(date);
    const now = Date.now();
    const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
    if (diff < 60 * 1) {
        // 1분 미만일땐 방금 전 표기
        return '방금 전';
    }
    if (diff < 60 * 60 * 24 * 3) {
        // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
        return formatDistanceToNow(d, {addSuffix: true, locale: ko});
    }
    return format(d, 'P p', {locale: ko}); // 날짜 포맷
}

export function l(date: Date, formatStr: string = 'yyyy-MM-dd HH:mm:ss') {
    return format(date, formatStr || 'yyyy-MM-dd HH:mm:ss', {locale: ko});
}

export function lpp(date: Date, formatStr: string = 'Pp') {
    return format(date, formatStr || 'Pp', {locale: ko});
}

/**
 * Group By
 */
export function groupByDate<T>(items: T[], getDate: (item: T) => Date): Record<string, T[]> {
    const container: Record<string, T[]> = {};

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
