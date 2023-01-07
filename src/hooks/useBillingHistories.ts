import {getBillingHistories, getBillingHistory} from '^api/billing.api';
import {BillingHistoryDto, GetBillingHistoriesParams} from '^types/billing.type';
import {makeFindAllResources} from '^hooks/lab/makeFindAllResources';
import {atom, useRecoilState} from 'recoil';
import {useCallback, useEffect, useState} from 'react';
import {errorNotify} from '^utils/toast-notify';

const getBillingHistoriesAtom = atom({
    key: 'useBillingHistories',
    default: [] as BillingHistoryDto[],
});

const getBillingHistoryAtom = atom({
    key: 'useBillingHistory',
    default: null as BillingHistoryDto | null,
});

export const useBillingHistories = makeFindAllResources<BillingHistoryDto, GetBillingHistoriesParams>({
    // key: 'useBillingHistories',
    // default: [],
    atom: getBillingHistoriesAtom,
    fetcher: getBillingHistories,
    appendMode: false,
});

export const useBillingHistory = (id: number | null) => {
    const [isLoading, setIsLoading] = useState(false);
    const [billingHistory, setBillingHistory] = useRecoilState(getBillingHistoryAtom);

    const fetch = useCallback(
        (id: number) => {
            setIsLoading(true);
            getBillingHistory(id)
                .then(({data}) => setBillingHistory(data))
                .catch(errorNotify)
                .finally(() => setIsLoading(false));
        },
        [id],
    );

    useEffect(() => {
        if (!id) return;
        fetch(id);
    }, [id]);

    return {data: billingHistory, fetch, isLoading};
};
