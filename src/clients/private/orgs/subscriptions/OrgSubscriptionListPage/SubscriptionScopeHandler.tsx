import {memo, useState} from 'react';
import {ScopeButton} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/InviteStatusScopeHandler/ScopeButton';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {SubscriptionUsingStatus, t_SubscriptionUsingStatus} from '^models/Subscription/types';

export const SubscriptionScopeHandler = memo(function () {
    const {query, search} = useSubscriptionTableListAtom();
    const [activeStatus, setActiveUsingStatus] = useState<SubscriptionUsingStatus>();

    const searchResource = (usingStatus?: SubscriptionUsingStatus) => {
        if (usingStatus === activeStatus) return;
        setActiveUsingStatus(usingStatus);
        search({...query, usingStatus, page: 1});
    };

    return (
        <div className="flex items-center gap-2">
            <ScopeButton active={activeStatus === undefined} onClick={() => searchResource()}>
                전체
            </ScopeButton>
            {[
                SubscriptionUsingStatus.NONE,
                SubscriptionUsingStatus.FREE,
                SubscriptionUsingStatus.PAID,
                SubscriptionUsingStatus.QUIT,
            ].map((usingStatus, i) => (
                <ScopeButton key={i} active={activeStatus === usingStatus} onClick={() => searchResource(usingStatus)}>
                    {t_SubscriptionUsingStatus(usingStatus)}
                </ScopeButton>
            ))}
        </div>
    );
});
