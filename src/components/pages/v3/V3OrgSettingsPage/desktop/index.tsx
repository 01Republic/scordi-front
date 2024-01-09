import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {SettingBodyPanel} from '^v3/V3OrgSettingsPage/desktop/SettingBodyPanel/SettingBodyPanel';
import {OrgEditFormSection} from '^v3/V3OrgSettingsPage/OrgEditFormSection';
import {OrgPayInfoSection} from '^v3/V3OrgSettingsPage/OrgPayInfoSection';
import {OrgManagerSection} from '^v3/V3OrgSettingsPage/OrgManagerSection';
import {OrgConfigSection} from '^v3/V3OrgSettingsPage/OrgConfigSection';
import {SelectedSettingsItem, WorkspaceStatus} from '^v3/V3OrgSettingsPage/desktop/atom';

export const V30SettingsPageDesktop = memo(() => {
    const selectedItem = useRecoilValue(SelectedSettingsItem);

    return (
        <V3SettingsLayout>
            <SettingBodyPanel>
                {selectedItem === WorkspaceStatus.GeneralInfo && <OrgEditFormSection />}
                {selectedItem === WorkspaceStatus.Billing && <OrgPayInfoSection />}
                {selectedItem === WorkspaceStatus.Master && <OrgManagerSection />}
                {selectedItem === WorkspaceStatus.Setting && <OrgConfigSection />}
            </SettingBodyPanel>
        </V3SettingsLayout>
    );
});
