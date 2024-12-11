import {memo} from 'react';
import {MembershipDto} from '^models/Membership/types';
import {inviteMembershipApi, membershipApi} from '^models/Membership/api';
import {confirm2} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface ResendInvitationButtonProps {
    membership: MembershipDto;
    reload?: () => any;
    setIsLoading: (value: boolean) => any;
}

export const ResendInvitationButton = memo((props: ResendInvitationButtonProps) => {
    const {membership, reload, setIsLoading} = props;

    const inviteMembership = async () => {
        const organizationId = membership.organizationId;
        const teamMemberId = membership.teamMember?.id;
        const email = membership.invitedEmail!;
        return inviteMembershipApi.create({organizationId, invitations: [{teamMemberId, email}]});
    };

    const onClick = async () => {
        const isConfirmed = await confirm2(
            '초대 메일을 다시 전송할까요?',
            <p>
                구성원 권한으로 초대됩니다.
                <br />
                추후 소유자 권한으로 변경 가능합니다. <br />
                멤버가 초대를 받지 못한다면, 다시 초대장을 보낼 수 있습니다.
            </p>,
        ).then((res) => res.isConfirmed);
        if (!isConfirmed) return;

        setIsLoading(true);
        inviteMembership()
            .then(() => toast.success('초대 메일을 다시 보냈어요.'))
            .catch(errorToast)
            .finally(() => setIsLoading(false))
            .then(() => reload && reload());
    };

    return (
        <div
            onClick={onClick}
            className="cursor-pointer flex items-center justify-between group text-12 rounded-sm px-3 py-2 gap-2.5 text-gray-500 hover:bg-slate-100"
        >
            <div className="flex items-center gap-4">다시 보내기</div>
        </div>
    );
});
ResendInvitationButton.displayName = 'ResendInvitationButton';
