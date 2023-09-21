import {atom} from 'recoil';
import {ProgressType} from '^api/biz-ops/progress.api';

export const KBCardExcelToNotionIsModalShowAtom = atom({
    key: 'KBCardExcelToNotion/isModalShowAtom',
    default: false,
});

export const KBCardExcelToNotionInProgress = atom<ProgressType>({
    key: 'KBCardExcelToNotion/InProgress',
    default: {
        inProgress: false,
        taskFile: null,
    },
});
