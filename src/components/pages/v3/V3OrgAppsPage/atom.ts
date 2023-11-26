import {atom} from 'recoil';
import {SubscriptionDto} from '^models/Subscription/types';

export const subscriptionsForCurrentOrgState = atom<SubscriptionDto[]>({
    key: 'subscriptionsForCurrentOrgState',
    default: [],
});
