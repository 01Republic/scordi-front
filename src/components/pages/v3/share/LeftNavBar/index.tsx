import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {
    FcAdvertising,
    FcCalendar,
    FcDiploma1,
    FcDocument,
    FcKey,
    FcParallelTasks,
    FcSettings,
    FcWorkflow,
} from 'react-icons/fc';
import {Header} from './Header';
import {MenuList} from './MenuList';
import {MenuItem} from './MenuItem';
import {NavBottom} from './NavBottom';
import {lnbHiddenAtom} from './atom';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {V3OrgBillingHistoriesPageRoute} from '^pages/v3/orgs/[orgId]/billingHistories';
import {V3OrgCardListPageRoute} from '^pages/v3/orgs/[orgId]/cards';
import {V3OrgAppsPageRoute} from '^pages/v3/orgs/[orgId]/apps';
import {V3OrgAccountListPageRoute} from '^pages/v3/orgs/[orgId]/accounts';
import {V3OrgTeamMembersPageRoute} from '^pages/v3/orgs/[orgId]/teams/members';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';

export enum LNBIndex {
    Dashboard,
    Calendar,
    Subscriptions,
    Cards,
    Accounts,
    Members,
    Settings,
    Updates,
}

interface LeftNavBarProps {
    activeIndex: LNBIndex;
}

export const LeftNavBar = memo(function LeftNavBar(props: LeftNavBarProps) {
    const {activeIndex} = props;
    const isHidden = useRecoilValue(lnbHiddenAtom);
    const {safePath} = useSafePathInCurrentOrg();

    return (
        <aside className={`lnb-container border-r flex flex-col gap-4 ${isHidden ? 'hide' : ''}`}>
            <Header />

            <MenuList title="조직">
                <MenuItem
                    name="대시보드"
                    href={safePath((org) => V3OrgHomePageRoute.path(org.id))}
                    Icon={() => <FcDocument size={24} />}
                    isActive={LNBIndex.Dashboard === activeIndex}
                />
                <MenuItem
                    name="결제달력"
                    href={safePath((org) => V3OrgBillingHistoriesPageRoute.path(org.id))}
                    Icon={() => <FcCalendar size={24} />}
                    isActive={LNBIndex.Calendar === activeIndex}
                />
            </MenuList>

            <MenuList title="자산">
                <MenuItem
                    name="구독리스트"
                    href={safePath((org) => V3OrgAppsPageRoute.path(org.id))}
                    Icon={() => <FcWorkflow size={24} />}
                    isActive={LNBIndex.Subscriptions === activeIndex}
                />
                <MenuItem
                    name="결제 수단"
                    href={safePath((org) => V3OrgCardListPageRoute.path(org.id))}
                    Icon={() => <FcDiploma1 size={24} />}
                    isActive={LNBIndex.Cards === activeIndex}
                />
                <MenuItem
                    name="계정 관리"
                    href={safePath((org) => V3OrgAccountListPageRoute.path(org.id))}
                    Icon={() => <FcKey size={24} />}
                    isActive={LNBIndex.Accounts === activeIndex}
                />
                <MenuItem
                    name="멤버 관리"
                    href={safePath((org) => V3OrgTeamMembersPageRoute.path(org.id))}
                    Icon={() => <FcParallelTasks size={24} />}
                    isActive={LNBIndex.Members === activeIndex}
                />
            </MenuList>

            <NavBottom>
                <MenuItem
                    name="설정"
                    href="#"
                    Icon={() => <FcSettings size={24} />}
                    isActive={LNBIndex.Settings === activeIndex}
                />
                {/*<MenuItem name="멤버 초대" href="#" Icon={() => <FcBusiness size={24} />} />*/}
                {/*<MenuItem name="권한설정" href="#" Icon={() => <FcBusiness size={24} />} />*/}
                <MenuItem
                    name="업데이트 소식"
                    href="#"
                    Icon={() => <FcAdvertising size={24} />}
                    isActive={LNBIndex.Updates === activeIndex}
                />
                {/*<MenuItem name="관리" href="#" Icon={() => <FcBusiness size={24} />} />*/}
            </NavBottom>
        </aside>
    );
});