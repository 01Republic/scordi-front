import {atom, selector} from 'recoil';
import {applicationIdParamState} from '^atoms/common';
import {getSyncHistories} from '^api/applicationSyncHistories.api';
import {errorNotify} from '^utils/toast-notify';
import {FindAllSyncHistoryQuery, SyncHistoryDto} from '^types/applicationSyncHistory.type';
import {PaginationMetaData} from '^types/utils/paginated.dto';

/**
 * get list query (V1)
 */

// export const getApplicationSyncHistoriesQueryTrigger = atom({
//     key: 'getApplicationSyncHistoriesQueryTrigger',
//     default: 0,
// });
//
// export const getApplicationSyncHistoriesQuery = selector({
//     key: 'getApplicationSyncHistoriesQuery',
//     get: async ({get}) => {
//         get(getApplicationSyncHistoriesQueryTrigger);
//         const applicationId = get(applicationIdParamState);
//         if (isNaN(applicationId)) return;
//         try {
//             const res = await getSyncHistories(applicationId, {
//                 order: {id: 'DESC'},
//             });
//             return res.data;
//         } catch (e) {
//             errorNotify(e);
//         }
//     },
//     set: ({get, set}) => {
//         set(getApplicationSyncHistoriesQueryTrigger, (v) => v + 1);
//     },
// });

/**
 * get list query (v2)
 */

export const syncHistoryListAtom = atom<SyncHistoryDto[]>({
    key: 'syncHistoryListAtom',
    default: [],
});

export const syncHistoryListFetchItemsQueryParamAtom = atom<FindAllSyncHistoryQuery>({
    key: 'syncHistoryList/fetchItemsQueryParamAtom',
    default: {},
});

export const syncHistoryListPaginationAtom = atom<PaginationMetaData>({
    key: 'syncHistoryList/paginationAtom',
    default: {
        totalItemCount: 0,
        currentItemCount: 0,
        totalPage: 0,
        currentPage: 0,
        itemsPerPage: 10,
    },
});

export const syncCurrentHistoryAtom = atom<SyncHistoryDto | null>({
    key: 'syncCurrentHistoryAtom',
    default: null,
});
