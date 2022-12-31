import {OrganizationDto} from '^types/organization.type';
import {PreLoader} from '^components/PreLoader';
import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {Icon} from '^components/Icon';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {UserSettingsPageRoute} from '^pages/users/settings';
import {AppSearchPageRoute} from '^pages/apps/search';
import Image from 'next/image';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {useRecoilState} from 'recoil';
import {currentUserAtom} from '^atoms/currentUser.atom';
import {getUserSession} from '^api/session.api';
import {UserLoginPageRoute} from '^pages/users/login';

type OrgMobileLayoutProps = {
    org: OrganizationDto | null;
    children: any;
};

const OrgMobileLayout = ({org, children}: OrgMobileLayoutProps) => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    useEffect(() => {
        getUserSession()
            .then((res) => setCurrentUser(res.data))
            .catch(() => router.replace(UserLoginPageRoute.pathname));
    }, [router.pathname]);

    if (!org) return <PreLoader />;
    return (
        <div className={'max-w-[600px] m-auto'}>
            {router.pathname === OrgHomeRoute.pathname && <MobileTopBar org={org} />}
            {children}
            <div
                className={
                    'flex fixed bg-white bottom-0 w-full max-w-[600px] border border-l-0 border-r-0 border-t-1 items-center p-[22px] justify-center space-x-20'
                }
            >
                <MobileNavItem href={OrgHomeRoute.path(currentUser?.orgId)} icon={<Icon.Home />} />
                <MobileNavItem href={AppSearchPageRoute.path(org.id)} icon={<Icon.Plus />} />
                <MobileNavItem outHref={'https://oh8kq2gqq3y.typeform.com/to/ZF4C5sTK'} icon={<Icon.Send />} />
                <MobileNavItem href={UserSettingsPageRoute.pathname} icon={<Icon.User />} />
            </div>
        </div>
    );
};

type MobileTopBarProps = {
    org: OrganizationDto;
};

const MobileTopBar = (props: MobileTopBarProps) => {
    const router = useRouter();

    return (
        <div className={'flex sticky top-0 bg-white justify-between p-[20px] border-b'}>
            <div className={'flex'}>
                <a href={OrgHomeRoute.path(props.org.id)} className={'flex'}>
                    {/*<Icon.Star />*/}
                    <Image
                        src="/logo-transparent.png"
                        alt="Scordi logo"
                        width={24}
                        height={24}
                        className="relative top-1 mr-1"
                    />
                    <p className={'text-[21px] ml-2 relative font-bold'} style={{top: 1}}>
                        Scordi
                    </p>
                </a>
            </div>
            <div className={'flex space-x-4'}>
                {/*<Icon.Bell />*/}
                <Icon.User onClick={() => router.push(UserSettingsPageRoute.pathname)} />
            </div>
        </div>
    );
};

type MobileNavItemProps = {
    icon: any;
    href?: string;
    outHref?: string;
};

const MobileNavItem = (props: MobileNavItemProps) => {
    const router = useRouter();

    // TODO: 주소 따라서 아이콘 색상 바꿔주기

    return (
        <Link href={props.href || props.outHref || ''} target={props.outHref ? '_blank' : ''}>
            {props.icon}
        </Link>
    );
};

export default OrgMobileLayout;
