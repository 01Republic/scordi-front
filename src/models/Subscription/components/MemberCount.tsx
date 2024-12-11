import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';

interface MemberCountProps {
    subscription: SubscriptionDto;
}

export const MemberCount = memo((props: MemberCountProps) => {
    const {subscription} = props;

    // 사용중인 사용자 수 (라이선스에서 사용중인 시트 수)
    const usedMemberCount = subscription.usedMemberCount || 0;

    // 결제되는 사용자 수 (라이선스에 따른 총 시트 수)
    const paidMemberCount = subscription.paidMemberCount || 0;

    return (
        <div>
            <div className="text-sm flex items-center justify-end gap-0.5">
                <span>{usedMemberCount.toLocaleString()}</span>
                <span>/</span>
                <span>{paidMemberCount.toLocaleString()}</span>
            </div>
        </div>
    );
});
MemberCount.displayName = 'MemberCount';
