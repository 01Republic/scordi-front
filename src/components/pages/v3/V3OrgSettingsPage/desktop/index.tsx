import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {SettingBodyPanel} from '^v3/V3OrgSettingsPage/desktop/SettingBodyPanel/SettingBodyPanel';
import {OrgEditFormSection} from '^v3/V3OrgSettingsPage/OrgEditFormSection';
import {OrgPayInfoSection} from '^v3/V3OrgSettingsPage/OrgPayInfoSection';
import {OrgManagerSection} from '^v3/V3OrgSettingsPage/OrgManagerSection';
import {OrgConfigSection} from '^v3/V3OrgSettingsPage/OrgConfigSection';
import {WorkspaceStatus} from '^v3/V3OrgSettingsPage/desktop/atom';

import {useRouter} from 'next/router';

export const V3OrgSettingsPageDesktop = memo(() => {
    const router = useRouter();
    const query = router.query.menu?.toString();

    return (
        <V3SettingsLayout>
            <SettingBodyPanel>
                {!query && <OrgEditFormSection />}
                {query === WorkspaceStatus.Billing && <OrgPayInfoSection />}
                {query === WorkspaceStatus.Master && <OrgManagerSection />}
                {query === WorkspaceStatus.Setting && <OrgConfigSection />}
            </SettingBodyPanel>
        </V3SettingsLayout>
    );
});
