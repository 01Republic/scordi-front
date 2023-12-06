import {useToast} from '^hooks/useToast';
import {useRecoilState, useRecoilValue} from 'recoil';
import {invitedEmailsAtom} from '^models/TeamMember/atom';
import {orgMembershipSearchResultAtom} from '^models/Membership/atom';
import {KeyboardEvent} from 'react';
import {FieldValues, UseFormReturn} from 'react-hook-form';
import {ApprovalStatus} from '^models/Membership/types';

export const useInviteMember = () => {
    const {toast} = useToast();
    const membershipSearchResult = useRecoilValue(orgMembershipSearchResultAtom);
    const [invitedEmails, setInvitedEmails] = useRecoilState(invitedEmailsAtom);

    // 이미 초대된 멤버인지 확인하는 함수
    const confirmOrgMember = (data: string) => {
        if (!data && !invitedEmails.length) {
            toast.error('이메일을 입력해주세요');
            return false;
        }

        const membership = membershipSearchResult.items.filter((item) => {
            return item.invitedEmail === data;
        });

        if (membership.length === 0) return true;

        const orgMemberEmail = membership[0].approvalStatus;

        if (orgMemberEmail === ApprovalStatus.PENDING) {
            toast.error('승인 대기 중인 멤버입니다.');
            return false;
        }

        if (orgMemberEmail === ApprovalStatus.APPROVED) {
            toast.error('이미 등록된 멤버입니다.');
            return false;
        }

        return true;
    };

    // 이메일 목록에서 삭제하는 함수
    const removeInvitedEmail = (value: string) => {
        const remainEmails = invitedEmails.filter((email) => {
            return email !== value;
        });

        setInvitedEmails(remainEmails);
    };

    // 초대 이메일 배열에 추가하는 함수
    const addInvitedEmail = (e: KeyboardEvent<HTMLInputElement>, form: UseFormReturn<FieldValues>) => {
        const invitedEmail = e.target.value.trim();

        if (invitedEmail.length === 0) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }

        const isEmail = invitedEmail.includes('.') && invitedEmail.includes('@');
        const isOrgMember = confirmOrgMember(invitedEmail);

        if (!isEmail) {
            toast.error('이메일 형식을 확인해주세요');
            e.stopPropagation();
            e.preventDefault();
            return;
        }

        if (!isOrgMember) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }

        setInvitedEmails([...invitedEmails, invitedEmail]);
        form.resetField('email');
    };

    return {confirmOrgMember, removeInvitedEmail, addInvitedEmail};
};
