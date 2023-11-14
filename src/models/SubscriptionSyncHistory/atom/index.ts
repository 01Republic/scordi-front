import {atom} from 'recoil';
import {SyncHistoryDto} from '^models/SubscriptionSyncHistory/type/subscriptionSyncHistory.type';

export const syncCurrentHistoryAtom = atom<SyncHistoryDto | null>({
    key: 'syncCurrentHistoryAtom',
    default: null,
});
