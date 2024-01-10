import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {SettingBodyPanel} from '^v3/V3OrgSettingsPage/desktop/SettingBodyPanel/SettingBodyPanel';
import {MembersTableSection} from '^v3/V3OrgSettingsMembersPage/MembersTableSection';
import {AddMemberButton, ButtonTypes} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/AddMemberButton';
import {MemberStatus} from '^v3/V3OrgSettingsPage/desktop/atom';
import {useRouter} from 'next/router';

export const V3OrgSettingsMembersPage = memo(() => {
    const router = useRouter();
    const query = router.query.menu?.toString();

    return (
        <V3SettingsLayout>
            <SettingBodyPanel
                title="멤버 관리"
                buttons={<AddMemberButton text="멤버 등록" type={ButtonTypes.ScordiBtn} />}
            >
                {query === MemberStatus.Member && <MembersTableSection />}
            </SettingBodyPanel>
        </V3SettingsLayout>
    );
});
