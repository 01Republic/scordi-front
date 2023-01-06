import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {MobileTopNav} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {PreLoader} from '^components/PreLoader';
import {useCreateFlow} from '^hooks/useApplicationPrototypes';
import {ApplicationPaymentPlanDto} from '^types/applicationPaymentPlan.type';
import {SelectedStatusSection} from '^components/pages/OrgApplicationCreateFlow/SelectedStatusSection';
import {LeadMessageSection} from '^components/pages/OrgApplicationCreateFlow/LeadMessageSection';
import {MobileEntityListSection} from '^components/v2/MobileEntityListSection';
import {SelectCyclePageProps} from '^pages/orgs/[id]/apps/new/selectCycle';
import {getOrgMainLayout} from '^layouts/org/mainLayout';

export const SelectPlanPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/new/selectPlan',
    path: (orgId: number, protoId: number) =>
        pathReplace(`${SelectPlanPageRoute.pathname}?prototypeId=[prototypeId]`, {
            id: orgId,
            prototypeId: protoId,
        }),
});

export default function SelectPlanPage() {
    const router = useRouter();
    const organizationId = Number(router.query.id) || null;
    const {prototype: proto} = useCreateFlow();

    const pageLoaded = !!organizationId && !!proto;
    if (!pageLoaded) return <PreLoader />;

    const planOnClickHandler = (paymentPlan: ApplicationPaymentPlanDto) => {
        router.push(SelectCyclePageProps.path(organizationId, proto.id, paymentPlan.id));
    };

    console.log(proto);

    return (
        <>
            <MobileTopNav>
                <BackButton />
            </MobileTopNav>
            <SelectedStatusSection proto={proto} />
            <LeadMessageSection text="어느 플랜을 이용하고 계세요?" />
            <MobileEntityListSection
                listOfData={proto.paymentPlans}
                itemOnClick={planOnClickHandler}
                itemChild={(paymentPlan) => paymentPlan.name}
            />
        </>
    );
}

SelectPlanPage.getLayout = getOrgMainLayout;
