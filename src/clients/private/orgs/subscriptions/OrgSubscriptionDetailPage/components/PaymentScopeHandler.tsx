import React, {memo, useState} from 'react';
import {SubscriptionUsingStatus} from '^models/Subscription/types';
import {ScopeButton} from '^clients/private/_components/rest-pages/ListPage/ScopeButton';

interface PaymentScopeHandlerProps {
    onSearch: (status: SubscriptionUsingStatus | null) => any;
}

export const PaymentScopeHandler = memo(function InviteStatusScopeHandler(props: PaymentScopeHandlerProps) {
    const {onSearch} = props;
    const [memberStatus, setMemberStatus] = useState<SubscriptionUsingStatus | null>(null);

    const handleClick = (status: SubscriptionUsingStatus | null) => {
        setMemberStatus(status);
        onSearch(status);
    };

    return (
        // TODO: 이 정보들 없는 것 같은데? 어케알지?
        //  여기서 검색하는 것 처럼 쿼리하시면 됩니다! [by @fred] (참조: src/clients/private/orgs/assets/invoice-accounts/OrgInvoiceAccountShowPage/tab-panes/BillingHistoryListOfInvoiceAccountTabContent/BillingHistoryScopeHandler.tsx)
        <div className="flex items-center gap-2">
            <ScopeButton active={memberStatus == null} onClick={() => handleClick(null)}>
                전체
            </ScopeButton>
            <ScopeButton
                active={memberStatus == SubscriptionUsingStatus.NONE}
                onClick={() => handleClick(SubscriptionUsingStatus.NONE)}
            >
                예정
            </ScopeButton>
            <ScopeButton
                active={memberStatus == SubscriptionUsingStatus.PAID}
                onClick={() => handleClick(SubscriptionUsingStatus.PAID)}
            >
                실패
            </ScopeButton>
            <ScopeButton
                active={memberStatus == SubscriptionUsingStatus.FREE}
                onClick={() => handleClick(SubscriptionUsingStatus.FREE)}
            >
                청구됨
            </ScopeButton>
        </div>
    );
});
