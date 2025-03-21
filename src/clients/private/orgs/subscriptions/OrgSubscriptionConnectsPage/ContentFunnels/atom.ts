import {atom} from 'recoil';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';
import {localStorageAtoms} from '^atoms/localStorage.atom';
import {ProductDto} from '^models/Product/type';
import {AccountDto} from '^models/Account/types';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';

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

// 구독 등록 시 청구서 메일 계정 폼
export const createSubscriptionForInvoiceAccountFormData = atom<{
    invoiceAccounts: InvoiceAccountDto[];
    invoiceAccountIds: number[];
}>({
    key: 'createSubscriptionForInvoiceAccountFormData',
    default: {
        invoiceAccounts: [],
        invoiceAccountIds: [],
    },
});

// 구독 주기 (no use)
export const billingCycleTypeAtom = atom<BillingCycleOptions>({
    key: 'billingCycleTypeAtom',
    default: undefined,
});

// 선택된 앱 목록 중에서 완료된 앱 목록 (구독 등록을 위한 앱 선택 컨텍스트에서)
export const finishedProductMapAtom = atom<Record<number, ProductDto>>({
    key: 'finishedProductMapAtom',
    default: {},
});
