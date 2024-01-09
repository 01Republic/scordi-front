import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {SubscriptionSection} from '^v3/V3OrgSettingsBillingPage/SubscriptionSection';
import {PaymentInfoSection} from '^v3/V3OrgSettingsBillingPage/PaymentInfoSection';
import {BillingHistorySection} from '^v3/V3OrgSettingsBillingPage/BillingHistorySection';
import {SettingBodyPanel} from '^v3/V3OrgSettingsPage/desktop/SettingBodyPanel/SettingBodyPanel';
import {useRecoilValue} from 'recoil';
import {BillingStatus, SelectedSettingsItem} from '^v3/V3OrgSettingsPage/desktop/atom';

export const V3OrgSettingsBillingPage = memo(() => {
    const selectedItem = useRecoilValue(SelectedSettingsItem);

    return (
        <V3SettingsLayout>
            <SettingBodyPanel title="결제 관리">
                {selectedItem === BillingStatus.Plan && <SubscriptionSection />}
                {selectedItem === BillingStatus.Info && <PaymentInfoSection />}
                {selectedItem === BillingStatus.History && <BillingHistorySection />}
            </SettingBodyPanel>
        </V3SettingsLayout>
    );
});
