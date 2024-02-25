import {pagedResourceAtom} from '^hooks/usePagedResource';
import {GoogleSyncHistoryDto} from '^models/GoogleSyncHistory/type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

/** [admin] 조직관리 > 연동관리 > 구성원(워크스페이스) */
export const googleSyncHistoriesForAdmin = pagedResourceAtom<
    GoogleSyncHistoryDto,
    FindAllQueryDto<GoogleSyncHistoryDto>
>({
    key: 'googleSyncHistoriesForAdmin',
});

/** 구독 불러오기 > 구성원(워크스페이스) */
export const googleSyncHistoriesForConnectsPage = pagedResourceAtom<
    GoogleSyncHistoryDto,
    FindAllQueryDto<GoogleSyncHistoryDto>
>({
    key: 'googleSyncHistoriesForConnectsPage',
});
