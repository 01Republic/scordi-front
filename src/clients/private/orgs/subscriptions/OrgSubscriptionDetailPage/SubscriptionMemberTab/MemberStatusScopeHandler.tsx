import React, {memo, useState} from 'react';
import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type';
import {ScopeButton} from '^clients/private/_components/rest-pages/ListPage/ScopeButton';

interface MemberStatusScopeHandlerProps {
    onSearch: (status: SubscriptionSeatStatus | null) => void;
}

export const MemberStatusScopeHandler = memo(function InviteStatusScopeHandler(props: MemberStatusScopeHandlerProps) {
    const {onSearch} = props;
    const [memberStatus, setMemberStatus] = useState<SubscriptionSeatStatus | null>(null);

    const handleClick = (status: SubscriptionSeatStatus | null) => {
        setMemberStatus(status);
        onSearch(status);
    };

    return (
        <div className="flex items-center gap-2">
            <ScopeButton active={memberStatus == null} onClick={() => handleClick(null)}>
                전체
            </ScopeButton>
            <ScopeButton
                active={memberStatus === SubscriptionSeatStatus.NONE}
                onClick={() => handleClick(SubscriptionSeatStatus.NONE)}
            >
                미정
            </ScopeButton>
            <ScopeButton
                active={memberStatus === SubscriptionSeatStatus.PAID}
                onClick={() => handleClick(SubscriptionSeatStatus.PAID)}
            >
                유료
            </ScopeButton>
            <ScopeButton
                active={memberStatus === SubscriptionSeatStatus.FREE}
                onClick={() => handleClick(SubscriptionSeatStatus.FREE)}
            >
                무료
            </ScopeButton>
            <ScopeButton
                active={memberStatus === SubscriptionSeatStatus.QUIT}
                onClick={() => handleClick(SubscriptionSeatStatus.QUIT)}
            >
                해지
            </ScopeButton>
        </div>
    );
});
