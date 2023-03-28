import {atom} from 'recoil';
import {SyncHistoryDto} from '^types/applicationSyncHistory.type';

export const syncCurrentHistoryAtom = atom<SyncHistoryDto | null>({
    key: 'syncCurrentHistoryAtom',
    default: null,
});
