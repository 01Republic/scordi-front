import {atom} from 'recoil';
import {TeamMemberDto} from '^types/team-member.type';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export const getTeamMembersQueryAtom = atom<FindAllQueryDto<TeamMemberDto>>({
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
