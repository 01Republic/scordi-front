import React, {memo, useEffect} from 'react';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {OrgSettingsListSection} from '^clients/private/_layouts/OrgSettingsLayout';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';

interface SubscriptionInfoSectionProps {
    orgId: number;
}

export const SubscriptionInfoSection = memo((props: SubscriptionInfoSectionProps) => {
    const {orgId} = props;
    const {isLoading, currentSubscription, fetch} = useCurrentScordiSubscription();

    useEffect(() => {
        if (orgId && !isNaN(orgId)) fetch(orgId);
    }, [orgId]);

    return (
        <OrgSettingsListSection
            title="결제"
            buttonHref={OrgSettingsPaymentPageRoute.path(orgId)}
            isLoading={isLoading}
            items={[
                {title: '구독중인 플랜', desc: currentSubscription?.scordiPlan.name || 'scordi 무료 체험'},
                {title: '다음 결제일', desc: '-'},
            ]}
        />
    );
});
SubscriptionInfoSection.displayName = 'SubscriptionInfoSection';
