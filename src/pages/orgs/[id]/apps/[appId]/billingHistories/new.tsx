import {MobileViewContainer} from '^components/MobileTopNav';
import {SummaryListItem} from '^components/summaryListItem';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {getAppsBillingHistory} from '^api/billing.api';
import {useRouter} from 'next/router';
import {errorNotify} from '^utils/toast-notify';
import {BillingHistoryDto} from '^types/billing.type';
import {SubscriptionDto} from '^types/subscription.type';
import {getSubscription} from '^api/subscription.api';
import {intlDateLong} from '^utils/dateTime';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {useCurrentSubscription} from '^hooks/useSubscriptions';
import {PreLoader} from '^components/PreLoader';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {MobileTopNav} from '^components/v2/MobileTopNav';
import {t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {SelectedStatusSection} from '^components/pages/OrgApplicationCreateFlow/SelectedStatusSection';
import {LeadMessageSection} from '^components/pages/OrgApplicationCreateFlow/LeadMessageSection';
import {CreateBillingHistoryForm} from '^components/pages/NewBillingHistoryOnAppPage/CreateBillingHistoryForm';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useSetRecoilState} from 'recoil';
import {subscriptionIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import OrgMobileLayout from '^layouts/org/mobileLayout';

export const NewBillingHistoryOnAppPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/[appId]/billingHistories/new',
    path: (orgId: number, appId: number, protoId: number, planId: number, cycleId: number) =>
        pathReplace(
            `${NewBillingHistoryOnAppPageRoute.pathname}?prototypeId=[prototypeId]&planId=[planId]&cycleId=[cycleId]`,
            {
                id: orgId,
                appId,
                prototypeId: protoId,
                planId,
                cycleId,
            },
        ),
});

export default function NewBillingHistoryOnAppPage() {
    useRouterIdParamState('id', orgIdParamState);
    useRouterIdParamState('appId', subscriptionIdParamState);
    const {currentApplication: application} = useCurrentSubscription();

    if (!application) return <PreLoader />;

    const {product: proto, paymentPlan: plan, billingCycle: cycle} = application;

    return (
        <OrgMobileLayout>
            <MobileTopNav>
                <BackButton />
            </MobileTopNav>
            <SelectedStatusSection
                proto={proto}
                text={[plan?.name || '-', cycle ? t_BillingCycleTerm(cycle.term, true) : '-'].join(' / ')}
            />
            <LeadMessageSection text="새로운 결제가 있나요?" />
            <CreateBillingHistoryForm />
        </OrgMobileLayout>
    );
}

NewBillingHistoryOnAppPage.getInitialProps = async () => ({});

// export default function NewBillingHistoryOnAppPage() {
//     const router = useRouter();
//     const appId = Number(router.query.appId);
//     const [billingHistory, setBillingHistory] = useState<BillingHistoryDto[]>([]);
//     const [appInfo, setAppInfo] = useState<SubscriptionDto | undefined>(undefined);
//
//     useEffect(() => {
//         if (isNaN(appId)) return;
//         getSubscription(appId)
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
// }
//
// NewBillingHistoryOnAppPage.getLayout = getOrgMainLayout;
