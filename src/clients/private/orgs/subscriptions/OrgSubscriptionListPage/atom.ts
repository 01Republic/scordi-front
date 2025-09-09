import {atom} from 'recoil';
import {SubscriptionDto} from '^models/Subscription/types';
import {localStorageEffect} from '^atoms/localStorageEffect';
import {ColumnId, defaultVisibleColumns} from './TableColumnsHandler/tableColumns';

export const checkedSubscriptionList = atom<SubscriptionDto[]>({
    key: 'checkedSubscriptionList',
    default: [],
});

export const visibleColumnsState = atom<ColumnId[]>({
    key: 'visibleColumnsState',
    default: defaultVisibleColumns,
    effects_UNSTABLE: [localStorageEffect('visibleColumnsState')],
});
