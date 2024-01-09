import React, {memo} from 'react';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {MenuItem, MenuList} from '^v3/V3OrgSettingsPage/desktop/SettingMenuPanel/MenuComponents';
import {V3OrgSettingsOrgPageRoute} from '^pages/v3/orgs/[orgId]/settings/org';
import {V3OrgSettingsBillingPageRoute} from '^pages/v3/orgs/[orgId]/settings/billing';
import {V3OrgSettingsMembersPageRoute} from '^pages/v3/orgs/[orgId]/settings/members';
import {V3OrgSettingsConnectsPageRoute} from '^pages/v3/orgs/[orgId]/settings/connects';
import {BillingStatus, ConnectStatus, MemberStatus, WorkspaceStatus} from '^v3/V3OrgSettingsPage/desktop/atom';

export const V3OrgSettingsMenuPanel = memo(() => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);

    return (
        <aside className="border-r w-[240px] bg-white h-screen py-8 flex flex-col gap-5">
            <MenuList title="워크스페이스">
                <MenuItem href={V3OrgSettingsOrgPageRoute.path(orgId)} status={WorkspaceStatus.GeneralInfo} />
                <MenuItem href={V3OrgSettingsOrgPageRoute.path(orgId)} status={WorkspaceStatus.Billing} />
                {/*<MenuItem href={V3OrgSettingsOrgPageRoute.path(orgId)} status={WorkspaceStatus.Master} />*/}
                <MenuItem href={V3OrgSettingsOrgPageRoute.path(orgId)} status={WorkspaceStatus.Setting} />
            </MenuList>
            <MenuList title="결제">
                <MenuItem href={V3OrgSettingsBillingPageRoute.path(orgId)} status={BillingStatus.Plan} />
                <MenuItem href={V3OrgSettingsBillingPageRoute.path(orgId)} status={BillingStatus.Info} />
                <MenuItem href={V3OrgSettingsBillingPageRoute.path(orgId)} status={BillingStatus.History} />
            </MenuList>
            <MenuList title="멤버">
                <MenuItem href={V3OrgSettingsMembersPageRoute.path(orgId)} status={MemberStatus.Member} />
            </MenuList>
            <MenuList title="연동">
                <MenuItem href={V3OrgSettingsConnectsPageRoute.path(orgId)} status={ConnectStatus.Workspace} />
                <MenuItem href={V3OrgSettingsConnectsPageRoute.path(orgId)} status={ConnectStatus.InvoiceEmail} />
            </MenuList>
        </aside>
    );
});
