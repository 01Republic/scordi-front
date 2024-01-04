import {useRecoilState, useRecoilValue} from 'recoil';
import {teamApi} from '^models/Team/api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {FindAllTeamQueryDto} from '^models/Team/type';
import {currentTeamLoadingState, currentTeamState, getTeamsQueryAtom, teamsSearchResultAtom} from '^models/Team/atom';
import {usePagedResource} from '^hooks/usePagedResource';

export const useCurrentTeam = () => {
    const [currentTeam, setCurrentTeam] = useRecoilState(currentTeamState);
    const [isLoading, setIsLoading] = useRecoilState(currentTeamLoadingState);

    const loadCurrentTeam = (organizationId: number, id: number) => {
        setIsLoading(true);
        const request = teamApi.show(organizationId, id);
        request.then((res) => setCurrentTeam(res.data));
        request.finally(() => setIsLoading(false));
    };

    return {currentTeam, loadCurrentTeam, isLoading};
};

export const useTeams = () => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [result, setResult] = useRecoilState(teamsSearchResultAtom);
    const [query, setQuery] = useRecoilState(getTeamsQueryAtom);

    async function search(params: FindAllTeamQueryDto) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        const data = await teamApi.index(orgId, params).then((res) => res.data);
        setResult(data);
        setQuery(params);
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage};
};

export const useTeamsV2 = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const {...methods} = usePagedResource({
        resultAtom: teamsSearchResultAtom,
        queryAtom: getTeamsQueryAtom,
        endpoint: (params) => teamApi.index(orgId, params),
        getId: (team) => team.id,
    });

    return {...methods};
};
