import { SHOW_SIDEBAR_ROUTES } from '^pages/routes';
import { Sidebar } from '^components/Sidebar';
import { Icon2 } from '^components/Icon2';
import { removeToken } from '^api/api';
import { useRouter } from 'next/router';
import { OrganizationDto } from '^types/organizationTypes';
import { PreLoader } from '^components/PreLoader';
import { useCurrentUser } from '^hooks/useCurrentUser';
import { OrgHomeRoute } from '^pages/orgs/[id]/home';
import { OrgShowRoute } from '^pages/orgs/[id]';
import { AdminTopNav } from '^components/AdminHeader';
import { OrgMembershipIndexPageRoute } from '^pages/orgs/[id]/memberships';
import React, { ReactElement } from 'react';
import { OrgAppsIndexPageRoute } from '^pages/orgs/[id]/apps';
import { OrgMainLayoutFooter } from '^layouts/org/mainLayout/OrgMainLayoutFooter';
import { useCurrentOrg } from '^hooks/useCurrentOrg';

interface OrgMainLayoutProps {
  org: OrganizationDto | null;
  children: any;
}

const OrgMainLayout = ({ org, children }: OrgMainLayoutProps) => {
  const { pathname, push } = useRouter();
  const currentUser = useCurrentUser();

  if (!org) return <PreLoader />;

  return (
    <div className="flex h-screen">
      <Sidebar className="flex-shrink-0">
        {/*<Sidebar.Title>{org.name}</Sidebar.Title>*/}
        <SidebarOrgHeader org={org} />

        <Sidebar.Menu>
          <Sidebar.Menu.Item
            // text="구독 내역"
            // text="대시보드"
            text="Dashboard"
            to={OrgHomeRoute.path(org.id)}
            selected={pathname === OrgHomeRoute.pathname}
            icon={Icon2.Check}
          />
          <Sidebar.Menu.Item
            // text="구독앱"
            text="Apps"
            to={OrgAppsIndexPageRoute.path(org.id)}
            selected={pathname.startsWith(OrgAppsIndexPageRoute.pathname)}
            icon={Icon2.Folder}
            iconTransform={false}
          />
          <Sidebar.Menu.Item
            // text="구성원 관리"
            text="Members"
            to={OrgMembershipIndexPageRoute.path(org.id)}
            selected={pathname.startsWith(OrgMembershipIndexPageRoute.pathname)}
            icon={Icon2.People}
          />
          <Sidebar.Menu.Item
            // text="회사 정보"
            // text="조직 설정"
            text="Settings"
            to={OrgShowRoute.path(org.id)}
            selected={pathname === OrgShowRoute.pathname}
            // icon={Icon2.Building}
            icon={Icon2.Settings}
            iconTransform={false}
          />
        </Sidebar.Menu>
      </Sidebar>
      <div className="flex-1 overflow-x-auto">
        <AdminTopNav title="Payplo" />
        {children}
        <OrgMainLayoutFooter />
      </div>
    </div>
  )
}

function SidebarOrgHeader({ org }: { org: OrganizationDto }) {
  return (
    <div className="flex items-center shadow" style={{
      padding: '0.75rem 0.5rem'
    }}>
      <div className="avatar placeholder inline-flex mr-2">
        <div className="bg-neutral-focus text-neutral-content rounded w-10">
          <span className="font-bold">{org && org.name ? org.name[0] : '?'}</span>
        </div>
      </div>
      <div className="flex-1 h-full">
        <p className="text-sm font-bold">{org.name}</p>
        <p className="text-xs text-gray-500">Free</p>
      </div>
    </div>
  )
}

function Container({ children, ...props }: any) {
  return (
    <div className="container">
      <div className="flex px-6 md:px-10 lg:px-14">
        <div className="flex-1" />
        <div className="w-full md:w-5/6 lg:w-4/6 xl:w-3/6">
          {children}
        </div>
        <div className="flex-1" />
      </div>
    </div>
  )
}

function OrgProfile({ currentOrg }: { currentOrg: OrganizationDto }) {
  return (
    <div className="container px-10 py-10 flex shadow">
      <div className="flex-1" />
      <div className="w-full md:w-5/6">
        <div className="flex items-start">
          <div className="avatar placeholder inline-flex mr-4">
            <div className="bg-neutral-focus text-neutral-content rounded w-16">
              <span className="text-lg font-bold">{currentOrg!.name[0]}</span>
            </div>
          </div>
          <div className="flex-1 h-full">
            <p className="text-lg font-bold">{currentOrg!.name}</p>
            <p className="text-gray-500">Free</p>
          </div>
        </div>
      </div>
      <div className="flex-1" />
    </div>
  )
}

OrgMainLayout.Container = Container;
OrgMainLayout.OrgProfile = OrgProfile;
export default OrgMainLayout;

export function getOrgMainLayout(page: ReactElement) {
  const router = useRouter();
  const { id: orgId } = router.query;
  const { currentOrg } = useCurrentOrg(Number(orgId));
  const org = currentOrg || {} as OrganizationDto;
  return (
    <OrgMainLayout org={org}>
      {page}
    </OrgMainLayout>
  )
}
