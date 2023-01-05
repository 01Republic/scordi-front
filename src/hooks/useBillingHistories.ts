import {getBillingHistories} from '^api/billing.api';
import {BillingHistoryDto, GetBillingHistoriesParams} from '^types/billing.type';
import {makeFindAllResources} from '^hooks/lab/makeFindAllResources';

export const useBillingHistories = makeFindAllResources<BillingHistoryDto, GetBillingHistoriesParams>({
    key: 'getBillingHistories',
    default: [],
    fetcher: getBillingHistories,
});
