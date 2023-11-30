import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {SettingBodyPanel} from '^v3/share/SettingBodyPanel';
import {AddNewMemberButton} from '^v3/V3OrgSettingsMembersPage/AddNewMemberButton';
import {MembersTableSection} from '^v3/V3OrgSettingsMembersPage/MembersTableSection';
import {AddMemberButton} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/AddMemberButton';

export const V3OrgSettingsMembersPage = memo(() => {
    return (
        <V3SettingsLayout>
            <SettingBodyPanel
                title="멤버 관리"
                buttons={<AddMemberButton textButton="등록하기" className="btn btn-scordi" />}
            >
                <MembersTableSection />
            </SettingBodyPanel>
        </V3SettingsLayout>
    );
});
