import {useToast} from '^hooks/useToast';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {KeyboardEvent} from 'react';
import {ApprovalStatus} from '^models/Membership/types';
import {createInviteTeamMemberAtom, emailInputValueAtom} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal';
import {emailValid} from '^utils/input-helper';
import {orgIdParamState} from '^atoms/common';
import {teamMemberApi, TeamMemberDto} from '^models/TeamMember';

export const useInviteMember = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const {toast} = useToast();
    const [formData, setFormData] = useRecoilState(createInviteTeamMemberAtom);
    const setInputValue = useSetRecoilState(emailInputValueAtom);
    const invitedEmails = formData.invitations?.map((invitation) => {
        return invitation.email;
    });

    // 이미 초대된 멤버인지 확인하는 함수
    const getExistMember = async (email: string): Promise<TeamMemberDto | undefined> => {
        const teamMember = await teamMemberApi
            .index(orgId, {where: {email}, itemsPerPage: 0})
            .then((res) => res.data.items[0])
            .catch(() => undefined);

        if (!teamMember) return;

        const {membership} = teamMember;

        // 초대된 적 없는 이메일
        if (!membership) return teamMember;

        if (membership.approvalStatus === ApprovalStatus.PENDING) {
            toast.error('승인 대기 중인 멤버입니다.');
            return teamMember;
        }

        if (membership.approvalStatus === ApprovalStatus.APPROVED) {
            toast.error('이미 등록된 멤버입니다.');
            return teamMember;
        }

        // 초대된 적 없으면 membership 이 없는데,
        // 이 경우는 위에서 잘라냈으므로
        // 이 곳에서는 membership 은 있는데 핸들링 되지 못한 케이스가 내려옵니다.
        // 어쨌던 membership 이 있다는 것은 초대를 보낸 상태라는 의미이므로
        // '이미 초대된 멤버입니다' 라는 뜻으로 teamMember 를 반환합니다.
        return teamMember;
    };

    // 이메일 목록에서 삭제하는 함수
    const removeInvitedEmail = (value: string) => {
        const remainEmails = formData.invitations.filter((invitation) => {
            return invitation.email !== value;
        });

        setFormData((prev) => ({...prev, invitations: remainEmails}));
    };

    // 초대 이메일 배열에 추가하는 함수
    const addInvitedEmail = async (e: KeyboardEvent<HTMLInputElement>) => {
        const email = e.target.value.trim();

        // 형식체크 먼저
        if (email.length === 0) return;
        if (!emailValid(email)) return toast.error('이메일 형식을 확인해주세요');
        if (invitedEmails?.includes(email)) return toast.error('이미 추가한 멤버입니다.');

        // 그다음 데이터 체크
        const teamMember = await getExistMember(email);

        setInputValue('');
        setFormData((prev) => ({
            ...prev,
            invitations: [...(prev.invitations ?? []), {email, teamMemberId: teamMember?.id}],
        }));
    };

    return {getExistMember, removeInvitedEmail, addInvitedEmail};
};
