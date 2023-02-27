import React, {memo, useEffect} from 'react';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {useRouter} from 'next/router';
import {OrgAppsIndexPageRoute} from '^pages/orgs/[id]/apps';
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
import {useApplication} from '^hooks/useApplications';
import {useSetRecoilState} from 'recoil';
import {applicationIdParamState} from '^atoms/common';
import {getBillingHistoriesParamsState} from '^atoms/billingHistories.atom';
import {OrgApplicationEditPageRoute} from '^pages/orgs/[id]/apps/[appId]/edit';

export const ApplicationDetailPageMobile = memo(() => {
    //TODO : ApplicationDetailPage.mobile 로 수정해야 됨
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const applicationId = Number(router.query.appId);
    const application = useApplication();
    const setApplicationIdParam = useSetRecoilState(applicationIdParamState);
    const setBillingHistoriesQueryParam = useSetRecoilState(getBillingHistoriesParamsState);

    useEffect(() => {
        setApplicationIdParam(applicationId);
        setBillingHistoriesQueryParam({
            where: {applicationId},
            order: {id: 'DESC'},
            itemsPerPage: 300,
        });
    }, [applicationId]);

    if (!application) return <></>;

    const {prototype, paymentPlan, billingCycle} = application;

    return (
        <OrgMobileLayout>
            <MobileTopNav>
                <BackButton href={OrgAppsIndexPageRoute.path(organizationId)} />
                <MobileTopNavRight>
                    <EditButton href={OrgApplicationEditPageRoute.path(organizationId, applicationId)} />
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
                        applicationId,
                        prototype.id,
                        paymentPlan.id,
                        billingCycle.id,
                    )}
                    icon={<Icon.Plus />}
                />
            </MobileBottomNav>
        </OrgMobileLayout>
    );
});
