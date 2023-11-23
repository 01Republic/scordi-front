import {atom} from 'recoil';

export const isAddingModeState = atom<boolean>({
    key: 'ReportItemModal/isAddingMode',
    default: false,
});
