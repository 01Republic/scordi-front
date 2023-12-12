import {atom} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllTeamMemberQueryDto, TeamMemberDto} from '^models/TeamMember';

export const teamMemberListAtom = {
    result: atom<Paginated<TeamMemberDto>>({
        key: 'subscriptionShowModal/paged/teamMember',
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
    }),

    query: atom<FindAllTeamMemberQueryDto>({
        key: 'subscriptionShowModal/getTeamMemberListQuery',
        default: {},
    }),
};
