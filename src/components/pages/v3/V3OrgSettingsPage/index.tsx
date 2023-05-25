import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {OrgEditFormSection} from '^v3/V3OrgSettingsPage/OrgEditFormSection';
import {OrgPayInfoSection} from '^v3/V3OrgSettingsPage/OrgPayInfoSection';
import {SettingBodyPanel} from '^v3/share/SettingBodyPanel';
import {OrgManagerSection} from '^v3/V3OrgSettingsPage/OrgManagerSection';
import {OrgConfigSection} from '^v3/V3OrgSettingsPage/OrgConfigSection';

export const V3OrgSettingsPage = memo(() => {
    return (
        <V3SettingsLayout>
            <SettingBodyPanel>
                <OrgEditFormSection />

                <div className="divider my-8" />

                <OrgPayInfoSection />

                <div className="divider my-8" />

                <OrgManagerSection />

                <div className="divider my-8" />

                <OrgConfigSection />
            </SettingBodyPanel>
        </V3SettingsLayout>
    );
});
