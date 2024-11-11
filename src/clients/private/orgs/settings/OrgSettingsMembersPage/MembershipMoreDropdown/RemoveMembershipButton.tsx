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
        const isConfirmed = await confirm2(
            `정말로 ${!membership.userId ? '초대를 취소' : '멤버를 삭제'}하시겠어요?`,
            '이 작업은 복구할 수 없는 작업입니다. 그래도 실행할까요?',
        ).then((res) => res.isConfirmed);

        if (!isConfirmed) return;

        return membershipApi
            .destroy(membership.id)
            .then(() => {
                const message = !membership.userId ? '초대를 취소했습니다.' : '삭제했습니다.';
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
