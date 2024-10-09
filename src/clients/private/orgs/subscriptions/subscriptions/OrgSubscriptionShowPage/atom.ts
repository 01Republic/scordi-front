import {atom} from 'recoil';
import {SubscriptionDto} from '^models/Subscription/types';

export const subscriptionSubjectAtom = atom<SubscriptionDto | null>({
    key: 'OrgSubscriptionShowPage/subscriptionSubjectAtom',
    default: null,
});
