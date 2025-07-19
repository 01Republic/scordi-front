import {memo} from 'react';
import {MembershipDto, t_membershipLevel} from '^models/Membership/types';
import {ChevronDown} from 'lucide-react';
import {useCurrentLocale} from '^hooks/useCurrentLocale';

interface MembershipLevelButtonProps {
    membership: MembershipDto;
}

export const MembershipLevelButton = memo((props: MembershipLevelButtonProps) => {
    const {membership} = props;
    const {currentLocale} = useCurrentLocale();

    return (
        <div
            className={`input input-sm input-bordered min-w-[5rem] flex items-center justify-between text-gray-500 shadow ${
                membership.userId ? '' : 'input-disabled'
            }`}
        >
            <div className="text-13 font-medium">{t_membershipLevel(membership.level, {locale: currentLocale})}</div>
            {membership.userId && <ChevronDown fontSize={10} className="relative top-[-1px] ml-2" />}
        </div>
    );
});
MembershipLevelButton.displayName = 'MembershipLevelButton';
