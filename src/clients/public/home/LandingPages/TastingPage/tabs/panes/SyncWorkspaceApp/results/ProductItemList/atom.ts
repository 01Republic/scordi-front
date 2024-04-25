import {atom} from 'recoil';

export const isAddingModeState = atom<boolean>({
    key: 'ReportItemApp/isAddingMode',
    default: false,
});
