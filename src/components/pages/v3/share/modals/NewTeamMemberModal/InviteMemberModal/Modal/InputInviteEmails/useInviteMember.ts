import {useToast} from '^hooks/useToast';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {orgMembershipSearchResultAtom} from '^models/Membership/atom';
import {KeyboardEvent} from 'react';
import {ApprovalStatus} from '^models/Membership/types';
import {createInviteTeamMemberAtom, emailInputValueAtom} from '^v3/share/modals/NewTeamMemberModal/InviteMemberModal';

export const useInviteMember = () => {
    const {toast} = useToast();
    const [formData, setFormData] = useRecoilState(createInviteTeamMemberAtom);
    const membershipSearchResult = useRecoilValue(orgMembershipSearchResultAtom);
    const setInputValue = useSetRecoilState(emailInputValueAtom);
    const invitedEmails = formData.invitations?.map((invitation) => {
        return invitation.email;
    });

    // 이미 초대된 멤버인지 확인하는 함수
    const confirmOrgMember = (data: string) => {
        if (!data && !invitedEmails.length) {
            toast.error('이메일을 입력해주세요');
            return true;
        }

        const membership = membershipSearchResult.items.filter((item) => {
            return item.invitedEmail === data;
        });
        if (membership.length === 0) return false;

        const orgMemberEmail = membership[0].approvalStatus;
        if (orgMemberEmail === ApprovalStatus.PENDING) {
            toast.error('승인 대기 중인 멤버입니다.');
            return true;
        }

        if (orgMemberEmail === ApprovalStatus.APPROVED) {
            toast.error('이미 등록된 멤버입니다.');
            return true;
        }

        return false;
    };

    // 이메일 목록에서 삭제하는 함수
    const removeInvitedEmail = (value: string) => {
        const remainEmails = formData.invitations.filter((invitation) => {
            return invitation.email !== value;
        });

        setFormData((prev) => ({...prev, invitations: remainEmails}));
    };

    // 초대 이메일 배열에 추가하는 함수
    const addInvitedEmail = (e: KeyboardEvent<HTMLInputElement>) => {
        const invitedEmail = e.target.value.trim();

        if (invitedEmail.length === 0) return;

        const isOrgMember = confirmOrgMember(invitedEmail);
        const isEmail = invitedEmail.includes('.') && invitedEmail.includes('@');

        if (isOrgMember) return;
        if (!isEmail) return toast.error('이메일 형식을 확인해주세요');
        if (invitedEmails?.includes(invitedEmail)) return toast.error('이미 추가한 멤버입니다.');

        setInputValue('');
        setFormData((prev) => ({
            ...prev,
            invitations: [...(prev.invitations ?? []), {email: invitedEmail}],
        }));
    };

    return {confirmOrgMember, removeInvitedEmail, addInvitedEmail};
};
