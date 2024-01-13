import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';

interface MemberCountProps {
    subscription: SubscriptionDto;
}

export const MemberCount = memo((props: MemberCountProps) => {
    const {subscription} = props;

    // const paidMemberCount = subscription.paidMemberCount || 0;
    const usedMemberCount = subscription.usedMemberCount || 0;

    return (
        <div>
            <p className="text-sm">{usedMemberCount.toLocaleString()} 명</p>
        </div>
    );
});
MemberCount.displayName = 'MemberCount';
