import {api} from '^api/api';
import {paginatedDtoOf} from '^types/utils/response-of';
import {GoogleSyncHistoryDto} from '^models/GoogleSyncHistory/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {Paginated} from '^types/utils/paginated.dto';

/**
 * [구글] 구글 동기화 이력 API (GoogleSyncHistory)
 */
export const googleSyncHistoriesApi = {
    /** GoogleSyncHistory 조회 */
    index(params?: FindAllQueryDto<GoogleSyncHistoryDto>) {
        const url = `/google/sync_histories`;
        return api.get<Paginated<GoogleSyncHistoryDto>>(url, {params}).then(paginatedDtoOf(GoogleSyncHistoryDto));
    },
};
