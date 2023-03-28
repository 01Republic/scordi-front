import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {syncCurrentHistoryAtom} from '^atoms/applicationSyncHistories.atom';
import {getSyncHistories} from '^api/applicationSyncHistories.api';
import {errorNotify} from '^utils/toast-notify';
import {SyncHistoryDto} from '^types/applicationSyncHistory.type';
import {makePaginatedListHookWithAtoms} from '^hooks/util/makePaginatedListHook';

export const {paginatedListHook: useSyncHistoryList} = makePaginatedListHookWithAtoms<number, SyncHistoryDto>({
    subject: 'syncHistoryList',
    buildParams: (applicationId, page, pagination) => ({
        where: {applicationId},
        order: {id: 'DESC'},
        page,
        itemsPerPage: pagination.itemsPerPage,
    }),
    request: getSyncHistories,
});

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
