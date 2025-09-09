import {atom, AtomEffect} from 'recoil';
import {SubscriptionDto} from '^models/Subscription/types';
import {ColumnId, defaultVisibleColumns} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/tableColums';
import {localStorageEffect} from '^atoms/localStorageEffect';

export const checkedSubscriptionList = atom<SubscriptionDto[]>({
    key: 'checkedSubscriptionList',
    default: [],
});

export const visibleColumnsState = atom<ColumnId[]>({
    key: 'visibleColumnsState',
    default: defaultVisibleColumns,
    effects_UNSTABLE: [localStorageEffect('visibleColumnsState')],
});
