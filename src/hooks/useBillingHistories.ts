import {getBillingHistories} from '^api/billing.api';
import {BillingHistoryDto, GetBillingHistoriesParams} from '^types/billing.type';
import {makeFindAllResources} from '^hooks/lab/makeFindAllResources';
import {atom} from 'recoil';

const getBillingHistoriesAtom = atom({
    key: 'useBillingHistories',
    default: [] as BillingHistoryDto[],
});

export const useBillingHistories = makeFindAllResources<BillingHistoryDto, GetBillingHistoriesParams>({
    // key: 'useBillingHistories',
    // default: [],
    atom: getBillingHistoriesAtom,
    fetcher: getBillingHistories,
    appendMode: false,
});
