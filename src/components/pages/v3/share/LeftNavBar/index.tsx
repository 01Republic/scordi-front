import {memo} from 'react';
import {useRecoilValue} from 'recoil';
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
import {V3OrgSettingsOrgPageRoute} from '^pages/v3/orgs/[orgId]/settings/org';
import {V3OrgConnectsPageRoute} from '^pages/v3/orgs/[orgId]/connects';
import {LinkTo} from '^components/util/LinkTo';
import {
    BarChart,
    Calendar,
    Database,
    File,
    FileText,
    GitBranch,
    Key,
    ListTodo,
    Megaphone,
    Settings,
} from 'lucide-react';

export enum LNBIndex {
    Dashboard,
    Insights,
    Calendar,
    Subscriptions,
    Cards,
    Accounts,
    Members,
    Settings,
    Updates,
    Connects,
}

interface LeftNavBarProps {
    activeIndex: LNBIndex;
}

export const LeftNavBar = memo(function LeftNavBar(props: LeftNavBarProps) {
    const {activeIndex} = props;
    const isHidden = useRecoilValue(lnbHiddenAtom);
    const {safePath} = useSafePathInCurrentOrg();

    return (
        <aside className={`lnb-container border-r flex flex-col z-10 gap-4 ${isHidden ? 'hide' : ''}`}>
            <Header />

            <section className="border-b px-5 pb-4">
                <LinkTo
                    text="구독 불러오기"
                    href={safePath((org) => V3OrgConnectsPageRoute.path(org.id))}
                    className="btn btn-block btn-scordi"
                />
            </section>

            <MenuList title="조직">
                <MenuItem
                    name="대시보드"
                    href={safePath((org) => V3OrgHomePageRoute.path(org.id))}
                    Icon={() => <File size={24} />}
                    isActive={LNBIndex.Dashboard === activeIndex}
                />
                <MenuItem
                    name="인사이트"
                    href="#"
                    Icon={() => <BarChart size={24} />}
                    isActive={LNBIndex.Insights === activeIndex}
                    status="soon"
                />
                <MenuItem
                    name="결제달력"
                    href={safePath((org) => V3OrgBillingHistoriesPageRoute.path(org.id))}
                    Icon={() => <Calendar size={24} />}
                    isActive={LNBIndex.Calendar === activeIndex}
                />
            </MenuList>

            <MenuList title="자산">
                <MenuItem
                    name="구독리스트"
                    href={safePath((org) => V3OrgAppsPageRoute.path(org.id))}
                    Icon={() => <GitBranch size={24} />}
                    isActive={LNBIndex.Subscriptions === activeIndex}
                />
                <MenuItem
                    name="결제 수단"
                    href={safePath((org) => V3OrgCardListPageRoute.path(org.id))}
                    Icon={() => <FileText size={24} />}
                    isActive={LNBIndex.Cards === activeIndex}
                    status="soon"
                />
                <MenuItem
                    name="계정 관리"
                    href={safePath((org) => V3OrgAccountListPageRoute.path(org.id))}
                    Icon={() => <Key size={24} />}
                    isActive={LNBIndex.Accounts === activeIndex}
                    status="soon"
                />
                <MenuItem
                    name="멤버 관리"
                    href={safePath((org) => V3OrgTeamMembersPageRoute.path(org.id))}
                    Icon={() => <ListTodo size={24} />}
                    isActive={LNBIndex.Members === activeIndex}
                />
            </MenuList>

            <NavBottom>
                <MenuItem
                    name="설정"
                    href={safePath((org) => V3OrgSettingsOrgPageRoute.path(org.id))}
                    Icon={() => <Settings size={24} />}
                    isActive={LNBIndex.Settings === activeIndex}
                />
                {/*<MenuItem name="멤버 초대" href="#" Icon={() => <FcBusiness size={24} />} />*/}
                {/*<MenuItem name="권한설정" href="#" Icon={() => <FcBusiness size={24} />} />*/}
                {/*<MenuItem*/}
                {/*    name="업데이트 소식"*/}
                {/*    href="#"*/}
                {/*    Icon={() => <Megaphone size={24} />}*/}
                {/*    isActive={LNBIndex.Updates === activeIndex}*/}
                {/*    status="soon"*/}
                {/*/>*/}
                <MenuItem
                    name="문의하기"
                    href="https://scordi.channel.io"
                    Icon={() => <Megaphone size={24} />}
                    isActive={LNBIndex.Updates === activeIndex}
                    target="_blank"
                />
                {/*<MenuItem name="관리" href="#" Icon={() => <FcBusiness size={24} />} />*/}
            </NavBottom>
        </aside>
    );
});
