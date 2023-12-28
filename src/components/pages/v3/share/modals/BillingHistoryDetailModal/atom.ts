import {atom} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {BillingHistoryDto, CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {CurrencyCode} from '^types/money.type';

/**
 * 결제내역 상세모달 상태
 */
export const billingHistoryShowModal = {
    isShowAtom: atom({
        key: 'v3/billingHistoryShowModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'billingHistoryShowModal',
};

/**
 * [결제내역 상세모달에서] 대상 결제내역 세부 정보 상태
 */
export const billingHistoryDetailStateInShowModal = atom<BillingHistoryDto | null>({
    key: 'billingHistoryDetailState/InShowModal',
    default: null,
});

/**
 * [결제내역 상세모달에서] 해당 구독의 전체 결제내역 상태 (paginated)
 */
export const billingHistoryPagedStateInShowModal = atom<Paginated<BillingHistoryDto>>({
    key: 'billingHistoryPagedState/InShowModal',
    default: {
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 1,
            currentPage: 1,
            itemsPerPage: 30,
        },
    },
});

/**
 * 결제내역추가 모달 상태
 */
export const addBillingHistoryShowModal = {
    isShowAtom: atom({
        key: 'v3/addBillingHistoryShowModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'addBillingHistoryShowModal',
};

/**
 * 결제내역추가 진행 상태
 */
export enum AddBillingHistory {
    PayMethod,
    Amount,
    DetailInfo,
    Finish,
    Memo,
}

export const AddBillingHistoryState = atom<AddBillingHistory>({
    key: 'AddBillingHistoryState',
    default: AddBillingHistory.PayMethod,
});

/**
 * 화폐 선택 모달 상태
 */
export const currencySelectShowModal = {
    isShowAtom: atom({
        key: 'v3/currencySelectShowModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'currencySelectShowModal',
};

/**
 * 화폐 선택 state
 */

export type SelectedCurrency = {label: CurrencyCode; desc: string};
export const selectedCurrencyState = atom<SelectedCurrency>({
    key: 'selectedCurrencyState',
    default: {label: CurrencyCode.USD, desc: 'United States Dollar'},
});

export const selectedCurrencyForSubscriptionState = atom<SelectedCurrency>({
    key: 'selectedCurrencyState/forSubscription',
    default: {label: CurrencyCode.USD, desc: 'United States Dollar'},
});
