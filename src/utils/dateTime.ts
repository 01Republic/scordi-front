export const intlDateLong = (dateString: string | Date) => {
    return Intl.DateTimeFormat('ko', {dateStyle: 'long'}).format(new Date(dateString));
}

export const intlDateShort = (dateString: string | Date) => {
    return Intl.DateTimeFormat('ko', {month: 'long', day: '2-digit'}).format(new Date(dateString));
}