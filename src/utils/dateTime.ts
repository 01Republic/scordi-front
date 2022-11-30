export const intlDateLong = (dateString: string | Date) => {
    return Intl.DateTimeFormat('ko', {dateStyle: 'long'}).format(
        new Date(dateString),
    );
};

export const intlDateShort = (dateString: string | Date) => {
    return Intl.DateTimeFormat('ko', {month: 'long', day: '2-digit'}).format(
        new Date(dateString),
    );
};

export const yyyy_mm_dd = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const dt = new Date(date.getTime() - offset * 60 * 1000);
    return dt.toISOString().split('T')[0];
};
