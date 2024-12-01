import {memo} from 'react';
import {IoMdCheckmark} from '^components/react-icons';
import {MembershipLevel, t_membershipLevel} from '^models/Membership/types';

interface MembershipLevelItemProps {
    level: MembershipLevel;
    onClick?: () => any;
    isCurrent?: boolean;
}

export const MembershipLevelItem = memo((props: MembershipLevelItemProps) => {
    const {level, onClick, isCurrent = false} = props;

    return (
        <div
            onClick={isCurrent ? undefined : onClick}
            className={`${
                isCurrent ? 'cursor-not-allowed' : 'cursor-pointer'
            } flex items-center justify-between group text-12 rounded-sm px-3 py-2 gap-2.5 ${
                isCurrent ? 'text-gray-400' : 'text-gray-500 hover:bg-slate-100'
            }`}
        >
            <div className="flex items-center gap-4">{t_membershipLevel(level)}</div>
            {isCurrent && (
                <div>
                    <IoMdCheckmark fontSize={12} className="text-scordi" />
                </div>
            )}
        </div>
    );
});
MembershipLevelItem.displayName = 'MembershipLevelItem';
