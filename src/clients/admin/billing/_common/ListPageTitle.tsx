import React, {memo} from 'react';
import {SubjectLink} from '^admin/layouts/_common/SubjectLink';
import {AdminScordiPlanListPageRoute} from '^pages/admin/billing/scordi-plans';
import {AdminScordiSubscriptionListPageRoute} from '^pages/admin/billing/scordi-subscriptions';
import {AdminScordiPaymentListPageRoute} from '^pages/admin/billing/scordi-payments';

interface ListPageTitleProps {
    currentSubject: 'scordi-plans' | 'scordi-subscriptions' | 'scordi-payments';
}

export const ListPageTitle = memo((props: ListPageTitleProps) => {
    const {currentSubject} = props;

    return (
        <span className="flex items-center gap-4">
            <SubjectLink
                text="플랜"
                href={AdminScordiPlanListPageRoute.path()}
                active={currentSubject === 'scordi-plans'}
            />
            <span className="text-gray-300">&middot;</span>
            <SubjectLink
                text="구독"
                href={AdminScordiSubscriptionListPageRoute.path()}
                active={currentSubject === 'scordi-subscriptions'}
            />
            <span className="text-gray-300">&middot;</span>
            <SubjectLink
                text="결제"
                href={AdminScordiPaymentListPageRoute.path()}
                active={currentSubject === 'scordi-payments'}
            />
        </span>
    );
});
ListPageTitle.displayName = 'ListPageTitle';
