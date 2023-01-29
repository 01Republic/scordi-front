import React, {ReactElement, useEffect} from 'react';
import {useRouter} from 'next/router';
import {OrganizationDto} from '^types/organization.type';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {isMobile} from 'react-device-detect';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {OrgSidebar} from './Sidebar';
import {OrgTopbar} from './Topbar';

interface OrgMainLayoutProps {
    org?: OrganizationDto | undefined;
    children: any;
}

const OrgMainLayout = ({children}: OrgMainLayoutProps) => {
    return (
        <div className="flex h-screen">
            <OrgSidebar />

            <div className="flex-1 overflow-x-auto">
                <OrgTopbar />
                {children}
                {/*<OrgFooter />*/}
            </div>
        </div>
    );
};

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

OrgMainLayout.Container = Container;
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
        isMobile && setMobileView(isMobile);
    }, [isMobile]);

    return (
        <>
            {/*<OrgMobileLayout org={org}>{page}</OrgMobileLayout>*/}
            {mobileView ? <OrgMobileLayout>{page}</OrgMobileLayout> : <OrgMainLayout>{page}</OrgMainLayout>}
        </>
    );
}
