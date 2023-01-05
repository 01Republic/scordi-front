import {getAppsBillingHistory, getBillingHistories} from '^api/billing.api';
import {useCallback, useEffect, useState} from 'react';
import {errorNotify} from '^utils/toast-notify';
import {BillingHistoryDto, GetBillingHistoriesParams} from '^types/billing.type';
import {makeFindAllResources} from '^hooks/lab/makeFindAllResources';

export const useBillingHistories = makeFindAllResources<BillingHistoryDto, GetBillingHistoriesParams>({
    key: 'getBillingHistories',
    default: [],
    fetcher: getBillingHistories,
});
