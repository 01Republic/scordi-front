import React, {memo} from 'react';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {OrgSettingsListSection} from '^clients/private/_layouts/OrgSettingsLayout';

interface SubscriptionInfoSectionProps {
    orgId: number;
}

export const SubscriptionInfoSection = memo((props: SubscriptionInfoSectionProps) => {
    const {orgId} = props;

    return (
        <OrgSettingsListSection
            title={'결제'}
            buttonHref={OrgSettingsPaymentPageRoute.path(orgId)}
            items={[
                {title: '구독중인 플랜', desc: 'scordi 무료 체험'},
                {title: '다음 결제일', desc: '-'},
            ]}
        />
    );
});
SubscriptionInfoSection.displayName = 'SubscriptionInfoSection';
