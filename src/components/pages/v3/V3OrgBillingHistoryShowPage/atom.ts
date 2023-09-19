import {atom} from 'recoil';
import {BillingHistoryDto} from '^types/billing.type';
import {Paginated} from '^types/utils/paginated.dto';

export const billingHistoryShowModal = {
    isShowAtom: atom({
        key: 'v3/billingHistoryShowModal/IsShow',
        default: false,
    }),
    popStateSyncKey: 'billingHistoryShowModal',
};

export const billingHistoryDetailState = atom<BillingHistoryDto | null>({
    key: 'billingHistoryDetailState',
    default: null,
});

export const billingHistoryPagedState = atom<Paginated<BillingHistoryDto>>({
    key: 'billingHistoryPagedState',
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
