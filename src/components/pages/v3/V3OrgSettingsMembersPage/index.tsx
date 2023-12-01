import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {SettingBodyPanel} from '^v3/share/SettingBodyPanel';
import {MembersTableSection} from '^v3/V3OrgSettingsMembersPage/MembersTableSection';
import {AddMemberButton, ButtonTypes} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/AddMemberButton';

export const V3OrgSettingsMembersPage = memo(() => {
    return (
        <V3SettingsLayout>
            <SettingBodyPanel
                title="멤버 관리"
                buttons={<AddMemberButton text="멤버 등록" type={ButtonTypes.ScordiBtn} />}
            >
                <MembersTableSection />
            </SettingBodyPanel>
        </V3SettingsLayout>
    );
});
