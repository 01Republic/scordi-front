import React, {memo} from 'react';
import Image from 'next/image';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {Sidebar} from '^components/Sidebar';
import {Icon} from '^components/Icon';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
import {OrgMembershipIndexPageRoute} from '^pages/orgs/[id]/memberships';
import {OrgShowRoute} from '^pages/orgs/[id]';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';
import {AiOutlineAppstoreAdd, AiOutlineDashboard, AiOutlineSetting} from 'react-icons/ai';

export const OrgSidebar = memo(() => {
    const {pathname} = useRouter();
    const organizationId = useRouterIdParamState('id', orgIdParamState);

    return (
        <Sidebar className="flex-shrink-0 bg-white">
            {/*<Sidebar.Title>{org.name}</Sidebar.Title>*/}
            <div className={'flex py-4 px-5 pt-7 pb-7'}>
                <Image
                    src="/logo-transparent.png"
                    alt="Scordi logo"
                    width={32}
                    height={32}
                    className="relative top-1 mr-1"
                />
                <div className="flex-1 px-2">
                    <a className="text-2xl font-bold" href={OrgHomeRoute.path(organizationId)}>
                        Scordi
                    </a>
                </div>
            </div>

            <Sidebar.Menu>
                <Sidebar.Menu.Item
                    text="feedback"
                    blankTo={'https://oh8kq2gqq3y.typeform.com/to/ZF4C5sTK'}
                    selected={false}
                    icon={() => <Icon.Send />}
                    iconTransform={false}
                />
                <hr />
                <Sidebar.Menu.Item
                    text="dashboard"
                    to={OrgHomeRoute.path(organizationId)}
                    selected={pathname === OrgHomeRoute.pathname}
                    icon={() => <AiOutlineDashboard size={24} />}
                />
                <Sidebar.Menu.Item
                    text="apps"
                    to={OrgAppsIndexPageRoute.path(organizationId)}
                    selected={pathname.startsWith(OrgAppsIndexPageRoute.pathname)}
                    icon={() => <AiOutlineAppstoreAdd size={24} />}
                    iconTransform={false}
                />
                <Sidebar.Menu.Item
                    text="people"
                    to={OrgMembershipIndexPageRoute.path(organizationId)}
                    selected={pathname.startsWith(OrgMembershipIndexPageRoute.pathname)}
                    icon={() => <Icon.User />}
                />
                <Sidebar.Menu.Item
                    text="settings"
                    to={OrgShowRoute.path(organizationId)}
                    selected={pathname === OrgShowRoute.pathname}
                    // icon={Icon2.Building}
                    icon={() => <AiOutlineSetting size={24} />}
                    iconTransform={false}
                />
            </Sidebar.Menu>
        </Sidebar>
    );
});
