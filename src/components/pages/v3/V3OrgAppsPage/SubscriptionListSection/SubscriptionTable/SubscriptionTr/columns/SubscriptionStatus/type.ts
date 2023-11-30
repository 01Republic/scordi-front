import {SubscriptionStatus, SubscriptionStatusClassName, SubscriptionStatusLabel} from '^models/Subscription/types';

export type Option = {
    status: SubscriptionStatus;
    name: string;
    className: string;
};

export const options: Option[] = [
    {
        status: SubscriptionStatus.PAYMENT_SUCCESS,
        name: SubscriptionStatusLabel.PAYMENT_SUCCESS,
        className: SubscriptionStatusClassName.PAYMENT_SUCCESS,
    },
    {
        status: SubscriptionStatus.PAYMENT_PENDING,
        name: SubscriptionStatusLabel.PAYMENT_PENDING,
        className: SubscriptionStatusClassName.PAYMENT_PENDING,
    },
    {
        status: SubscriptionStatus.PAYMENT_FAILURE,
        name: SubscriptionStatusLabel.PAYMENT_FAILURE,
        className: SubscriptionStatusClassName.PAYMENT_FAILURE,
    },
    {
        status: SubscriptionStatus.FREE_TRIAL_STARTED,
        name: SubscriptionStatusLabel.FREE_TRIAL_STARTED,
        className: SubscriptionStatusClassName.FREE_TRIAL_STARTED,
    },
    {
        status: SubscriptionStatus.CANCELED,
        name: SubscriptionStatusLabel.CANCELED,
        className: SubscriptionStatusClassName.CANCELED,
    },
    {
        status: SubscriptionStatus.FREE_TRIAL_EXPIRED,
        name: SubscriptionStatusLabel.FREE_TRIAL_EXPIRED,
        className: SubscriptionStatusClassName.FREE_TRIAL_EXPIRED,
    },
    {
        status: SubscriptionStatus.PAUSED,
        name: SubscriptionStatusLabel.PAUSED,
        className: SubscriptionStatusClassName.PAUSED,
    },
];
