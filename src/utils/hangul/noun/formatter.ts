export type Formatter<R, D = any> = string | ((parsed: D) => R);

type Values = {noun: string; postposition: string};

export function toFormat<R>(val: Values, format: Formatter<R, Values> = '%w%s') {
    const {noun, postposition} = val;

    if (typeof format === 'string') {
        return format.replace('%w', noun).replace('%s', postposition);
    }

    return format({noun, postposition});
}
