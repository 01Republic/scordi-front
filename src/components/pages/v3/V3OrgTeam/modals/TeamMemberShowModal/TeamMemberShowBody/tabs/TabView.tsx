import React, {Fragment, memo} from 'react';
import {atom, useRecoilState} from 'recoil';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {SubscriptionListTab} from './SubscriptionListTab';
import {TeamListTab} from './TeamListTab';
import {TabButton} from './TabButton';

export const navTabIndex = atom({
    key: 'TeamMemberShow/NavTabIndex',
    default: 0,
});

const tabs = [
    {label: '이용중인 서비스', Component: SubscriptionListTab},
    {label: '소속 팀', Component: TeamListTab},
];

export const TabView = memo(function TabView() {
    const [tabIndex, setTabIndex] = useRecoilState(navTabIndex);

    const TabPane = tabs[tabIndex].Component || Fragment;

    return (
        <div className="flex flex-col gap-4 bg-gray-100" style={{minHeight: 'calc(100% - 50px - 344px)'}}>
            <MobileSection.Item className={`grid grid-cols-${tabs.length} sticky top-[50px] z-10`}>
                {tabs.map((tab, i) => (
                    <TabButton key={i} label={tab.label} onClick={() => setTabIndex(i)} isActive={tabIndex === i} />
                ))}
            </MobileSection.Item>

            <TabPane />
        </div>
    );
});
