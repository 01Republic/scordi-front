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
import {UserLoginPageRoute} from '^pages/users/login';
import {userSessionApi} from '^api/session.api';

type OrgMobileLayoutProps = {
    org?: OrganizationDto | null;
    children: any;
};

const OrgMobileLayout = ({children}: OrgMobileLayoutProps) => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const [userChecked, setUserChecked] = React.useState(false);

    useEffect(() => {
        userSessionApi
            .index()
            .then((res) => {
                setCurrentUser(res.data);
                setUserChecked(true);
            })
            .catch(() => window.location.assign(UserLoginPageRoute.pathname));
    }, [router.pathname]);

    // if (!org) return <PreLoader />;
    if (!userChecked) return <></>;

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                background: '#ededed',
            }}
        >
            <div className={'max-w-[600px] h-full bg-white mx-auto'}>
                {/*{router.pathname === OrgHomeRoute.pathname && <MobileTopBar org={org} />}*/}
                {children}
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

export default OrgMobileLayout;
