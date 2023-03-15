import React, {useEffect} from 'react';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {MobileTopNav, MobileTopNavRight} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {EditButton} from '^components/v2/ui/buttons/EditButton';
import {DeleteButton} from '^components/v2/ui/buttons/DeleteButton';
import {BillingHistoryInfoSection} from '^components/pages/BillingHistoryShowPage/BillingHistoryInfoSection';
import {AppBillingSummarySection} from '^components/pages/OrgAppInfoPage/AppBillingSummarySection';
import {AppBillingHistoryListSection} from '^components/pages/OrgAppInfoPage/AppBillingHistoryListSection';
import {useCurrentApplication} from '^hooks/useApplications';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {NewBillingHistoryOnAppPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/new';
import {Icon} from '^components/Icon';
import {BillingHistoryEditPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/[billingHistoryId]/edit';
import {useSetRecoilState} from 'recoil';
import {
    applicationIdParamState,
    billingHistoryIdParamState,
    orgIdParamState,
    useRouterIdParamState,
} from '^atoms/common';
import {getBillingHistoriesParamsState} from '^atoms/billingHistories.atom';
import OrgMobileLayout from '^layouts/org/mobileLayout';

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
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const applicationId = useRouterIdParamState('appId', applicationIdParamState);
    const billingHistoryId = useRouterIdParamState('billingHistoryId', billingHistoryIdParamState);
    const {currentApplication: application} = useCurrentApplication();
    const setBillingHistoriesQueryParam = useSetRecoilState(getBillingHistoriesParamsState);

    useEffect(() => {
        // setApplicationIdParam(applicationId);
        if (!applicationId || isNaN(applicationId)) return;
        setBillingHistoriesQueryParam({
            where: {applicationId},
            order: {id: 'DESC'},
            itemsPerPage: 300,
        });
    }, [applicationId]);

    if (!application) return <></>;
    const editPath = BillingHistoryEditPageRoute.path(organizationId, applicationId, billingHistoryId);

    return (
        <OrgMobileLayout>
            <MobileTopNav>
                <BackButton />
                <MobileTopNavRight>
                    <EditButton href={editPath} />
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
                        application.prototypeId,
                        application.paymentPlanId || 0,
                        application.billingCycleId || 0,
                    )}
                    icon={<Icon.Plus />}
                />
            </MobileBottomNav>
        </OrgMobileLayout>
    );
}

BillingHistoryShowPage.getInitialProps = async () => ({});
