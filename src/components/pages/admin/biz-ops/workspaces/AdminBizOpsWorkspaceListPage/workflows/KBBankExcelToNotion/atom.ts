import {atom} from 'recoil';
import {ProgressType} from '^api/biz-ops/progress.api';

export const KBBankExcelToNotionIsModalShowAtom = atom({
    key: 'KBBankExcelToNotion/isModalShowAtom',
    default: false,
});

export const KBBankExcelToNotionInProgress = atom<ProgressType>({
    key: 'KBBankExcelToNotion/InProgress',
    default: {
        inProgress: false,
        taskFile: null,
    },
});
