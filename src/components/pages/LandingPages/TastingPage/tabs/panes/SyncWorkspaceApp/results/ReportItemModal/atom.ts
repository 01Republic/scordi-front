import {atom} from 'recoil';

// add member mode
export const isAddingModeState = atom<boolean>({
    key: 'ReportItemModal/isAddingMode',
    default: false,
});

// edit app mode
export const isEditModeState = atom<boolean>({
    key: 'isEditModeState',
    default: false,
});
