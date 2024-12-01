import {memo} from 'react';
import {MembershipDto, t_membershipLevel} from '^models/Membership/types';
import {FaChevronDown} from 'react-icons/fa6';

interface MembershipLevelButtonProps {
    membership: MembershipDto;
}

export const MembershipLevelButton = memo((props: MembershipLevelButtonProps) => {
    const {membership} = props;

    return (
        <div
            className={`input input-sm input-bordered min-w-[5rem] flex items-center justify-between text-gray-500 shadow ${
                membership.userId ? '' : 'input-disabled'
            }`}
        >
            <div className="text-13 font-medium">{t_membershipLevel(membership.level)}</div>
            {membership.userId && <FaChevronDown fontSize={10} className="relative top-[-1px] ml-2" />}
        </div>
    );
});
MembershipLevelButton.displayName = 'MembershipLevelButton';
