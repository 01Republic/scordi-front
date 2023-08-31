import {atom} from 'recoil';
import {SyncHistoryDto} from '^types/subscriptionSyncHistory.type';

export const syncCurrentHistoryAtom = atom<SyncHistoryDto | null>({
    key: 'syncCurrentHistoryAtom',
    default: null,
});
