import {memo} from 'react';
import {MembershipDto} from '^models/Membership/types';
import {membershipApi} from '^models/Membership/api';

interface ResendInvitationButtonProps {
    membership: MembershipDto;
    reload?: () => any;
}

export const ResendInvitationButton = memo((props: ResendInvitationButtonProps) => {
    const {membership, reload} = props;

    const onClick = () => {
        return reload && reload();
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
