import {useRecoilState, useSetRecoilState} from 'recoil';
import {teamMemberApi} from '^models/TeamMember/api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {FindAllTeamMemberQueryDto, TeamMemberDto, UpdateTeamMemberDto} from '^models/TeamMember/type';
import {
    currentTeamMemberLoadingState,
    currentTeamMemberState,
    getTeamMembersQueryAtom,
    teamMembersSearchResultAtom,
} from '^models/TeamMember/atom';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {V3OrgTeamMembersPageRoute} from '^pages/v3/orgs/[orgId]/teams/members';
import {teamMemberShowModal} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/desktop/modals/atom';
import {useOnResize2} from '^components/util/onResize2';
import {useModal} from '^v3/share/modals/useModal';
import {useAlert} from '^hooks/useAlert';
import {useToast} from '^hooks/useToast';

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
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useRecoilState(teamMembersSearchResultAtom);
    const [query, setQuery] = useRecoilState(getTeamMembersQueryAtom);

    async function search(params: FindAllTeamMemberQueryDto) {
        if (!orgId || isNaN(orgId)) return;

        setIsLoading(true);
        const data = await teamMemberApi.index(orgId, params).then((res) => res.data);
        setResult(data);
        setQuery(params);
        setTimeout(() => setIsLoading(false), 1000);
    }

    const createByName = (name: string) =>
        teamMemberApi.create(orgId, {name}).then((res) => {
            return res.data;
        });

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, createByName, movePage, isLoading};
};

export function useEditTeamMember() {
    const [teamMembers, setTeamMembers] = useRecoilState(teamMembersSearchResultAtom);
    const router = useRouter();
    const {isDesktop} = useOnResize2();
    const {close} = useModal(teamMemberShowModal);
    const {alert} = useAlert();
    const {toast} = useToast();

    const updateFn = (data: UpdateTeamMemberDto, member: TeamMemberDto | null) => {
        if (!member) return;

        teamMemberApi.update(member.organizationId, member.id, data).then(() => toast.success('변경되었습니다.'));
    };

    const deleteFn = (orgId: number, member: TeamMemberDto | null) => {
        if (!member) return;

        const remainMembers = [...teamMembers.items].filter((item) => {
            return item.id !== member.id;
        });

        alert.destroy({
            title: '멤버를 삭제하시겠습니까?',
            confirmFn: () => teamMemberApi.destroy(member.organizationId, member.id),
            routerFn: () => {
                if (isDesktop) {
                    setTeamMembers((prev) => ({
                        ...prev,
                        items: remainMembers,
                    }));
                    close();
                    return;
                }
                if (!isDesktop) {
                    router.push(V3OrgTeamMembersPageRoute.path(orgId));
                    return;
                }
            },
        });
    };

    return {updateFn, deleteFn};
}
