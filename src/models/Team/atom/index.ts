import {atom} from 'recoil';
import {FindAllTeamQueryDto, TeamDto} from '^models/Team/type';
import {Paginated} from '^types/utils/paginated.dto';

export const currentTeamState = atom<TeamDto | null>({
    key: 'currentTeam',
    default: null,
});

export const currentTeamLoadingState = atom<boolean>({
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
