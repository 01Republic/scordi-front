import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {SubscriptionSection} from '^v3/V3OrgSettingsBillingPage/SubscriptionSection';
import {PaymentInfoSection} from '^v3/V3OrgSettingsBillingPage/PaymentInfoSection';
import {BillingHistorySection} from '^v3/V3OrgSettingsBillingPage/BillingHistorySection';
import {SettingBodyPanel} from '^v3/V3OrgSettingsPage/desktop/SettingBodyPanel/SettingBodyPanel';
import {BillingStatus} from '^v3/V3OrgSettingsPage/desktop/atom';
import {useRouter} from 'next/router';

export const V3OrgSettingsBillingPage = memo(() => {
    const router = useRouter();
    const query = router.query.menu?.toString();

    return (
        <V3SettingsLayout>
            <SettingBodyPanel title="결제 관리">
                {query === BillingStatus.Plan && <SubscriptionSection />}
                {query === BillingStatus.Info && <PaymentInfoSection />}
                {query === BillingStatus.History && <BillingHistorySection />}
            </SettingBodyPanel>
        </V3SettingsLayout>
    );
});
