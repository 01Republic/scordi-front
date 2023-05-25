import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {SettingBodyPanel} from '^v3/share/SettingBodyPanel';
import {AddNewMemberButton} from '^v3/V3OrgSettingsMembersPage/AddNewMemberButton';
import {MembersTableSection} from '^v3/V3OrgSettingsMembersPage/MembersTableSection';

export const V3OrgSettingsMembersPage = memo(() => {
    return (
        <V3SettingsLayout>
            <SettingBodyPanel title="멤버 관리" buttons={<AddNewMemberButton />}>
                <MembersTableSection />
            </SettingBodyPanel>
        </V3SettingsLayout>
    );
});
