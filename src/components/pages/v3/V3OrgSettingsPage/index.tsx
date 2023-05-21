import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {OrgEditFormSection} from '^v3/V3OrgSettingsPage/OrgEditFormSection';
import {OrgPayInfoSection} from '^v3/V3OrgSettingsPage/OrgPayInfoSection';
import {SettingBodyPanel} from '^v3/share/SettingBodyPanel';

export const V3OrgSettingsPage = memo(() => {
    return (
        <V3SettingsLayout>
            <SettingBodyPanel>
                <OrgEditFormSection />

                <div className="divider my-8"></div>

                <OrgPayInfoSection />
            </SettingBodyPanel>
        </V3SettingsLayout>
    );
});
