import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {MobileTopNav} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {useCreateFlow} from '^hooks/useProducts';
import {PreLoader} from '^components/PreLoader';
import {SelectedStatusSection} from '^components/pages/OrgApplicationCreateFlow/SelectedStatusSection';
import {LeadMessageSection} from '^components/pages/OrgApplicationCreateFlow/LeadMessageSection';
import {SubscriptionBillingCycleDto, t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {MobileEntityListSection} from '^components/v2/MobileEntityListSection';
import {NewAppBillingHistoryPageRoute} from '^pages/orgs/[id]/apps/new/billingHistory';
import OrgMobileLayout from '^layouts/org/mobileLayout';

export const SelectCyclePageProps = pathRoute({
    pathname: '/orgs/[id]/apps/new/selectCycle',
    path: (orgId: number, protoId: number, planId: number) =>
        pathReplace(`${SelectCyclePageProps.pathname}?prototypeId=[prototypeId]&planId=[planId]`, {
            id: orgId,
            prototypeId: protoId,
            planId,
        }),
});

export default function SelectCyclePage() {
    const router = useRouter();
    const organizationId = Number(router.query.id) || null;
    const {prototype: proto, paymentPlan: plan} = useCreateFlow();

    const pageLoaded = !!organizationId && !!proto && !!plan;
    if (!pageLoaded) return <PreLoader />;

    const cycleOnClickHandler = (billingCycle: SubscriptionBillingCycleDto) => {
        router.push(NewAppBillingHistoryPageRoute.path(organizationId, proto.id, plan.id, billingCycle.id));
    };

    return (
        <OrgMobileLayout>
            <MobileTopNav>
                <BackButton />
            </MobileTopNav>
            <SelectedStatusSection proto={proto} text={plan.name} />
            <LeadMessageSection text="결제 주기는 어떻게 되세요?" />
            <MobileEntityListSection
                listOfData={plan.billingCycles}
                itemOnClick={cycleOnClickHandler}
                itemChild={(billingCycle) => t_BillingCycleTerm(billingCycle.term)}
            />
        </OrgMobileLayout>
    );
}

SelectCyclePage.getInitialProps = async () => ({});
