import React, {memo, useState} from 'react';
import {ScopeButton} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/InviteStatusScopeHandler/ScopeButton';
import {SubscriptionUsingStatus} from '^models/Subscription/types';

interface MemberStatusScopeHandlerProps {
    onSearch: (status: SubscriptionUsingStatus | null) => any;
}

export const MemberStatusScopeHandler = memo(function InviteStatusScopeHandler(props: MemberStatusScopeHandlerProps) {
    const {onSearch} = props;
    const [memberStatus, setMemberStatus] = useState<SubscriptionUsingStatus | null>(null);

    const handleClick = (status: SubscriptionUsingStatus | null) => {
        setMemberStatus(status);
        onSearch(status);
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
