import {atom} from 'recoil';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';
import {CurrencyCode} from '^types/money.type';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';

export const subscriptionManualFormDataDefaultValue = {
    isFreeTier: true,
    currentBillingAmount: {
        currency: CurrencyCode.USD,
    },
    billingCycleOption: BillingCycleOptions.Monthly,
    isPerUser: false,
} as CreateSubscriptionRequestDto;

export const newSubscriptionManualFormData = atom<CreateSubscriptionRequestDto>({
    key: 'newSubscriptionManualFormData',
    default: subscriptionManualFormDataDefaultValue,
});

export const newFormForGeneralInfoModalAtom = {
    isShowAtom: atom({
        key: 'v3/newSubscriptionModal/Manually/FormForGeneralInfoModal/isShow',
        default: false,
    }),
    popStateSyncKey: 'v3/newSubscriptionModal/FormForGeneralInfoModal/Manually',
};

export const newFormForBillingInfoModalAtom = {
    isShowAtom: atom({
        key: 'v3/newSubscriptionModal/Manually/FormForBillingInfoModal/isShow',
        default: false,
    }),
    popStateSyncKey: 'v3/newSubscriptionModal/FormForBillingInfoModal/Manually',
};

export const newFormForUsingMemberInfoModalAtom = {
    isShowAtom: atom({
        key: 'v3/newSubscriptionModal/Manually/FormForUsingMemberInfoModal/isShow',
        default: false,
    }),
    popStateSyncKey: 'v3/newSubscriptionModal/FormForUsingMemberInfoModal/Manually',
};

export const newFormForFinishModalAtom = {
    isShowAtom: atom({
        key: 'v3/newSubscriptionModal/Manually/newFormForFinishModalAtom/isShow',
        default: false,
    }),
    popStateSyncKey: 'v3/newSubscriptionModal/newFormForFinishModalAtom/Manually',
};

export const newFormForMemoModalAtom = {
    isShowAtom: atom({
        key: 'v3/newFormForMemoModalAtom/Manually/newFormForFinishModalAtom/isShow',
        default: false,
    }),
    popStateSyncKey: 'v3/newFormForMemoModalAtom/newFormForFinishModalAtom/Manually',
};

export const memoAtom = atom<string>({
    key: 'memoAtom',
    default: '',
});

// 메모만을 위한 subscriptionId
export const subscriptionIdAtom = atom<number>({
    key: 'subscriptionIdAtom',
    default: 0,
});
