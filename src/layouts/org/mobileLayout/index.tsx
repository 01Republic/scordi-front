import {OrganizationDto} from "^types/organizationTypes";
import {PreLoader} from "^components/PreLoader";
import React, {ReactElement} from "react";
import {useRouter} from "next/router";
import {useCurrentUser} from "^hooks/useCurrentUser";
import {useCurrentOrg} from "^hooks/useCurrentOrg";
import {isMobile} from "react-device-detect";
import OrgMainLayout from "^layouts/org/mainLayout";
import Link from "next/link";
import { Icon } from "^components/Icon";
import {OrgHomeRoute} from "^pages/orgs/[id]/home";

type OrgMobileLayoutProps = {
    org: OrganizationDto | null;
    children: any;
}

const OrgMobileLayout = ({org, children}: OrgMobileLayoutProps) => {
    const { pathname, push } = useRouter();

    if (!org) return <PreLoader />;
    return (
        <div>
            <div className={'flex justify-between'}>
                <div>
                    <p>{org.name}</p>
                </div>
                <div className={'flex fixed bottom-0 w-full border border-t-1 items-center p-[22px] justify-center space-x-20'}>
                    {/* TODO: 아이콘 나중에 바꿀 것 */}
                    <MobileNavItem href={OrgHomeRoute.path(org.id)} icon={<Icon.Home/>}/>
                    <MobileNavItem href={OrgHomeRoute.path(org.id)} icon={<Icon.Plus/>}/>
                    <MobileNavItem href={OrgHomeRoute.path(org.id)} icon={<Icon.User/>}/>
                </div>
            </div>
            {children}
        </div>
    )
}

type MobileNavItemProps = {
    icon: any;
    href: string;
}

const MobileNavItem = (props: MobileNavItemProps) => {
    return (
        <Link href={props.href}>
            {props.icon}
        </Link>
    )
}

export default OrgMobileLayout;