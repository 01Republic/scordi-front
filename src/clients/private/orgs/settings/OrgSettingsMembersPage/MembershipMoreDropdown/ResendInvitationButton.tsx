import {memo} from 'react';
import {MembershipDto} from '^models/Membership/types';
import {inviteMembershipApi, membershipApi} from '^models/Membership/api';
import {confirm2} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useTranslation} from 'next-i18next';

interface ResendInvitationButtonProps {
    membership: MembershipDto;
    reload?: () => any;
    setIsLoading: (value: boolean) => any;
}

export const ResendInvitationButton = memo((props: ResendInvitationButtonProps) => {
    const {membership, reload, setIsLoading} = props;
    const {t} = useTranslation('workspaceSettings');

    const inviteMembership = async () => {
        const organizationId = membership.organizationId;
        const teamMemberId = membership.teamMember?.id;
        const email = membership.invitedEmail!;
        return inviteMembershipApi.create({organizationId, invitations: [{teamMemberId, email}]});
    };

    const onClick = async () => {
        const isConfirmed = await confirm2(
            t('memberManagement.resend.confirm') as string,
            <p>{t('memberManagement.resend.desc') as string}</p>,
        ).then((res) => res.isConfirmed);
        if (!isConfirmed) return;

        setIsLoading(true);
        inviteMembership()
            .then(() => toast.success(t('memberManagement.resend.sent') as string))
            .catch(errorToast)
            .finally(() => setIsLoading(false))
            .then(() => reload && reload());
    };

    return (
        <div
            onClick={onClick}
            className="cursor-pointer flex items-center justify-between group text-12 rounded-sm px-3 py-2 gap-2.5 text-gray-500 hover:bg-slate-100"
        >
            <div className="flex items-center gap-4">{t('memberManagement.resend.resendBtn') as string}</div>
        </div>
    );
});
ResendInvitationButton.displayName = 'ResendInvitationButton';
