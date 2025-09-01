import {atom} from 'recoil';
import {SubscriptionDto} from '^models/Subscription/types';

export const checkedSubscriptionList = atom<SubscriptionDto[]>({
    key: 'checkedSubscriptionList',
    default: [],
});
