import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {teamCreditCardListInTeamDetailAtom} from '^models/TeamCreditCard/atom';
import {FindAllTeamCreditCardQueryDto, TeamCreditCardDto} from '^models/TeamCreditCard/type';
import {teamCreditCardApi} from '^models/TeamCreditCard/api';

// 팀 상세 페이지 / 연결된 카드 목록 테이블
export const useTeamCreditCardListInTeamDetail = () => useTeamCreditCard(teamCreditCardListInTeamDetailAtom);

const useTeamCreditCard = (
    atoms: PagedResourceAtoms<TeamCreditCardDto, FindAllTeamCreditCardQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => teamCreditCardApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });
};
