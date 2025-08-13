import {PagedResourceAtoms, usePagedResource, usePaginateUtils} from '^hooks/usePagedResource';
import {FindAllTeamMembershipQueryDto, TeamMembershipDto} from '^models/TeamMembership/type';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {teamMembershipListInTeamDetailAtom} from '^models/TeamMembership/atom';
import {FindAllTeamMemberQueryDto, teamMemberApi} from '^models/TeamMember';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {TEAM_MEMBER_HOOK_KEY} from '^models/TeamMember/hook/key';
import {Paginated} from '^types/utils/paginated.dto';
import {TEAM_MEMBER_SHIP_HOOK_KEY} from '^models/TeamMembership/hook/key';

// 팀 상세 페이지 / 연결된 멤버 목록 테이블
export const useTeamMembershipListInTeamDetail = () => useTeamMembership(teamMembershipListInTeamDetailAtom);

const useTeamMembership = (
    atoms: PagedResourceAtoms<TeamMembershipDto, FindAllTeamMembershipQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => teamMembershipApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });
};

// 팀 상세p - 연결된 멤버 목록
export const useTeamMembership2 = (orgId: number, teamId: number, params: FindAllTeamMembershipQueryDto) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: [TEAM_MEMBER_SHIP_HOOK_KEY.base, orgId, query, teamId],
        queryFn: () => teamMembershipApi.index(orgId, query).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId && !isNaN(orgId) && !!teamId,
    });

    return usePaginateUtils({query, setQuery, queryResult});
};
