import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {MobileTopNav} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {SelectedStatusSection} from '^components/pages/OrgApplicationCreateFlow/SelectedStatusSection';
import {LeadMessageSection} from '^components/pages/OrgApplicationCreateFlow/LeadMessageSection';
import {t_BillingCycleTerm} from '^types/applicationBillingCycle.type';
import {useCreateFlow} from '^hooks/useApplicationPrototypes';
import {PreLoader} from '^components/PreLoader';
import {CreateAppForm} from '^components/pages/OrgApplicationCreateFlow/CreateAppForm';
import OrgMobileLayout from '^layouts/org/mobileLayout';

export const NewAppBillingHistoryPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/new/billingHistory',
    path: (orgId: number, protoId: number, planId: number, cycleId: number) =>
        pathReplace(
            `${NewAppBillingHistoryPageRoute.pathname}?prototypeId=[prototypeId]&planId=[planId]&cycleId=[cycleId]`,
            {
                id: orgId,
                prototypeId: protoId,
                planId,
                cycleId,
            },
        ),
});

export default function NewAppBillingHistoryPage() {
    const router = useRouter();
    const organizationId = Number(router.query.id) || null;
    const {prototype: proto, paymentPlan: plan, billingCycle: cycle} = useCreateFlow();

    const pageLoaded = !!organizationId && !!proto && !!plan && !!cycle;
    if (!pageLoaded) return <PreLoader />;

    return (
        <OrgMobileLayout>
            <MobileTopNav>
                <BackButton />
            </MobileTopNav>
            <SelectedStatusSection proto={proto} text={[plan.name, t_BillingCycleTerm(cycle.term, true)].join(' / ')} />
            <LeadMessageSection text="최근에 얼마나 결제 되셨어요?" />
            <CreateAppForm />
        </OrgMobileLayout>
    );
}
