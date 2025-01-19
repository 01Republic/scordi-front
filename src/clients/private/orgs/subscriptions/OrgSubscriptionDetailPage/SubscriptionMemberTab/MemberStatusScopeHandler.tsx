import React, {memo, useState} from 'react';
import {SubscriptionUsingStatus} from '^models/Subscription/types';
import {useSubscriptionSeatsInMemberTab} from '^models/SubscriptionSeat/hook/useSubscriptionSeats';
import {ScopeButton} from '^clients/private/_components/rest-pages/ListPage/ScopeButton';

export const MemberStatusScopeHandler = memo(function InviteStatusScopeHandler() {
    const [memberStatus, setMemberStatus] = useState<SubscriptionUsingStatus | null>(null);
    const {search} = useSubscriptionSeatsInMemberTab();

    const handleClick = (status: SubscriptionUsingStatus | null) => {
        setMemberStatus(status);
        let query = {};
        if (status === SubscriptionUsingStatus.PAID) query = {isPaid: true};
        if (status === SubscriptionUsingStatus.FREE) query = {isPaid: false};
        if (status === SubscriptionUsingStatus.NONE) query = {finishAt: 'NULL'};
        if (status === SubscriptionUsingStatus.QUIT) query = {finishAt: {op: 'not', val: 'NULL'}};
        search({
            order: {id: 'DESC'},
            where: query,
        });
    };

    return (
        <div className="flex items-center gap-2">
            <ScopeButton active={memberStatus == null} onClick={() => handleClick(null)}>
                전체
            </ScopeButton>
            <ScopeButton
                active={memberStatus == SubscriptionUsingStatus.NONE}
                onClick={() => handleClick(SubscriptionUsingStatus.NONE)}
            >
                미정
            </ScopeButton>
            <ScopeButton
                active={memberStatus == SubscriptionUsingStatus.PAID}
                onClick={() => handleClick(SubscriptionUsingStatus.PAID)}
            >
                유료
            </ScopeButton>
            <ScopeButton
                active={memberStatus == SubscriptionUsingStatus.FREE}
                onClick={() => handleClick(SubscriptionUsingStatus.FREE)}
            >
                무료
            </ScopeButton>
            <ScopeButton
                active={memberStatus == SubscriptionUsingStatus.QUIT}
                onClick={() => handleClick(SubscriptionUsingStatus.QUIT)}
            >
                해지
            </ScopeButton>
        </div>
    );
});
