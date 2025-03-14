import React, {useEffect} from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {MobileTopNav, MobileTopNavRight} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {TitleSection} from '^components/v2/TitleSection';
import {useCurrentSubscription} from '^models/Subscription/hook';
import {useBillingHistory} from '^models/BillingHistory/hook';
import {AppNameWithLogoBlock} from '^components/pages/OrgAppInfoPage/AppNameWithLogoBlock';
import {subscriptionIdParamState, billingHistoryIdParamState, useRouterIdParamState} from '^atoms/common';
import {BillingHistoryEditForm} from '^components/pages/BillingHistoryEditPage/BillingHistoryEditForm';
import {BillingHistoryAmountInputBlock} from '^components/pages/BillingHistoryEditPage/BillingHistoryAmountInputBlock';
import {useForm} from 'react-hook-form';
import {BillingHistoryInputsBlock} from '^components/pages/BillingHistoryEditPage/BillingHistoryInputsBlock';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {CTAButton} from '^components/v2/ui/buttons/CTAButton';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {UpdateBillingHistoryRequestDto} from '^models/BillingHistory/type';

export const BillingHistoryEditPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/[subscriptionId]/billingHistories/[billingHistoryId]/edit',
    path: (orgId: number, subscriptionId: number, billingHistoryId: number) =>
        pathReplace(BillingHistoryEditPageRoute.pathname, {
            id: orgId,
            subscriptionId,
            billingHistoryId,
        }),
});

export default function BillingHistoryEditPage() {
    useRouterIdParamState('subscriptionId', subscriptionIdParamState);
    useRouterIdParamState('billingHistoryId', billingHistoryIdParamState);
    const {currentSubscription: subscription} = useCurrentSubscription();
    const billingHistory = useBillingHistory();
    const form = useForm<UpdateBillingHistoryRequestDto>();

    if (!subscription || !billingHistory) return <></>;

    return (
        <OrgMobileLayout>
            <BillingHistoryEditForm form={form}>
                <MobileTopNav>
                    <BackButton text="취소" />
                </MobileTopNav>

                <TitleSection.TopPadding />
                <TitleSection.Simple flex={false}>
                    <AppNameWithLogoBlock product={subscription.product} />
                    <BillingHistoryAmountInputBlock form={form} />
                </TitleSection.Simple>

                <BillingHistoryInputsBlock form={form} />

                <MobileBottomNav>
                    <CTAButton type="submit" text="저장" />
                </MobileBottomNav>
            </BillingHistoryEditForm>
        </OrgMobileLayout>
    );
}

BillingHistoryEditPage.getInitialProps = async () => ({});
