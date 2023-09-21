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
import {useCurrentSubscription} from '^hooks/useSubscriptions';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {NewBillingHistoryOnAppPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/new';
import {Icon} from '^components/Icon';
import {BillingHistoryEditPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/[billingHistoryId]/edit';
import {useSetRecoilState} from 'recoil';
import {
    subscriptionIdParamState,
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
    const subscriptionId = useRouterIdParamState('appId', subscriptionIdParamState);
    const billingHistoryId = useRouterIdParamState('billingHistoryId', billingHistoryIdParamState);
    const {currentSubscription: subscription} = useCurrentSubscription();
    const setBillingHistoriesQueryParam = useSetRecoilState(getBillingHistoriesParamsState);

    useEffect(() => {
        // setSubscriptionIdParam(subscriptionId);
        if (!subscriptionId || isNaN(subscriptionId)) return;
        setBillingHistoriesQueryParam({
            where: {subscriptionId},
            order: {id: 'DESC'},
            itemsPerPage: 300,
        });
    }, [subscriptionId]);

    if (!subscription) return <></>;
    const editPath = BillingHistoryEditPageRoute.path(organizationId, subscriptionId, billingHistoryId);

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
                        subscriptionId,
                        subscription.productId,
                        subscription.paymentPlanId || 0,
                        subscription.billingCycleId || 0,
                    )}
                    icon={<Icon.Plus />}
                />
            </MobileBottomNav>
        </OrgMobileLayout>
    );
}

BillingHistoryShowPage.getInitialProps = async () => ({});
