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
        {text: '관리', Icon: FaGear, href: 'javascript:alert("준비중입니다. 금방 완성될거에요!")'}, // V3OrgSettingsOrgPageRoute.path(orgId)
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
            <div
                className={`flex items-center justify-center container sticky bottom-0 bg-white bg-opacity-75 ${
                    orgId ? '' : 'z-20'
                }`}
                style={{height}}
            >
                {!orgId && (
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
