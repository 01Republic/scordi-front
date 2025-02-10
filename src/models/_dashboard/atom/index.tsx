import {atom} from 'recoil';
import {MonthsType} from '^models/_dashboard/type/Months.type';

export const selectedMonthAtom = atom<MonthsType>({
    key: 'selectedMonthAtom',
    default: '01월',
});
