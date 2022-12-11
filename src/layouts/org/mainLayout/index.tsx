import {Sidebar} from '^components/Sidebar';
import {useRouter} from 'next/router';
import {OrganizationDto} from '^types/organization.type';
import {PreLoader} from '^components/PreLoader';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {AdminTopNav} from '^components/AdminHeader';
import React, {ReactElement, useEffect} from 'react';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
import {OrgMainLayoutFooter} from '^layouts/org/mainLayout/OrgMainLayoutFooter';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {Icon} from '^components/Icon';
import {isMobile} from 'react-device-detect';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import Image from 'next/image';
import {RecoilRoot, useRecoilState} from 'recoil';
import {currentUserAtom} from '^atoms/currentUser.atom';
import {getUserSession} from '^api/session.api';

interface OrgMainLayoutProps {
    org: OrganizationDto | null;
    children: any;
}

const OrgMainLayout = ({org, children}: OrgMainLayoutProps) => {
    const {pathname, push} = useRouter();
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    useEffect(() => {
        getUserSession().then((res) => setCurrentUser(res.data));
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar className="flex-shrink-0">
                {/*<Sidebar.Title>{org.name}</Sidebar.Title>*/}
                <div className={'flex py-5 px-2'}>
                    <Image
                        src="/logo-transparent.png"
                        alt="Scordi logo"
                        width={24}
                        height={24}
                        className="relative top-1 mr-1"
                    />
                    <div className="flex-1 px-2">
                        <a className="text-lg font-bold" href={OrgHomeRoute.path(currentUser?.orgId)}>
                            Scordi
                        </a>
                    </div>
                </div>

                <Sidebar.Menu>
                    <Sidebar.Menu.Item
                        text="대시보드"
                        to={OrgHomeRoute.path(currentUser?.orgId)}
                        selected={pathname === OrgHomeRoute.pathname}
                        icon={() => <Icon.Home />}
                    />
                    <Sidebar.Menu.Item
                        text="연동한 서비스"
                        to={OrgAppsIndexPageRoute.path(currentUser?.orgId)}
                        selected={pathname.startsWith(OrgAppsIndexPageRoute.pathname)}
                        icon={() => <Icon.Folder />}
                        iconTransform={false}
                    />
                    <Sidebar.Menu.Item
                        text="피드백 보내기"
                        blankTo={'https://oh8kq2gqq3y.typeform.com/to/ZF4C5sTK'}
                        selected={false}
                        icon={() => <Icon.Send />}
                        iconTransform={false}
                    />
                    {/*<Sidebar.Menu.Item*/}
                    {/*    text="멤버 관리"*/}
                    {/*    to={OrgMembershipIndexPageRoute.path(org.id)}*/}
                    {/*    selected={pathname.startsWith(OrgMembershipIndexPageRoute.pathname)}*/}
                    {/*    icon={() => <Icon.User />}*/}
                    {/*/>*/}
                    {/*<Sidebar.Menu.Item*/}
                    {/*    text="설정"*/}
                    {/*    to={OrgShowRoute.path(org.id)}*/}
                    {/*    selected={pathname === OrgShowRoute.pathname}*/}
                    {/*    // icon={Icon2.Building}*/}
                    {/*    icon={() => <Icon.Settings />}*/}
                    {/*    iconTransform={false}*/}
                    {/*/>*/}
                </Sidebar.Menu>
            </Sidebar>
            <div className="flex-1 overflow-x-auto">
                <AdminTopNav />
                {children}
                {/*<OrgMainLayoutFooter />*/}
            </div>
        </div>
    );
};

export function SidebarOrgHeader({orgName}: {orgName: string}) {
    return (
        <div className="flex items-center px-3">
            <div className="avatar placeholder inline-flex mr-2">
                <div className="bg-neutral-focus text-neutral-content rounded w-10">
                    <span className="font-bold">{`${orgName}`[0]}</span>
                </div>
            </div>
            <div className="flex-1 h-full">
                <p className="text-sm font-bold">{orgName}</p>
                <p className="text-xs text-gray-500">Free</p>
            </div>
        </div>
    );
}

function Container({children, ...props}: any) {
    return (
        <div className="container">
            <div className="flex px-6 md:px-10 lg:px-14">
                <div className="flex-1" />
                <div className="w-full md:w-5/6 lg:w-4/6 xl:w-3/6">{children}</div>
                <div className="flex-1" />
            </div>
        </div>
    );
}

function OrgProfile({currentOrg}: {currentOrg: OrganizationDto}) {
    return (
        <div className="container">
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
    );
}

OrgMainLayout.Container = Container;
OrgMainLayout.OrgProfile = OrgProfile;
export default OrgMainLayout;

export function getOrgMainLayout(page: ReactElement) {
    const router = useRouter();
    const {id: orgId} = router.query;
    const {currentOrg} = useCurrentOrg(Number(orgId));
    const org =
        currentOrg ||
        // currentUser?.organizations![0] ||
        ({} as OrganizationDto);

    const [mobileView, setMobileView] = React.useState(false);

    useEffect(() => {
        isMobile && setMobileView(true);
    }, [isMobile]);

    return (
        <>
            {mobileView ? (
                <OrgMobileLayout org={org}>{page}</OrgMobileLayout>
            ) : (
                <OrgMainLayout org={org}>{page}</OrgMainLayout>
            )}
        </>
    );
}
