import React, {ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {OrganizationDto} from '^types/organization.type';
import {useCurrentOrg} from '^hooks/useCurrentOrg';
import {isMobile} from 'react-device-detect';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {OrgSidebar} from './Sidebar';
import {OrgTopbar} from './Topbar';
import {OrgBar} from '^layouts/org/mainLayout/OrgBar';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {getMemberships} from '^api/membership.api';
import {useRecoilValue} from 'recoil';
import {currentUserAtom} from '^atoms/currentUser.atom';
import {UserLoginPageRoute} from '^pages/users/login';
import {ApprovalStatus, MembershipLevel} from '^types/membership.type';
import {PreLoader} from '^components/PreLoader';

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
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const currentUser = useRecoilValue(currentUserAtom); // should log in
    const [permitStatus, setPermitStatus] = useState<PermitStatus>(PermitStatus.CHECKING);

    useEffect(() => {
        if (!organizationId || isNaN(organizationId)) return;

        // 로그인이 안되어있으면 로그인 페이지로 이동.
        if (!currentUser) {
            router.push(UserLoginPageRoute.path());
            return;
        }

        const userId = currentUser.id;
        getMemberships({where: {userId, organizationId}})
            .then((res) => res.data.items[0])
            .then((currentOrgMembership) => {
                // 진입한 조직에 멤버십이 없으면, 되돌려보내기
                if (!currentOrgMembership) {
                    router.back();
                    return;
                }

                //- 진입한 조직에 멤버십을 가지고 있음.

                // 멤버십 레벨이 오너라면, PERMITTED
                if (currentOrgMembership.level === MembershipLevel.OWNER) {
                    setPermitStatus(PermitStatus.PERMITTED);
                    return;
                }

                //- 멤버십 레벨이 멤버인 사용자.

                // 멤버십이 승인된 상태라면, PERMITTED
                if (currentOrgMembership.approvalStatus === ApprovalStatus.APPROVED) {
                    setPermitStatus(PermitStatus.PERMITTED);
                    return;
                }

                // 멤버십이 거절된 상태라면, 되돌려보내기
                if (currentOrgMembership.approvalStatus === ApprovalStatus.REJECTED) {
                    router.back();
                }

                // 멤버십이 승인대기 상태라면, REJECTED
                setPermitStatus(PermitStatus.REJECTED);
                return;
            });
    }, [organizationId]);

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
                    <div className="flex-1 overflow-x-auto flex items-center justify-center">
                        <div className="text-center pb-5">
                            <p className="text-6xl mb-5 font-semibold">Oops</p>
                            <p className="text-2xl">Your membership has not yet been approved.</p>
                            <p className="py-10">{` `}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="drawer-side">
                <label htmlFor="drawer" className="drawer-overlay" />
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
