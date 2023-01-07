import React from 'react';
import {useRouter} from 'next/router';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {MobileTopNav, MobileTopNavRight} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {AppInfoPageRoute} from '^pages/orgs/[id]/apps/[appId]';
import {EditButton} from '^components/v2/ui/buttons/EditButton';
import {DeleteButton} from '^components/v2/ui/buttons/DeleteButton';
import {BillingHistoryInfoSection} from '^components/pages/BillingHistoryShowPage/BillingHistoryInfoSection';
import {BillingHistoryAmountInfoBlock} from '^components/pages/BillingHistoryShowPage/BillingHistoryAmountInfoBlock';
import {AppBillingSummarySection} from '^components/pages/OrgAppInfoPage/AppBillingSummarySection';
import {AppBillingHistoryListSection} from '^components/pages/OrgAppInfoPage/AppBillingHistoryListSection';
import {useApplication} from '^hooks/useApplications';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {NewBillingHistoryOnAppPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/new';
import {Icon} from '^components/Icon';

export const BillingHistoryShowPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/[appId]/billingHistories/[billingHistoryId]',
    path: (orgId: number, appId: number, billingHistoryId: number) =>
        pathReplace(BillingHistoryShowPageRoute.pathname, {
            id: orgId,
            appId,
            billingHistoryId,
        }),
});

export default function BillingHistoryShowPage() {
    const router = useRouter();
    const organizationId = Number(router.query.id) || null;
    const applicationId = Number(router.query.appId) || null;
    const billingHistoryId = Number(router.query.billingHistoryId) || null;
    const {application} = useApplication(applicationId);
    const {prototype, paymentPlan, billingCycle} = application || {};

    const pageLoaded = organizationId && applicationId && billingHistoryId;
    if (!pageLoaded) return <></>;
    if (!prototype || !paymentPlan || !billingCycle) return <></>;

    return (
        <>
            <MobileTopNav>
                <BackButton />
                <MobileTopNavRight>
                    <EditButton />
                    <DeleteButton />
                </MobileTopNavRight>
            </MobileTopNav>

            <BillingHistoryInfoSection />
            <AppBillingSummarySection />
            <AppBillingHistoryListSection onClickMethod="replace" />

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

BillingHistoryShowPage.getLayout = getOrgMainLayout;
