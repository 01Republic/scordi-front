import React, {memo, useState} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {OrgEditFormSection} from '^v3/V3OrgSettingsPage/OrgEditFormSection';
import {OrgPayInfoSection} from '^v3/V3OrgSettingsPage/OrgPayInfoSection';
import {SettingBodyPanel} from '^v3/share/SettingBodyPanel';
import {OrgManagerSection} from '^v3/V3OrgSettingsPage/OrgManagerSection';
import {OrgConfigSection} from '^v3/V3OrgSettingsPage/OrgConfigSection';
import {useOnResize2} from '^components/util/onResize2';
import {V3MainLayoutMobile} from '../layouts/V3MainLayout.mobile';
import {BottomTabIndex} from '../share/BottomNavMobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ApplyNotFoundProduct} from '../share/sections/ApplyNotFoundProduct';
import {WorkspacePanel} from './mobile/WorkspacePanel';
import {SettingPanel} from './mobile/SettingPanel';
import {MembershipPanel} from './mobile/MembershipPanel';
import {InformationPanel} from './mobile/InformationPanel';
import {SystemPanel} from './mobile/SystemPanel';
import {UserProfilePanel} from './mobile/UserProfilePanel';
import {OrgProfilePanel} from './mobile/OrgProfilePanel';

export const V3OrgSettingsPage = memo(() => {
    const {isDesktop} = useOnResize2();
    const [isOrganization, setIsOrganization] = useState(false);

    if (isDesktop) {
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
    } else {
        return (
            <V3MainLayoutMobile title={isOrganization ? '관리' : '설정'} activeTabIndex={BottomTabIndex.SETTINGS}>
                {isOrganization ? <OrgProfilePanel isOrganization={isOrganization} /> : <UserProfilePanel />}

                <SettingPanel isOrganization={isOrganization} setIsOrganization={setIsOrganization} />

                {isOrganization ? (
                    <>
                        <WorkspacePanel />
                        <MembershipPanel />
                    </>
                ) : (
                    <>
                        <InformationPanel />
                        <SystemPanel />
                    </>
                )}

                <MobileSection.Item noStyle className="px-4 mb-16">
                    {/* 스코디에 제보하기 */}
                    <ApplyNotFoundProduct />
                </MobileSection.Item>
            </V3MainLayoutMobile>
        );
    }
});
