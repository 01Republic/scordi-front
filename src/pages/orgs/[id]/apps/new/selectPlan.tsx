import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {MobileTopNav} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {PreLoader} from '^components/PreLoader';
import {useCreateFlow} from '^hooks/useProducts';
import {SubscriptionPaymentPlanDto} from '^models/Subscription/types/paymentPlanType';
import {SelectedStatusSection} from '^components/pages/OrgApplicationCreateFlow/SelectedStatusSection';
import {LeadMessageSection} from '^components/pages/OrgApplicationCreateFlow/LeadMessageSection';
import {MobileEntityListSection} from '^components/v2/MobileEntityListSection';
import {SelectCyclePageProps} from '^pages/orgs/[id]/apps/new/selectCycle';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import OrgMobileLayout from '^layouts/org/mobileLayout';

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
    const organizationId = Number(router.query.id);
    const {product} = useCreateFlow();

    const pageLoaded = !!organizationId && !!product;
    if (!pageLoaded) return <PreLoader />;

    const planOnClickHandler = (paymentPlan: SubscriptionPaymentPlanDto) => {
        router.push(SelectCyclePageProps.path(organizationId, product.id, paymentPlan.id));
    };

    return (
        <OrgMobileLayout>
            <MobileTopNav>
                <BackButton />
            </MobileTopNav>
            <SelectedStatusSection product={product} />
            <LeadMessageSection text="어느 플랜을 이용하고 계세요?" />
            <MobileEntityListSection
                listOfData={product.paymentPlans}
                itemOnClick={planOnClickHandler}
                itemChild={(paymentPlan) => paymentPlan.name}
            />
        </OrgMobileLayout>
    );
}

SelectPlanPage.getInitialProps = async () => ({});
