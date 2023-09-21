import {atom, useRecoilState} from 'recoil';
import {FindAllTeamMemberQueryDto, TeamMemberDto} from '^types/team-member.type';
import {teamMemberApi} from '^api/team-member.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';

const currentTeamMemberState = atom<TeamMemberDto | null>({
    key: 'currentTeamMember',
    default: null,
});

const currentTeamMemberLoadingState = atom<boolean>({
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

export const useCurrentTeamMember = () => {
    const [currentTeamMember, setCurrentTeamMember] = useRecoilState(currentTeamMemberState);
    const [isLoading, setIsLoading] = useRecoilState(currentTeamMemberLoadingState);

    const loadCurrentTeamMember = (organizationId: number, id: number) => {
        setIsLoading(true);
        const request = teamMemberApi.show(organizationId, id);
        request.then((res) => setCurrentTeamMember(res.data));
        request.finally(() => setIsLoading(false));
    };

    return {currentTeamMember, loadCurrentTeamMember, isLoading};
};

export const makeTeamMemberProfile = (member?: TeamMemberDto | null) => {
    if (!member) return {};

    const user = member.user;

    return {
        name: member.name,
        email: member.email ?? user?.email ?? '',
        phone: member.phone ?? user?.phone ?? '',
        jobName: member.jobName,
        jobDescription: member.jobDescription,
        profileImgUrl:
            member.profileImgUrl ?? user?.profileImgUrl ?? `https://placehold.co/200x200?text=${member.name}`,
    };
};

export const useTeamMembers = () => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [result, setResult] = useRecoilState(teamMembersSearchResultAtom);
    const [query, setQuery] = useRecoilState(getTeamMembersQueryAtom);

    async function search(params: FindAllTeamMemberQueryDto) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        const data = await teamMemberApi.index(orgId, params).then((res) => res.data);
        setResult(data);
        setQuery(params);
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage};
};
