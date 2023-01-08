import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {MobileTopNav, MobileTopNavRight} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {EditButton} from '^components/v2/ui/buttons/EditButton';
import {DeleteButton} from '^components/v2/ui/buttons/DeleteButton';
import {BillingHistoryInfoSection} from '^components/pages/BillingHistoryShowPage/BillingHistoryInfoSection';
import {AppBillingSummarySection} from '^components/pages/OrgAppInfoPage/AppBillingSummarySection';
import {AppBillingHistoryListSection} from '^components/pages/OrgAppInfoPage/AppBillingHistoryListSection';
import {useApplication} from '^hooks/useApplications';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {NewBillingHistoryOnAppPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/new';
import {Icon} from '^components/Icon';
import {BillingHistoryEditPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/[billingHistoryId]/edit';
import {useSetRecoilState} from 'recoil';
import {applicationIdParamState, billingHistoryIdParamState} from '^atoms/common';
import {getBillingHistoriesParamsState} from '^atoms/billingHistories.atom';

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
    const organizationId = Number(router.query.id);
    const applicationId = Number(router.query.appId);
    const billingHistoryId = Number(router.query.billingHistoryId);
    const application = useApplication();
    const setApplicationIdParam = useSetRecoilState(applicationIdParamState);
    const setBillingHistoryIdParam = useSetRecoilState(billingHistoryIdParamState);
    const setBillingHistoriesQueryParam = useSetRecoilState(getBillingHistoriesParamsState);

    useEffect(() => {
        setApplicationIdParam(applicationId);
        setBillingHistoriesQueryParam({
            where: {applicationId},
            order: {id: 'DESC'},
            itemsPerPage: 300,
        });
    }, [applicationId]);

    useEffect(() => {
        setBillingHistoryIdParam(billingHistoryId);
    }, [billingHistoryId]);

    if (!application) return <></>;
    const editPath = BillingHistoryEditPageRoute.path(organizationId, applicationId, billingHistoryId);

    return (
        <>
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
                        application.paymentPlanId,
                        application.billingCycleId,
                    )}
                    icon={<Icon.Plus />}
                />
            </MobileBottomNav>
        </>
    );
}

BillingHistoryShowPage.getLayout = getOrgMainLayout;
