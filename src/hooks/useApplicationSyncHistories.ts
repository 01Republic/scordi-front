import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {syncCurrentHistoryAtom} from '^atoms/subscriptionSyncHistories.atom';
import {getSyncHistories} from '^api/subscriptionSyncHistories.api';
import {errorNotify} from '^utils/toast-notify';
import {SyncHistoryDto} from '^types/subscriptionSyncHistory.type';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';

export const {paginatedListHook: useSyncHistoryList} = makePaginatedListHookWithAtoms<number, SyncHistoryDto>({
    subject: 'syncHistoryList',
    buildParams: (subscriptionId, page, pagination) => ({
        where: {subscriptionId},
        order: {id: 'DESC'},
        page,
        itemsPerPage: pagination.itemsPerPage,
    }),
    request: getSyncHistories,
});

export const useCurrentSyncHistory = () => {
    const [currentSyncHistory, setCurrentSyncHistory] = useRecoilState(syncCurrentHistoryAtom);

    const mutate = useCallback((subscriptionId: number) => {
        getSyncHistories(subscriptionId, {
            where: {subscriptionId},
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
