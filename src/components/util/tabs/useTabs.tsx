import {atom, RecoilState, useRecoilState} from 'recoil';
import {TabItem} from '^components/util/tabs/defineTabs';
import React, {memo, useEffect, useState} from 'react';
import {ContentTabNav, ContentTabNavProps} from '^layouts/ContentLayout';

interface UseTabsConfig {
    tabIndexAtom: RecoilState<number>;
    tabs: TabItem[];
    TabNav: React.MemoExoticComponent<(props: Partial<ContentTabNavProps>) => JSX.Element>;
}

export const useTabs = (config: UseTabsConfig) => {
    const {tabIndexAtom, tabs, TabNav} = config;
    const [currentTabIndex, setCurrentTabIndex] = useRecoilState(tabIndexAtom);
    const [tabLen, setTabLen] = useState(tabs.length);

    const addTabs = (newTabs: TabItem[]) => {
        newTabs.forEach((newTab) => tabs.push(newTab));
        setTabLen((len) => len + newTabs.length);
    };

    console.log('tabs', tabs);
    const currentTab = tabs[currentTabIndex] || tabs[0];

    const CurrentTabPane = currentTab?.TabPane || React.Fragment;

    return {tabs, currentTab, currentTabIndex, setCurrentTabIndex, tabIndexAtom, TabNav, CurrentTabPane, addTabs};
};
