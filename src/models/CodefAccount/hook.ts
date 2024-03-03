import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {FindAllAccountQueryDto} from '^models/CodefAccount/type/find-all-account.query.dto';
import {codefAccountApi} from '^models/CodefAccount/api';
import {codefAccountsInConnector} from '^models/CodefAccount/atom';

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사 계정 리스트를 보여줄 때 사용 */
export const useCodefAccountsInConnector = () => useCodefAccountsV3(codefAccountsInConnector);

const useCodefAccountsV3 = (atoms: PagedResourceAtoms<CodefAccountDto, FindAllAccountQueryDto>, mergeMode = false) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => codefAccountApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });
};
