import React from 'react';
import {useRouter} from 'next/router';
import {PageRoute} from '^types/pageRoute.type';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {MobileTopNav} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {useCreateFlow} from '^hooks/useApplicationPrototypes';
import {PreLoader} from '^components/PreLoader';
import {SelectPlanPageRoute} from '^pages/orgs/[id]/apps/new/selectPlan';
import {SelectedStatusSection} from '^components/pages/OrgApplicationCreateFlow/SelectedStatusSection';
import {LeadMessageSection} from '^components/pages/OrgApplicationCreateFlow/LeadMessageSection';
import {ApplicationBillingCycleDto, t_BillingCycleTerm} from '^types/applicationBillingCycle.type';
import {MobileEntityListSection} from '^components/v2/MobileEntityListSection';
import {NewAppBillingHistoryPageRoute} from '^pages/orgs/[id]/apps/new/billingHistory';

export const SelectCyclePageProps: PageRoute = {
    pathname: '/orgs/[id]/apps/new/selectCycle',
    path: (orgId: number, protoId: number, planId: number) =>
        `${SelectCyclePageProps.pathname}?prototypeId=[prototypeId]&planId=[planId]`
            .replace('[id]', String(orgId))
            .replace('[prototypeId]', String(protoId))
            .replace('[planId]', String(planId)),
};

export default function SelectCyclePage() {
    const router = useRouter();
    const organizationId = Number(router.query.id) || null;
    const {prototype: proto, paymentPlan: plan} = useCreateFlow();

    const pageLoaded = !!organizationId && !!proto && !!plan;
    if (!pageLoaded) return <PreLoader />;

    const cycleOnClickHandler = (billingCycle: ApplicationBillingCycleDto) => {
        router.push(NewAppBillingHistoryPageRoute.path(organizationId, proto.id, plan.id, billingCycle.id));
    };

    return (
        <>
            <MobileTopNav>
                <BackButton href={SelectPlanPageRoute.path(organizationId, proto.id)} />
            </MobileTopNav>
            <SelectedStatusSection text={plan.name} />
            <LeadMessageSection text="결제 주기는 어떻게 되세요?" />
            <MobileEntityListSection
                listOfData={plan.billingCycles}
                itemOnClick={cycleOnClickHandler}
                itemChild={(billingCycle) => t_BillingCycleTerm(billingCycle.term)}
            />
        </>
    );
}

SelectCyclePage.getLayout = getOrgMainLayout;
