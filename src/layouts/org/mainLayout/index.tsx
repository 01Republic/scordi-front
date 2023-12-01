import React, {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {OrganizationDto} from '^models/Organization/type';
import {useCurrentOrg} from '^models/Organization/hook';
import {isMobile} from 'react-device-detect';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {OrgSidebar} from './Sidebar';
import {OrgTopbar} from './Topbar';
import {OrgBar} from '^layouts/org/mainLayout/OrgBar';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {ApprovalStatus, MembershipLevel} from 'src/models/Membership/types';
import {PreLoader} from '^components/PreLoader';
import {useCurrentUser} from '^models/User/hook';
import {WebPush2} from '^components/webPush/WebPush2';

interface OrgMainLayoutProps {
    org?: OrganizationDto | undefined;
    children: any;
}

enum PermitStatus {
    CHECKING,
    PERMITTED,
    REJECTED,
}

const OrgMainLayout = ({children}: OrgMainLayoutProps) => {
    const router = useRouter();
    useRouterIdParamState('id', orgIdParamState);
    const {currentUserMembership} = useCurrentUser();
    const [permitStatus, setPermitStatus] = useState<PermitStatus>(PermitStatus.CHECKING);

    useEffect(() => {
        // 진입한 조직에 멤버십이 없으면, 되돌려보내기
        if (currentUserMembership === undefined) {
            // loaded but not found.
            router.back();
            return;
        }

        if (currentUserMembership === null) return; // not loaded.
        if (!currentUserMembership) return; // other unavailable cases.

        // 멤버십 레벨이 오너라면, PERMITTED
        if (currentUserMembership.level === MembershipLevel.OWNER) {
            setPermitStatus(PermitStatus.PERMITTED);
            return;
        }

        //- 멤버십 레벨이 멤버인 사용자.

        // 멤버십이 승인된 상태라면, PERMITTED
        if (currentUserMembership.approvalStatus === ApprovalStatus.APPROVED) {
            setPermitStatus(PermitStatus.PERMITTED);
            return;
        }

        // 멤버십이 거절된 상태라면, 되돌려보내기
        if (currentUserMembership.approvalStatus === ApprovalStatus.REJECTED) {
            router.back();
            return;
        }

        // 멤버십이 승인대기 상태라면, REJECTED
        setPermitStatus(PermitStatus.REJECTED);
        return;
    }, [currentUserMembership]);

    return (
        <div className="h-screen drawer drawer-end">
            <input id="drawer" type="checkbox" className="drawer-toggle" />

            {permitStatus === PermitStatus.CHECKING && <PreLoader screenSize={true} />}

            {permitStatus === PermitStatus.PERMITTED && (
                <div className="flex h-screen drawer-content">
                    <div className="flex">
                        <OrgBar />
                        <OrgSidebar />
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <OrgTopbar />
                        {children}
                        {/*<OrgFooter />*/}
                    </div>
                </div>
            )}

            {permitStatus === PermitStatus.REJECTED && (
                <div className="flex h-screen drawer-content">
                    <div className="flex">
                        <OrgBar />
                        <OrgSidebar />
                    </div>
                    <div className="flex-1 overflow-x-auto flex flex-col">
                        <OrgTopbar />
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center pb-5">
                                <p className="text-6xl mb-5 font-semibold">Oops</p>
                                <p className="text-2xl">Your membership has not yet been approved.</p>
                                <p className="py-10">{` `}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="drawer-side">
                <label htmlFor="drawer" className="drawer-overlay" />
            </div>

            <WebPush2 />
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
