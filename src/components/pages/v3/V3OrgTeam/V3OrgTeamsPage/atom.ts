import {atom, useRecoilState} from 'recoil';
import {FindAllTeamQueryDto, TeamDto} from '^types/team.type';
import {teamApi} from '^api/team.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';

const currentTeamState = atom<TeamDto | null>({
    key: 'currentTeam',
    default: null,
});

const currentTeamLoadingState = atom<boolean>({
    key: 'currentTeamLoadingState',
    default: false,
});

export const getTeamsQueryAtom = atom<FindAllTeamQueryDto>({
    key: 'getTeamsQueryAtom',
    default: {},
});
export const teamsSearchResultAtom = atom<Paginated<TeamDto>>({
    key: 'teamsSearchResult',
    default: {
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 1,
            currentPage: 1,
            itemsPerPage: 30,
        },
    },
});

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
