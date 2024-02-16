import React, {memo, useState} from 'react';
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
import {ModifyOrgNameModal} from './ModifyOrgNameModal';
import {V3OrgSettingsPageDesktop} from '^v3/V3OrgSettingsPage/desktop';

export const V3OrgSettingsPage = memo(() => {
    const {isDesktop} = useOnResize2();
    const [isOrganization, setIsOrganization] = useState(false);

    if (isDesktop) {
        return <V3OrgSettingsPageDesktop />;
    } else {
        return (
            <V3MainLayoutMobile
                title={isOrganization ? '관리' : '설정'}
                activeTabIndex={BottomTabIndex.SETTINGS}
                modals={[ModifyOrgNameModal]}
            >
                {isOrganization ? <OrgProfilePanel /> : <UserProfilePanel />}

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
