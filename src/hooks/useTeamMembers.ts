import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRecoilState} from 'recoil';
import {teamMemberApi} from '^api/team-member.api';
import {TeamMemberDto} from '^types/team-member.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {getTeamMembersQueryAtom, teamMembersSearchResultAtom} from '^atoms/team-members.atom';

export const useTeamMembers = () => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [result, setResult] = useRecoilState(teamMembersSearchResultAtom);
    const [query, setQuery] = useRecoilState(getTeamMembersQueryAtom);

    async function search(params: FindAllQueryDto<TeamMemberDto>) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        const data = await teamMemberApi.index(orgId, params).then((res) => res.data);
        setResult(data);
        setQuery(params);
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage};
};
