import {atom, useRecoilState} from 'recoil';
import React, {Fragment, memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';

// 팀멤버 상세 모달에서 탭버튼 컴포넌트가 최초로 만들어져서 여기서 가져오는 것.
// 곧 공용 컴포넌트로 빼내야 할 듯.
import {TabButton} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/TeamMemberShowBody/tabs/TabButton';
import {BillingHistoryListTab} from './BillingHistoryListTab';
import {TeamMemberListTab} from './TeamMemberListTab';

export const navTabIndex = atom({
    key: 'SubscriptionShow/NavTabIndex',
    default: 0,
});

interface TabViewProps {
    onTabChange?: () => any;
    onFinish?: () => any;
}

export const TabView = memo(function TabView(props: TabViewProps) {
    const [tabIndex, setTabIndex] = useRecoilState(navTabIndex);
    const {onTabChange, onFinish} = props;

    const tabs = [
        {label: '이용중인 멤버', Component: () => <TeamMemberListTab onFinish={onFinish} />},
        {label: '결제내역', Component: BillingHistoryListTab},
        // {label: '보관중인 계정', Component: Fragment},
    ];

    useEffect(() => {
        onTabChange && onTabChange();
    }, [tabIndex]);

    const TabPane = tabs[tabIndex].Component || Fragment;

    return (
        <div
            className="flex flex-col gap-4 bg-gray-100"
            style={{minHeight: 'calc(100% - 50px - 344px)', marginTop: 'calc(-1rem - 1px)'}}
        >
            <MobileSection.Item className={`grid grid-cols-${tabs.length} sticky top-[50px] z-10`}>
                {tabs.map((tab, i) => (
                    <TabButton key={i} label={tab.label} onClick={() => setTabIndex(i)} isActive={tabIndex === i} />
                ))}
            </MobileSection.Item>

            <TabPane />
        </div>
    );
});
