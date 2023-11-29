import {atom} from 'recoil';

export enum SubscriptionListViewMode {
    Table,
    Cards,
}

export const subscriptionListViewModeState = atom({
    key: 'subscriptionListViewModeState',
    default: SubscriptionListViewMode.Table,
});
