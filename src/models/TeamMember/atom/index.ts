import {atom} from 'recoil';
import {FindAllTeamMemberQueryDto, TeamMemberDto} from '^models/TeamMember/type';
import {Paginated} from '^types/utils/paginated.dto';

export const currentTeamMemberState = atom<TeamMemberDto | null>({
    key: 'currentTeamMember',
    default: null,
});

export const currentTeamMemberLoadingState = atom<boolean>({
    key: 'currentTeamMemberLoadingState',
    default: false,
});

export const getTeamMembersQueryAtom = atom<FindAllTeamMemberQueryDto>({
    key: 'getTeamMembersQueryAtom',
    default: {},
});
export const teamMembersSearchResultAtom = atom<Paginated<TeamMemberDto>>({
    key: 'teamMembersSearchResult',
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

export const invitedEmailsAtom = atom<string[]>({
    key: 'invitedEmailsAtom',
    default: <string[]>[],
});

export const currentMemberIdState = atom<number | null>({
    key: 'currentMemberIdState',
    default: null,
});
