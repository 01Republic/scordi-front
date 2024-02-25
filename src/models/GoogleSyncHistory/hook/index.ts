import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {GoogleSyncHistoryDto} from '^models/GoogleSyncHistory/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {googleSyncHistoriesApi} from '^models/GoogleSyncHistory/api';
import {googleSyncHistoriesForAdmin, googleSyncHistoriesForConnectsPage} from '^models/GoogleSyncHistory/atom';

/** [admin] 조직관리 > 연동관리 > 구성원(워크스페이스) */
export const useGoogleSyncHistoriesForAdmin = () => useGoogleSyncHistories(googleSyncHistoriesForAdmin);

/** 구독 불러오기 > 구성원(워크스페이스) */
export const useGoogleSyncHistoriesForConnectsPage = () => useGoogleSyncHistories(googleSyncHistoriesForConnectsPage);

/**
 * private useGoogleSyncHistories(atoms, mergeMode)
 * @param atoms
 * @param mergeMode
 */
const useGoogleSyncHistories = (
    atoms: PagedResourceAtoms<GoogleSyncHistoryDto, FindAllQueryDto<GoogleSyncHistoryDto>>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        endpoint: (params) => googleSyncHistoriesApi.index(params),
        useOrgId: false,
        mergeMode,
        getId: 'id',
    });
};
