import {RecoilState, useRecoilState, useRecoilValue} from 'recoil';
import {useAlert} from '^hooks/useAlert';
import {useToast} from '^hooks/useToast';
import {orgIdParamState} from '^atoms/common';
import {teamMemberApi} from '../api';
import {TeamMemberDto, UpdateTeamMemberDto} from '../type';
import {
    teamMemberLoadingState,
    currentTeamMemberState,
    teamMemberListInSubscriptionShowModalAtom,
    teamMemberListAtom,
    teamMemberListInDashboardAtom,
    teamMemberListInTeamMembersTableAtom,
    paymentReceiveTeamMemberForOrgSettingAtom,
    teamMemberListInCreateSubscriptionAtom,
    teamMemberListForMasterSelectInCreateSubscriptionAtom,
    addableTeamMemberListInAddTeamMemberModal,
} from '../atom';
import {useTeamMembersV3} from '^models/TeamMember';

export * from './useSendInviteEmail';
export * from './useTeamMemberV3';

export const useTeamMembers = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const methods = useTeamMembersV3(teamMemberListAtom);
    const isExist = !!methods.result.pagination.totalItemCount;
    const createByName = (name: string) => {
        return teamMemberApi.create(orgId, {name}).then((res) => res.data);
    };

    return {...methods, isExist, createByName};
};

// 대시보드 / 멤버 목록
export const useTeamMembersInDashboard = () => useTeamMembersV3(teamMemberListInDashboardAtom);

// 멤버관리 / 멤버 목록 테이블
export const useTeamMembersInTeamMembersTable = () => useTeamMembersV3(teamMemberListInTeamMembersTableAtom);

// 구독상세모달 / 이용중인 멤버 목록
export const useTeamMembersInSubscriptionShowModal = () => useTeamMembersV3(teamMemberListInSubscriptionShowModalAtom);

// 조직설정 / 청구수신계정 멤버 조회
export const usePaymentReceiveTeamMemberForOrgSetting = () =>
    useTeamMembersV3(paymentReceiveTeamMemberForOrgSettingAtom);

// 구독 수동 등록 / 멤버 목록
export const useTeamMemberListInCreateSubscription = () => {
    return useTeamMembersV3(teamMemberListInCreateSubscriptionAtom);
};

// 구독 수동 등록 / 담당자 선택용 멤버 목록
export const useTeamMemberListForMasterSelectInCreateSubscription = () => {
    return useTeamMembersV3(teamMemberListForMasterSelectInCreateSubscriptionAtom);
};

// 팀 상세 / 멤버추가모달 / 추가할 수 있는 멤버목록
export const useAddableTeamMemberListInAddTeamMemberModal = () => {
    return useTeamMembersV3(addableTeamMemberListInAddTeamMemberModal);
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

    const deleteMember = async (onConfirm?: () => void, teamMember?: TeamMemberDto) => {
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
