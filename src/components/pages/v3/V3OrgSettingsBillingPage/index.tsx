import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {SubscriptionSection} from '^v3/V3OrgSettingsBillingPage/SubscriptionSection';
import {PaymentInfoSection} from '^v3/V3OrgSettingsBillingPage/PaymentInfoSection';
import {BillingHistorySection} from '^v3/V3OrgSettingsBillingPage/BillingHistorySection';
import {SettingBodyPanel} from '^v3/share/SettingBodyPanel';

export const V3OrgSettingsBillingPage = memo(() => {
    return (
        <V3SettingsLayout>
            <SettingBodyPanel title="결제 관리">
                <SubscriptionSection />
                <PaymentInfoSection />

                {/*<div className="divider my-8"></div>*/}

                <BillingHistorySection />
            </SettingBodyPanel>
        </V3SettingsLayout>
    );
});
