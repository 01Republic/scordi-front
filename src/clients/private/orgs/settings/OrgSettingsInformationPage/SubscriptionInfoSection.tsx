import React, {memo, useEffect} from 'react';
import {OrgSettingsPaymentPageRoute} from '^pages/orgs/[id]/settings/payments';
import {OrgSettingsListSection} from '^clients/private/_layouts/OrgSettingsLayout';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {yyyy_mm_dd} from '^utils/dateTime';
import {useTranslation} from 'next-i18next';

interface SubscriptionInfoSectionProps {
    orgId: number;
}

export const SubscriptionInfoSection = memo((props: SubscriptionInfoSectionProps) => {
    const {orgId} = props;
    const {isLoading, currentSubscription, fetch} = useCurrentScordiSubscription();
    const {t} = useTranslation('workspaceSettings');

    useEffect(() => {
        if (orgId && !isNaN(orgId)) fetch(orgId);
    }, [orgId]);

    const nextDate = currentSubscription?.getNextDate() || null;

    return (
        <OrgSettingsListSection
            title={t('subscription')}
            buttonHref={OrgSettingsPaymentPageRoute.path(orgId)}
            isLoading={isLoading}
            items={[
                {title: t('plan'), desc: currentSubscription?.scordiPlan.name || t('freeTrial')},
                {title: t('renewalDate'), desc: nextDate ? yyyy_mm_dd(nextDate) : '-'},
            ]}
        />
    );
});
SubscriptionInfoSection.displayName = 'SubscriptionInfoSection';
