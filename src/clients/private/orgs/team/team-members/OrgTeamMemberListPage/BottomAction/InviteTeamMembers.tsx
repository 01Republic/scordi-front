import React, {memo} from 'react';
import Tippy from '@tippyjs/react';
import {Mail, Mails} from 'lucide-react';
import {confirm3} from '^components/util/dialog/confirm3';
import {allSettled, isDefinedValue, uniq} from '^utils/array';
import {confirmed} from '^components/util/dialog';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useRouter} from 'next/router';
import {useOrgIdParam} from '^atoms/common';
import {TeamMemberDto, useSendInviteEmail2} from '^models/TeamMember';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';
import {ApprovalStatus, MembershipLevel} from '^models/Membership/types';
import {useTeamMemberSendInviteEmail} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/BottomAction/hooks';

interface InviteTeamMembersProps {
    checkedItems: TeamMemberDto[];
    onClear: () => void;
    reload: () => void;
}

export const InviteTeamMembers = memo((props: InviteTeamMembersProps) => {
    const {checkedItems, onClear, reload} = props;
    const orgId = useOrgIdParam();
    const router = useRouter();

    const {mutateAsync: sendInviteEmail, isPending} = useTeamMemberSendInviteEmail();

    const isMemberOrOwner = (temMember: {membership?: {level?: MembershipLevel}}) =>
        temMember.membership?.level === MembershipLevel.OWNER || temMember.membership?.level === MembershipLevel.MEMBER;

    const isReInvite = (temMember: {membership?: {level?: MembershipLevel; approvalStatus?: ApprovalStatus}}) =>
        temMember.membership &&
        temMember.membership.level === MembershipLevel.MEMBER &&
        temMember.membership.approvalStatus === ApprovalStatus.PENDING;

    const notInvite = checkedItems.some(isMemberOrOwner);
    const reInvite = checkedItems.every(isReInvite);

    const onSendInviteEmail = async () => {
        const sendInviteConfirm = () => {
            return confirm3(
                '선택한 모든 멤버에게 초대메일을 보낼까요?',
                <div className="text-16">
                    모든 멤버가 구성원 권한으로 초대됩니다.
                    <br />
                    추후 <b>소유자 권한</b>으로 변경 가능합니다. <br />
                    멤버가 초대를 받지 못한다면, 다시 초대장을 보낼 수 있습니다.
                </div>,
            );
        };

        const invitations = checkedItems.flatMap((teamMember) => {
            const email = teamMember.email?.trim();
            const teamMemberId = teamMember.id ?? teamMember.id;
            return email && teamMemberId ? [{email, teamMemberId}] : [];
        });

        return confirmed(sendInviteConfirm())
            .then(() => sendInviteEmail({organizationId: orgId, invitations}))
            .then(() => reload())
            .then(() => toast.success('멤버들에게 초대메일을 보냈어요.'))
            .then(() => onClear())
            .catch(errorToast);
    };

    return (
        <>
            {notInvite ? (
                <Tippy content="워크스페이스에 초대 되어있는 구성원은 초대가 안돼요.">
                    <div className="flex gap-1 text-gray-400 bg-gray-200 btn btn-sm no-animation btn-animation hover:!bg-gray-150">
                        <Mail />
                        초대하기
                    </div>
                </Tippy>
            ) : (
                <button
                    className={`flex gap-1 btn btn-sm no-animation btn-animation btn-white ${
                        !notInvite && isPending ? 'link_to-loading' : ''
                    }`}
                    onClick={onSendInviteEmail}
                >
                    <Mail />
                    초대하기
                </button>
            )}

            {reInvite ? (
                <button
                    className={`flex gap-1 btn btn-sm no-animation btn-animation btn-white ${
                        reInvite && isPending ? 'link_to-loading' : ''
                    }`}
                    onClick={onSendInviteEmail}
                >
                    <Mails />
                    다시 초대하기
                </button>
            ) : (
                <Tippy content="가입 대기중인 멤버에게 다시 초대메일을 보낼 수 있어요.">
                    <div className="flex gap-1 text-gray-400 bg-gray-200 btn btn-sm no-animation btn-animation hover:!bg-gray-150">
                        <Mails />
                        다시 초대하기
                    </div>
                </Tippy>
            )}
        </>
    );
});
