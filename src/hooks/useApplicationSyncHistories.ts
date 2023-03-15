import {useCallback, useEffect, useState} from 'react';
import {atom, useRecoilState} from 'recoil';
import {
    syncCurrentHistoryAtom,
    syncHistoryListAtom,
    syncHistoryListFetchItemsQueryParamAtom,
    syncHistoryListPaginationAtom,
} from '^atoms/applicationSyncHistories.atom';
import {getSyncHistories, getSyncHistory} from '^api/applicationSyncHistories.api';
import {errorNotify} from '^utils/toast-notify';
import {FindAllSyncHistoryQuery} from '^types/applicationSyncHistory.type';

export const useSyncHistoryList = () => {
    const [items, setItems] = useRecoilState(syncHistoryListAtom);
    const [pagination, setPagination] = useRecoilState(syncHistoryListPaginationAtom);
    const [queryParams, setQueryParams] = useRecoilState(syncHistoryListFetchItemsQueryParamAtom);

    const fetchItems = useCallback(
        (applicationId: number, page: number, force?: boolean) => {
            if (!force && pagination.currentPage === page) return;

            const params: FindAllSyncHistoryQuery = {
                where: {applicationId},
                order: {id: 'DESC'},
                page,
                itemsPerPage: pagination.itemsPerPage,
            };
            if (!force && JSON.stringify(queryParams) === JSON.stringify(params)) return;

            setQueryParams(params);
            return getSyncHistories(applicationId, params)
                .then((res) => {
                    setItems(res.data.items);
                    setPagination(res.data.pagination);
                })
                .catch(errorNotify);
        },
        [pagination, queryParams],
    );

    return {
        items,
        fetchItems,
        pagination,
    };
};

export const useCurrentSyncHistory = () => {
    const [currentSyncHistory, setCurrentSyncHistory] = useRecoilState(syncCurrentHistoryAtom);

    const mutate = useCallback((applicationId: number) => {
        getSyncHistories(applicationId, {
            where: {applicationId},
            order: {id: 'DESC'},
            itemsPerPage: 1,
        })
            .then((res) => {
                setCurrentSyncHistory(res.data.items[0] || null);
            })
            .catch(errorNotify);
    }, []);

    return {
        currentSyncHistory,
        fetchCurrentSyncHistory: mutate,
    };
};
