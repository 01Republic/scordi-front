import {useMutation, useQueryClient} from '@tanstack/react-query';
import {CreateMembershipInviteDto} from '^models/Membership/types';
import {inviteMembershipApi} from '^models/Membership/api';
import {TEAM_MEMBER_HOOK_KEY} from '^models/TeamMember/hook/key';
import {teamMemberApi} from '^models/TeamMember';

// 구성원 리스트페이지에서 다중으로 멤버를 삭제하는 경우 사용하는 훅
export const useTeamMemberDeleteTeamMember = (orgId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => teamMemberApi.destroy(orgId, id).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [TEAM_MEMBER_HOOK_KEY.base], exact: false});
        },
    });
};

// 구성원 리스트페이지에서 다중으로 초대메일을 보낼 때 사용하는 훅
export const useTeamMemberSendInviteEmail = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateMembershipInviteDto) => inviteMembershipApi.create(data).then((res) => res.data),
    });
};
