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
import {Paginated} from '^types/utils/paginated.dto';

export const useTeamMembers = () => {
    const orgId = useRecoilValue(orgIdParamState);
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

    const reload = () => search(query);
    const isExist = !!result.pagination.totalItemCount;

    const createByName = (name: string) =>
        teamMemberApi.create(orgId, {name}).then((res) => {
            return res.data;
        });

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, reload, isExist, createByName, movePage, isLoading};
};

export const useTeamMembersV3 = (
    resultAtom: RecoilState<Paginated<TeamMemberDto>>,
    queryAtom: RecoilState<FindAllTeamMemberQueryDto>,
    mergeMode = false,
) => {
    const defaultMergeMode = mergeMode;
    const orgId = useRecoilValue(orgIdParamState);
    const [result, setResult] = useRecoilState(resultAtom);
    const [query, setQuery] = useRecoilState(queryAtom);

    async function search(params: FindAllTeamMemberQueryDto, mergeMode = defaultMergeMode) {
        if (!orgId) return;

        params.where = {organizationId: orgId, ...params.where};

        setQuery((oldQuery) => {
            if (JSON.stringify(oldQuery) === JSON.stringify(params)) return oldQuery;

            teamMemberApi
                .index(orgId, params)
                .then((res) => res.data)
                .then((data) => {
                    if (mergeMode) {
                        setResult((oldResult) => {
                            const items = [...oldResult.items, ...data.items];
                            const pagination = data.pagination;
                            pagination.currentItemCount = items.length;
                            return {items, pagination};
                        });
                    } else {
                        setResult(data);
                    }
                });

            return params;
        });
    }

    const movePage = (page: number, append = false) => search({...query, page}, append);
    const resetPage = () => search({...query, page: 1}, false);

    const append = (subs: TeamMemberDto[]) => {
        setResult((oldResult) => {
            const items = [...subs, ...oldResult.items];
            const pagination = {...oldResult.pagination};
            const diff = subs.length;
            pagination.currentItemCount += diff;
            pagination.totalItemCount += diff;
            return {items, pagination};
        });
    };

    const except = (item: TeamMemberDto) => {
        setResult((oldResult) => {
            const items = oldResult.items.filter((it) => it.id !== item.id);
            const pagination = {...oldResult.pagination};
            const diff = oldResult.pagination.currentItemCount - items.length;
            pagination.currentItemCount -= diff;
            pagination.totalItemCount -= diff;
            return {items, pagination};
        });
    };

    return {query, result, search, movePage, resetPage, except};
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

    const deleteMember = async () => {
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
                res.then(() => toast.success('삭제했습니다.')).then(() => setTeamMember(null));
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
