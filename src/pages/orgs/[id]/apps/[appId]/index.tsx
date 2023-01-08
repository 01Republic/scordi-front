// import {MobileTopNav, MobileViewContainer} from '^components/MobileTopNav';
// import {SummaryListItem} from '^components/summaryListItem';
// import Image from 'next/image';
// import {useEffect, useState} from 'react';
// import {getAppsBillingHistory} from '^api/billing.api';
// import {useRouter} from 'next/router';
// import {errorNotify} from '^utils/toast-notify';
// import {BillingHistoryDto} from '^types/billing.type';
// import {ApplicationDto} from '^types/application.type';
// import {getApplication} from '^api/application.api';
// import {intlDateLong} from '^utils/dateTime';
// import {getOrgMainLayout} from '^layouts/org/mainLayout';
//
// export const AppInfoPageRoute = {
//     pathname: '/orgs/:id/apps/:appId',
//     path: (id: string, appId: string) => AppInfoPageRoute.pathname.replace(':id', id).replace(':appId', appId),
// };
//
// const AppInfoPage = () => {
//     const router = useRouter();
//     const appId = Number(router.query.appId);
//     const [billingHistory, setBillingHistory] = useState<BillingHistoryDto[]>([]);
//     const [appInfo, setAppInfo] = useState<ApplicationDto | undefined>(undefined);
//
//     useEffect(() => {
//         if (isNaN(appId)) return;
//         getApplication(appId)
//             .then((res) => setAppInfo(res.data))
//             .catch((err) => errorNotify(err));
//         getAppsBillingHistory(appId)
//             .then((res) => setBillingHistory(res.data.items))
//             .catch((err) => errorNotify(err));
//     }, [appId]);
//
//     if (!appInfo) return;
//     return (
//         <>
//             <MobileTopNav title={'구독 정보'} />
//             <MobileViewContainer>
//                 <Image src={appInfo.prototype.image} width={80} height={80} />
//                 <h2 className={'my-[20px]'}>{appInfo.prototype.name}</h2>
//                 <p>구독시작일 : {intlDateLong(appInfo.registeredAt)}</p>
//                 <h2 className={'mt-[40px]'}>구독 내역</h2>
//                 {billingHistory.length === 0 && (
//                     <div className={'text-center py-10'}>
//                         <p>구독 내역이 없습니다</p>
//                     </div>
//                 )}
//                 {billingHistory.map((item, index) => (
//                     <SummaryListItem key={index} title={intlDateLong(item.paidAt)} value={`USD ${item.paidAmount}`} />
//                 ))}
//             </MobileViewContainer>
//         </>
//     );
// };
//
// AppInfoPage.getLayout = getOrgMainLayout;
// export default AppInfoPage;

import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {MobileTopNav, MobileTopNavRight} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {Icon} from '^components/Icon';
import {EditButton} from '^components/v2/ui/buttons/EditButton';
import {DeleteButton} from '^components/v2/ui/buttons/DeleteButton';
import {AppInfoSection} from '^components/pages/OrgAppInfoPage/AppInfoSection';
import {AppBillingSummarySection} from '^components/pages/OrgAppInfoPage/AppBillingSummarySection';
import {AppBillingHistoryListSection} from '^components/pages/OrgAppInfoPage/AppBillingHistoryListSection';
import {NewBillingHistoryOnAppPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/new';
import {useApplication} from '^hooks/useApplications';
import {useSetRecoilState} from 'recoil';
import {applicationIdParamState} from '^atoms/common';
import {getBillingHistoriesParamsState} from '^atoms/billingHistories.atom';

export const AppInfoPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/[appId]',
    path: (orgId: number, appId: number) => pathReplace(AppInfoPageRoute.pathname, {id: orgId, appId}),
});

export default function AppInfoPage() {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const applicationId = Number(router.query.appId);
    const application = useApplication();
    const setApplicationIdParam = useSetRecoilState(applicationIdParamState);
    const setBillingHistoriesQueryParam = useSetRecoilState(getBillingHistoriesParamsState);

    useEffect(() => {
        setApplicationIdParam(applicationId);
        setBillingHistoriesQueryParam({
            where: {applicationId},
            order: {id: 'DESC'},
            itemsPerPage: 300,
        });
    }, [applicationId]);

    if (!application) return <></>;

    const {prototype, paymentPlan, billingCycle} = application;

    return (
        <>
            <MobileTopNav>
                <BackButton href={OrgAppsIndexPageRoute.path(organizationId)} />
                <MobileTopNavRight>
                    <EditButton />
                    <DeleteButton />
                </MobileTopNavRight>
            </MobileTopNav>

            <AppInfoSection />
            <AppBillingSummarySection />
            <AppBillingHistoryListSection />

            <MobileBottomNav>
                <MobileBottomNav.Item
                    href={NewBillingHistoryOnAppPageRoute.path(
                        organizationId,
                        applicationId,
                        prototype.id,
                        paymentPlan.id,
                        billingCycle.id,
                    )}
                    icon={<Icon.Plus />}
                />
            </MobileBottomNav>
        </>
    );
}

AppInfoPage.getLayout = getOrgMainLayout;
