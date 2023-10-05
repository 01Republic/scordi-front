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
import {SettingInfoPanel} from './mobile/SettingInfoPanel';
import {ToggleSettingPanel} from './mobile/ToggleSettingPanel';
import {ProfilePanel} from './mobile/profilePanel';

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
                {/* 개인프로필 */}
                <ProfilePanel isOrganization={isOrganization} />

                {/* 워크스페이스 관리하기 */}
                <ToggleSettingPanel isOrganization={isOrganization} setIsOrganization={setIsOrganization} />

                {/* 안내및정보 */}
                {isOrganization ? (
                    <>
                        <SettingInfoPanel infoList={WorkspaceInfoList} title="워크스페이스 정보" />
                        <SettingInfoPanel infoList={PaymentInfoList} title="결제관리" />
                    </>
                ) : (
                    <>
                        <SettingInfoPanel infoList={SettingsList} title="안내 및 정보" />
                        <SettingInfoPanel infoList={SystemList} title="시스템 및 고객지원" />
                    </>
                )}

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

const WorkspaceInfoList = [
    {
        index: 1,
        title: '멤버',
        content: '10명',
    },
    {
        index: 2,
        title: '주소',
        content: 'https://scordi.io/v3/orgs/36/settings/org ',
    },
];

const PaymentInfoList = [
    {
        index: 1,
        title: '구독중인 플랜',
        content: 'Basic',
    },
    {
        index: 2,
        title: '청구메일',
        content: 'official@01republic.io',
    },
    {
        index: 3,
        title: '결제수단',
        content: '신용카드',
    },
];
