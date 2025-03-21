import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {BottomNavItem} from '^v3/share/BottomNavMobile/BottomNavItem';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {V3OrgBillingHistoriesPageRoute} from '^pages/v3/orgs/[orgId]/billingHistories';
import {V3OrgAccountListPageRoute} from '^pages/v3/orgs/[orgId]/accounts';
import {V3OrgTeamsPageRoute} from '^pages/v3/orgs/[orgId]/teams';
import {V3OrgSettingsOrgPageRoute} from '^pages/v3/orgs/[orgId]/settings/org';
import {CalendarCheck, Home, Key, Settings, Users} from 'lucide-react';

export enum BottomTabIndex {
    HOME,
    HISTORIES,
    ACCOUNTS,
    MEMBERS,
    SETTINGS,
}

interface BottomNavMobileProps {
    activeIndex: BottomTabIndex;
}

export const BottomNavMobile = memo((props: BottomNavMobileProps) => {
    const {activeIndex} = props;
    const currentOrg = useRecoilValue(currentOrgAtom);
    const orgId = currentOrg?.id;
    const loaded = orgId && !isNaN(orgId);

    const height = 60;
    const voidLink = 'javascript:void(0)';
    const tabs = [
        {text: '홈', Icon: Home, href: orgId ? V3OrgHomePageRoute.path(orgId) : voidLink},
        {text: '일정', Icon: CalendarCheck, href: orgId ? V3OrgBillingHistoriesPageRoute.path(orgId) : voidLink},
        {text: '계정', Icon: Key, href: orgId ? V3OrgAccountListPageRoute.path(orgId) : voidLink},
        {text: '멤버', Icon: Users, href: orgId ? V3OrgTeamsPageRoute.path(orgId) : voidLink},
        {text: '관리', Icon: Settings, href: orgId ? V3OrgSettingsOrgPageRoute.path(orgId) : voidLink},
    ];

    const tabCount = tabs.length;

    return (
        <>
            <div
                data-component="BottomNavMobile"
                className={`w-full px-4 grid grid-cols-${tabCount} items-center justify-between fixed bottom-0 bg-white border-t z-10`}
                style={{height}}
            >
                {tabs.map((tab, i) => (
                    <BottomNavItem key={i} {...tab} isActive={i === activeIndex} />
                ))}
            </div>
            <div
                data-component="BottomNavMobileBackdrop"
                className={`flex items-center justify-center container-fluid sticky bottom-0 mt-auto bg-opacity-75 ${
                    orgId ? '' : 'bg-white z-20'
                }`}
                style={{height, minHeight: height}}
            >
                {!loaded && (
                    <span
                        className="btn btn-link loading font-bold text-gray-400 no-underline normal-case"
                        onClick={() => alert(`열심히 데이터를 가져오고 있어요\n잠시만 기다려주세요!`)}
                    >
                        loading ...
                    </span>
                )}
            </div>
        </>
    );
});
