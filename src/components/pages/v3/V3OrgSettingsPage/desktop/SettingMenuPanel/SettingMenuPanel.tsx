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

    const workspacePath = V3OrgSettingsOrgPageRoute.path(orgId);
    const billingPath = V3OrgSettingsBillingPageRoute.path(orgId);
    const memberPath = V3OrgSettingsMembersPageRoute.path(orgId);
    const connectPath = V3OrgSettingsConnectsPageRoute.path(orgId);

    return (
        <aside className=" w-[240px] bg-white h-screen py-8 flex flex-col gap-5 shadow-xl">
            <MenuList title="워크스페이스">
                <MenuItem href={workspacePath} status={WorkspaceStatus.GeneralInfo} />
                <MenuItem
                    href={workspacePath}
                    query={{menu: WorkspaceStatus.Billing}}
                    status={WorkspaceStatus.Billing}
                />
                {/*<MenuItem href={workspacePath} status={WorkspaceStatus.Master} />*/}
                <MenuItem
                    href={workspacePath}
                    query={{menu: WorkspaceStatus.Setting}}
                    status={WorkspaceStatus.Setting}
                />
            </MenuList>

            <MenuList title="결제">
                <MenuItem href={billingPath} query={{menu: BillingStatus.Plan}} status={BillingStatus.Plan} />
                <MenuItem href={billingPath} query={{menu: BillingStatus.Info}} status={BillingStatus.Info} />
                <MenuItem href={billingPath} query={{menu: BillingStatus.History}} status={BillingStatus.History} />
            </MenuList>

            <MenuList title="멤버">
                <MenuItem href={memberPath} query={{menu: MemberStatus.Member}} status={MemberStatus.Member} />
            </MenuList>

            <MenuList title="연동">
                <MenuItem href={connectPath} query={{menu: ConnectStatus.Workspace}} status={ConnectStatus.Workspace} />
                <MenuItem
                    href={connectPath}
                    query={{menu: ConnectStatus.InvoiceEmail}}
                    status={ConnectStatus.InvoiceEmail}
                />
            </MenuList>
        </aside>
    );
});
