const today = new Date();
const offset = today.getTimezoneOffset() * 60000;

today.setHours(23);
today.setMinutes(59);
today.setSeconds(59);
today.setMilliseconds(999);

const endDateTime = new Date(today.getTime() - offset);

export const dateTimeInputMax = endDateTime.toISOString().slice(0, 16);
