import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {OrgEditFormSection} from '^v3/V3OrgSettingsPage/OrgEditFormSection';
import {OrgPayInfoSection} from '^v3/V3OrgSettingsPage/OrgPayInfoSection';
import {SettingBodyPanel} from '^v3/share/SettingBodyPanel';
import {OrgManagerSection} from '^v3/V3OrgSettingsPage/OrgManagerSection';
import {OrgConfigSection} from '^v3/V3OrgSettingsPage/OrgConfigSection';
import {useOnResize2} from '^components/util/onResize2';
import {V3MainLayoutMobile} from '../layouts/V3MainLayout.mobile';
import {BottomTabIndex} from '../share/BottomNavMobile';
import {TopNavProfileButton} from '../share/TobNav/TopNavProfileButton';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ApplyNotFoundProduct} from '../share/sections/ApplyNotFoundProduct';
import {SettingInfoPanel} from './mobile/SettingInfoPanel';

export const V3OrgSettingsPage = memo(() => {
    const {isDesktop} = useOnResize2();

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
            <V3MainLayoutMobile title="설정" activeTabIndex={BottomTabIndex.SETTINGS}>
                {/* 안내및정보 */}
                <SettingInfoPanel infoList={SettingsList} title="안내 및 정보" />
                <SettingInfoPanel infoList={SystemList} title="시스템 및 고객지원" />

                {/* 하단 여백 */}
                <MobileSection.Item noStyle className="px-4 mb-16">
                    {/* 스코디에 제보하기 */}
                    <ApplyNotFoundProduct />
                </MobileSection.Item>
            </V3MainLayoutMobile>
        );
    }
});

const SettingsList = [
    {
        index: 1,
        title: '알림설정',
        pathName: '/',
    },
    {
        index: 2,
        title: '이용약관',
        pathName: '/',
    },
    {
        index: 3,
        title: '버전정보',
        content: '1.0.0',
    },
];

const SystemList = [
    {
        index: 1,
        title: '자주 묻는 질문',
        pathName: '/',
    },
    {
        index: 2,
        title: '1:1 문의',
        pathName: '/',
    },
];
