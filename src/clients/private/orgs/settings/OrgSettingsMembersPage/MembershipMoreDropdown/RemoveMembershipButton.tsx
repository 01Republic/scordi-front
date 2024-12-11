import {memo} from 'react';
import {MembershipDto} from '^models/Membership/types';
import {membershipApi} from '^models/Membership/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2} from '^components/util/dialog';

interface RemoveMembershipButtonProps {
    membership: MembershipDto;
    reload?: () => any;
}

export const RemoveMembershipButton = memo((props: RemoveMembershipButtonProps) => {
    const {membership, reload} = props;

    const onClick = async () => {
        const isInvitation = !membership.userId;
        const resolveMembershipActionMessage = isInvitation ? '멤버 초대를 취소할까요?' : '멤버를 삭제할까요?';

        const resolveMembershipActionConfirmMessage = isInvitation ? (
            <p>
                이미 초대장이 발송된 멤버입니다.
                <br />
                <b>워크스페이스 전체</b>에서 멤버가 삭제됩니다. <br />
                그래도 초대를 최소하시겠어요?
            </p>
        ) : (
            <p>
                이 작업은 취소할 수 없습니다.
                <br />
                <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                그래도 삭제하시겠어요?
            </p>
        );

        const isConfirmed = await confirm2(resolveMembershipActionMessage, resolveMembershipActionConfirmMessage).then(
            (res) => res.isConfirmed,
        );

        if (!isConfirmed) return;

        return membershipApi
            .destroy(membership.id)
            .then(() => {
                const message = isInvitation ? '초대를 취소했어요.' : '삭제했습니다.';
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
            <div className="flex items-center gap-4">{!membership.userId ? '초대 취소하기' : '삭제하기'}</div>
        </div>
    );
});
RemoveMembershipButton.displayName = 'RemoveMembershipButton';
