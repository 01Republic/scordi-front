import {atom} from 'recoil';

export const KBCardExcelToNotionIsModalShowAtom = atom({
    key: 'KBCardExcelToNotion/isModalShowAtom',
    default: false,
});

export const KBCardExcelToNotionInProgress = atom({
    key: 'KBCardExcelToNotion/InProgress',
    default: false,
});
