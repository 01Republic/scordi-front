import {atom} from 'recoil';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';

export const currentStepAtom = atom({
    key: 'currentStepAtom',
    default: 1,
});

// 무료 이용 여부 (참: 무료 / 거짓: 유료)
export const recurringIsFreeAtom = atom({
    key: 'recurringIsFreeAtom',
    default: false,
});

// 구독 등록 폼
export const createSubscriptionFormData = atom<CreateSubscriptionRequestDto>({
    key: 'createSubscriptionFormData',
    default: {} as CreateSubscriptionRequestDto,
});

// 구독 주기 (no use)
export const billingCycleTypeAtom = atom<BillingCycleOptions>({
    key: 'billingCycleTypeAtom',
    default: undefined,
});
