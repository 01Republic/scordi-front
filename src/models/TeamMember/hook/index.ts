import {useRecoilState} from 'recoil';
import {teamMemberApi} from '^models/TeamMember/api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {FindAllTeamMemberQueryDto} from '^models/TeamMember/type';
import {
    currentTeamMemberLoadingState,
    currentTeamMemberState,
    getTeamMembersQueryAtom,
    teamMembersSearchResultAtom,
} from '^models/TeamMember/atom';

export const useCurrentTeamMember = () => {
    const [currentTeamMember, setCurrentTeamMember] = useRecoilState(currentTeamMemberState);
    const [isLoading, setIsLoading] = useRecoilState(currentTeamMemberLoadingState);

    const loadCurrentTeamMember = (organizationId: number, id: number) => {
        setIsLoading(true);
        const request = teamMemberApi.show(organizationId, id);
        request.then((res) => setCurrentTeamMember(res.data));
        request.finally(() => setIsLoading(false));
    };

    return {currentTeamMember, loadCurrentTeamMember, setCurrentTeamMember, isLoading};
};

export const useTeamMembers = () => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [result, setResult] = useRecoilState(teamMembersSearchResultAtom);
    const [query, setQuery] = useRecoilState(getTeamMembersQueryAtom);

    async function search(params: FindAllTeamMemberQueryDto) {
        // if (JSON.stringify(query) === JSON.stringify(params)) return;
        if (!orgId && isNaN(orgId)) return;

        const data = await teamMemberApi.index(orgId, params).then((res) => res.data);
        setResult(data);
        setQuery(params);
    }

    const createByName = (name: string) =>
        teamMemberApi.create(orgId, {name}).then((res) => {
            return res.data;
        });

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, createByName, movePage};
};
