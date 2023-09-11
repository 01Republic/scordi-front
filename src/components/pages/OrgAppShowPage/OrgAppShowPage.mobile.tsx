import React, {memo, useEffect} from 'react';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {useRouter} from 'next/router';
import {OrgAppIndexPageRoute} from '^pages/orgs/[id]/apps';
import {MobileTopNav, MobileTopNavRight} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {Icon} from '^components/Icon';
import {EditButton} from '^components/v2/ui/buttons/EditButton';
import {DeleteButton} from '^components/v2/ui/buttons/DeleteButton';
import {AppInfoSection} from '^components/pages/OrgAppInfoPage/AppInfoSection';
import {AppBillingSummarySection} from '^components/pages/OrgAppInfoPage/AppBillingSummarySection';
import {AppBillingHistoryListSection} from '^components/pages/OrgAppInfoPage/AppBillingHistoryListSection';
import {NewBillingHistoryOnAppPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/new';
import {useCurrentSubscription} from '^hooks/useSubscriptions';
import {useSetRecoilState} from 'recoil';
import {subscriptionIdParamState} from '^atoms/common';
import {getBillingHistoriesParamsState} from '^atoms/billingHistories.atom';
import {OrgApplicationEditPageRoute} from '^pages/orgs/[id]/apps/[appId]/edit';

export const OrgAppShowPageMobile = memo(() => {
    //TODO : ApplicationDetailPage.mobile 로 수정해야 됨
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const productId = Number(router.query.appId);
    const {currentSubscription: subscription} = useCurrentSubscription();
    const setSubscriptionIdParam = useSetRecoilState(subscriptionIdParamState);
    const setBillingHistoriesQueryParam = useSetRecoilState(getBillingHistoriesParamsState);

    useEffect(() => {
        setSubscriptionIdParam(productId);
        setBillingHistoriesQueryParam({
            where: {subscriptionId: subscription?.id},
            order: {id: 'DESC'},
            itemsPerPage: 300,
        });
    }, [productId]);

    if (!subscription) return <></>;

    const {product, paymentPlan, billingCycle} = subscription;

    return (
        <OrgMobileLayout>
            <MobileTopNav>
                <BackButton href={OrgAppIndexPageRoute.path(organizationId)} />
                <MobileTopNavRight>
                    <EditButton href={OrgApplicationEditPageRoute.path(organizationId, productId)} />
                    <DeleteButton />
                </MobileTopNavRight>
            </MobileTopNav>

            <AppInfoSection />
            <AppBillingSummarySection />
            <AppBillingHistoryListSection />

            <MobileBottomNav>
                <MobileBottomNav.Item
                    href={NewBillingHistoryOnAppPageRoute.path(
                        organizationId,
                        productId,
                        product.id,
                        paymentPlan?.id || 0,
                        billingCycle?.id || 0,
                    )}
                    icon={<Icon.Plus />}
                />
            </MobileBottomNav>
        </OrgMobileLayout>
    );
});
