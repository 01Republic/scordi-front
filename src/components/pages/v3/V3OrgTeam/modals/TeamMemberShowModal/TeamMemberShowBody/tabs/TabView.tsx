import React, {Fragment, memo} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {SubscriptionListTab} from './SubscriptionListTab';
import {TeamListTab} from './TeamListTab';
import {MobileSection} from '^v3/share/sections/MobileSection';

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
        <div className="flex flex-col gap-4 bg-neutral-200" style={{minHeight: 'calc(100% - 50px - 344px)'}}>
            <MobileSection.Item className={`grid grid-cols-${tabs.length} sticky top-[50px] z-20`}>
                {tabs.map((tab, i) => {
                    const isActive = tabIndex === i;

                    return (
                        <div
                            key={i}
                            className={`flex items-center justify-center transition-all ${
                                isActive
                                    ? 'text-black bg-white border-b-4 border-scordi'
                                    : 'text-gray-500 border-b-4 border-gray-100 hover:text-gray-800 hover:bg-gray-100 cursor-pointer'
                            }`}
                            onClick={() => setTabIndex(i)}
                        >
                            <p className="text-16 font-semibold">{tab.label}</p>
                        </div>
                    );
                })}
            </MobileSection.Item>

            <TabPane />
        </div>
    );
});
