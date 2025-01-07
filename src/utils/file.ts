import {roundNumber} from '^utils/number';

export function parseFileSizeText(size: number) {
    const units: ('Bytes' | 'KB' | 'MB' | 'GB')[] = ['Bytes', 'KB', 'MB', 'GB'];
    let i = 0;

    while (size > 900) {
        size /= 1000;
        i++;
    }

    const unit = units[i];
    const pos = {
        Bytes: 0,
        KB: 0,
        MB: 1,
        GB: 2,
    }[unit];
    return roundNumber(size, pos).toLocaleString() + ' ' + unit;
}
