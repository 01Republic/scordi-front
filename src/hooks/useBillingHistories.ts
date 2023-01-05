import {getAppsBillingHistory, getBillingHistories} from '^api/billing.api';
import {useCallback, useEffect, useState} from 'react';
import {errorNotify} from '^utils/toast-notify';
import {BillingHistoryDto, GetBillingHistoriesParams} from '^types/billing.type';

export const useBillingHistories = (params: GetBillingHistoriesParams) => {
    const [page, setPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [totalItemCount, setTotalItemCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [list, setList] = useState<BillingHistoryDto[]>([]);
    const fetch = useCallback(
        (params: GetBillingHistoriesParams) => {
            if (page === (params?.page || 1)) {
                setList(list);
                return;
            }
            setIsLoading(true);
            getBillingHistories(params)
                .then(({data}) => {
                    setPage(data.pagination.currentPage);
                    setTotalPage(data.pagination.totalPage);
                    setTotalItemCount(data.pagination.totalItemCount);
                    setList([...list, ...data.items]);
                })
                .catch(errorNotify)
                .finally(() => setIsLoading(false));
        },
        [params],
    );

    useEffect(() => {
        fetch(params);
    }, []);

    return {
        data: list,
        fetch,
        isLoading,
        pagination: {
            currentPage: page,
            totalPage,
            totalItemCount,
        },
    };
};
