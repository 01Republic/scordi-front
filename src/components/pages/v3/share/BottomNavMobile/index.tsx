import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {BottomNavItem} from '^v3/share/BottomNavMobile/BottomNavItem';
import {FaGear, FaHouse, FaRegCalendarCheck, FaUsers} from 'react-icons/fa6';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {V3OrgSettingsOrgPageRoute} from '^pages/v3/orgs/[orgId]/settings/org';
import {V3OrgTeamsPageRoute} from '^pages/v3/orgs/[orgId]/teams';
import {V3OrgBillingHistoriesPageRoute} from '^pages/v3/orgs/[orgId]/billingHistories';
import {orgIdParamState} from '^atoms/common';

interface BottomNavMobileProps {
    activeIndex: number;
}

export const BottomNavMobile = memo((props: BottomNavMobileProps) => {
    const {activeIndex} = props;
    const currentOrg = useRecoilValue(currentOrgAtom);

    const height = 60;
    const orgId = currentOrg?.id || 0;
    const tabs = [
        {text: '홈', Icon: FaHouse, href: V3OrgHomePageRoute.path(orgId)},
        {text: '일정', Icon: FaRegCalendarCheck, href: V3OrgBillingHistoriesPageRoute.path(orgId)},
        {text: '멤버', Icon: FaUsers, href: V3OrgTeamsPageRoute.path(orgId)},
        {text: '관리', Icon: FaGear, href: V3OrgSettingsOrgPageRoute.path(orgId)},
    ];

    return (
        <>
            <div
                className="w-full px-4 grid grid-cols-4 items-center justify-between fixed bottom-0 bg-white border-t z-10"
                style={{height}}
            >
                {tabs.map((tab, i) => (
                    <BottomNavItem key={i} {...tab} isActive={i === activeIndex} />
                ))}
            </div>
            <div className="flex container sticky bottom-0" style={{height}} />
        </>
    );
});
