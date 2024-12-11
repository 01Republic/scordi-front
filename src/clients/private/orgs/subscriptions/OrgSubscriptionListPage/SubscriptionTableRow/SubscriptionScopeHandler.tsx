import {memo, useState} from 'react';
import {ScopeButton} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/InviteStatusScopeHandler/ScopeButton';
import {CreditCardUsingStatus} from '^models/CreditCard/type';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';

export const SubscriptionScopeHandler = memo(function () {
    const {query, search} = useSubscriptionTableListAtom();
    const [usingStatus, setUsingStatus] = useState<CreditCardUsingStatus>();

    const searchResource = () => {};

    return (
        <div className="flex items-center gap-2">
            <ScopeButton active={usingStatus === undefined} onClick={() => searchResource()}>
                전체
            </ScopeButton>
            <ScopeButton active={usingStatus === CreditCardUsingStatus.UnDef} onClick={searchResource}>
                미정
            </ScopeButton>
            <ScopeButton active={usingStatus === CreditCardUsingStatus.NoUse} onClick={() => searchResource}>
                유료
            </ScopeButton>
            <ScopeButton active={usingStatus === CreditCardUsingStatus.InUse} onClick={() => searchResource}>
                무료
            </ScopeButton>
            <ScopeButton active={usingStatus === CreditCardUsingStatus.Expired} onClick={() => searchResource}>
                해지
            </ScopeButton>
        </div>
    );
});
