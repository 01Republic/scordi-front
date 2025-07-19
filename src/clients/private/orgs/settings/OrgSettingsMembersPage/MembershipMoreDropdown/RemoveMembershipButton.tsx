import {memo} from 'react';
import {MembershipDto} from '^models/Membership/types';
import {membershipApi} from '^models/Membership/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2} from '^components/util/dialog';
import {useTranslation} from 'next-i18next';

interface RemoveMembershipButtonProps {
    membership: MembershipDto;
    reload?: () => any;
}

export const RemoveMembershipButton = memo((props: RemoveMembershipButtonProps) => {
    const {membership, reload} = props;
    const {t} = useTranslation('workspaceSettings');

    const onClick = async () => {
        const isInvitation = !membership.userId;
        const resolveMembershipActionMessage = isInvitation
            ? (t('memberManagement.remove.cancelInvite') as string)
            : (t('memberManagement.remove.removeMember') as string);

        const resolveMembershipActionConfirmMessage = isInvitation ? (
            <p>{t('memberManagement.remove.cancelInviteDesc') as string}</p>
        ) : (
            <p>{t('memberManagement.remove.removeMemberDesc') as string}</p>
        );

        const isConfirmed = await confirm2(resolveMembershipActionMessage, resolveMembershipActionConfirmMessage).then(
            (res) => res.isConfirmed,
        );

        if (!isConfirmed) return;

        return membershipApi
            .destroy(membership.id)
            .then(() => {
                const message = isInvitation
                    ? (t('memberManagement.remove.cancelled') as string)
                    : (t('memberManagement.remove.removed') as string);
                toast.success(message);
            })
            .catch(errorToast)
            .finally(() => reload && reload());
    };

    return (
        <div
            onClick={onClick}
            className="cursor-pointer flex items-center justify-between group text-12 rounded-sm px-3 py-2 gap-2.5 text-gray-500 hover:text-red-500 hover:bg-red-100/70"
        >
            <div className="flex items-center gap-4">
                {!membership.userId
                    ? (t('memberManagement.remove.cancelInviteBtn') as string)
                    : (t('memberManagement.remove.removeBtn') as string)}
            </div>
        </div>
    );
});
RemoveMembershipButton.displayName = 'RemoveMembershipButton';
