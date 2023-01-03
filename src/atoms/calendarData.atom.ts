import {atom} from 'recoil';
import {DashboardDaySumDto} from '^types/dashboard.type';

export const calendarDataAtom = atom({
    key: '@dashboard/calendarData',
    default: [] as DashboardDaySumDto[],
});
