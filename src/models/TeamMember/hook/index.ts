import {useState} from 'react';
import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {useAlert} from '^hooks/useAlert';
import {useToast} from '^hooks/useToast';
import {orgIdParamState} from '^atoms/common';
import {ApprovalStatus} from '^models/Membership/types';
import {membershipApi} from '^models/Membership/api';
import {teamMemberApi} from '../api';
import {FindAllTeamMemberQueryDto, TeamMemberDto, UpdateTeamMemberDto} from '../type';
import {
    teamMemberLoadingState,
    currentTeamMemberState,
    getTeamMembersQueryAtom,
    teamMembersSearchResultAtom,
} from '../atom';
import {
    buildPagedResource,
    cachePagedQuery,
    makeAppendPagedItemFn,
    makeExceptPagedItemFn,
} from '^hooks/usePagedResource';

export * from './useSendInviteEmail';
export * from './useTeamMemberV3';

export const useTeamMembers_Dashboard = buildPagedResource<TeamMemberDto, FindAllTeamMemberQueryDto>({
    key: 'useTeamMembers_Dashboard',
    endpoint: (params, orgId) => teamMemberApi.index(orgId, params),
    buildQuery: (params) => ({...params}),
    getId: 'id',
    mergeMode: false,
});

export const useTeamMembers = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useRecoilState(teamMembersSearchResultAtom);
    const [query, setQuery] = useRecoilState(getTeamMembersQueryAtom);

    async function search(params: FindAllTeamMemberQueryDto, mergeMode = false, force = false) {
        if (!orgId || isNaN(orgId)) return;

        const request = () => {
            setIsLoading(true);
            return teamMemberApi.index(orgId, params).finally(() => {
                setTimeout(() => setIsLoading(false), 1000);
            });
        };
        return cachePagedQuery(setResult, setQuery, params, request, mergeMode, force);
    }

    const reload = () => search({...query}, false, true);
    const movePage = (page: number, append = false) => search({...query, page}, append);
    const resetPage = () => search({...query, page: 1}, false, true);
    const append = makeAppendPagedItemFn(setResult);
    const except = makeExceptPagedItemFn(setResult, (it, item) => it.id !== item.id);

    const isExist = !!result.pagination.totalItemCount;
    const createByName = (name: string) => {
        return teamMemberApi.create(orgId, {name}).then((res) => res.data);
    };

    return {query, result, search, reload, movePage, resetPage, except, isLoading, isExist, createByName};
};

// 멤버 수정 / 삭제 기능
export function useTeamMember(atom: RecoilState<TeamMemberDto | null>) {
    const [teamMember, setTeamMember] = useRecoilState(atom);
    const [isLoading, setIsLoading] = useRecoilState(teamMemberLoadingState);
    const {alert} = useAlert();
    const {toast} = useToast();

    const loadTeamMember = (organizationId: number, id: number) => {
        setIsLoading(true);
        const request = teamMemberApi.show(organizationId, id);
        request.then((res) => setTeamMember(res.data));
        request.finally(() => setIsLoading(false));
    };

    const updateMember = async (data: UpdateTeamMemberDto) => {
        if (!teamMember) {
            toast.error('알 수 없는 멤버');
            return;
        }

        const {organizationId, id} = teamMember;

        setIsLoading(true);
        const res = teamMemberApi.update(organizationId, id, data);
        res.then(() => toast.success('변경되었습니다.')).then(() => loadTeamMember(organizationId, id));
        res.finally(() => setIsLoading(false));
        return res;
    };

    const deleteMember = async (onConfirm?: () => void) => {
        if (!teamMember) {
            toast.error('알 수 없는 멤버');
            return;
        }

        const {organizationId, id} = teamMember;

        return alert.destroy({
            title: '멤버를 정말 삭제할까요?',
            showSuccessAlertOnFinal: false,
            onConfirm: async () => {
                setIsLoading(true);
                // membership 상태가 PENDING이면 team member와 membership 모두 삭제
                if (teamMember.membership?.approvalStatus === ApprovalStatus.PENDING) {
                    await membershipApi.destroy(teamMember.membershipId || 0);
                }
                const res = teamMemberApi.destroy(organizationId, id);

                res.then(() => toast.success('삭제했습니다.')).then(() => {
                    onConfirm && onConfirm();
                    setTeamMember(null);
                });
                res.finally(() => setIsLoading(false));
                return res;
            },
        });
    };

    return {teamMember, setTeamMember, isLoading, loadTeamMember, updateMember, deleteMember};
}

export const useCurrentTeamMember = () => {
    const [currentTeamMember, setCurrentTeamMember] = useRecoilState(currentTeamMemberState);
    const [isLoading, setIsLoading] = useRecoilState(teamMemberLoadingState);

    const loadCurrentTeamMember = (organizationId: number, id: number) => {
        setIsLoading(true);
        const request = teamMemberApi.show(organizationId, id);
        request.then((res) => setCurrentTeamMember(res.data));
        request.finally(() => setIsLoading(false));
    };

    return {currentTeamMember, loadCurrentTeamMember, setCurrentTeamMember, isLoading};
};
