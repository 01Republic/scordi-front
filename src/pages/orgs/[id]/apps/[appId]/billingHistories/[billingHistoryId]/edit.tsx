import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {MobileTopNav, MobileTopNavRight} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {BasicButton} from '^components/v2/ui/buttons/BasicButton';
import {TitleSection} from '^components/v2/TitleSection';
import {useApplication} from '^hooks/useApplications';
import {useBillingHistory} from '^hooks/useBillingHistories';
import {AppNameWithLogoBlock} from '^components/pages/OrgAppInfoPage/AppNameWithLogoBlock';
import {BillingHistoryEditForm} from '^components/v2/BillingHistoryEditPage/BillingHistoryEditForm';
import {applicationIdParamState, billingHistoryIdParamState, useRouterIdParamState} from '^atoms/common';

export const BillingHistoryEditPageRoute = pathRoute({
    pathname: '/orgs/[id]/apps/[appId]/billingHistories/[billingHistoryId]/edit',
    path: (orgId: number, appId: number, billingHistoryId: number) =>
        pathReplace(BillingHistoryEditPageRoute.pathname, {
            id: orgId,
            appId,
            billingHistoryId,
        }),
});

export default function BillingHistoryEditPage() {
    useRouterIdParamState('appId', applicationIdParamState);
    useRouterIdParamState('billingHistoryId', billingHistoryIdParamState);
    const application = useApplication();
    const billingHistory = useBillingHistory();

    if (!application || !billingHistory) return <></>;

    return (
        <BillingHistoryEditForm>
            <MobileTopNav>
                <BackButton text="취소" />
                <MobileTopNavRight>
                    <BasicButton type="submit" text="저장" size="sm" />
                </MobileTopNavRight>
            </MobileTopNav>

            <TitleSection.TopPadding />
            <TitleSection.Simple flex={false}>
                <AppNameWithLogoBlock prototype={application.prototype} />
            </TitleSection.Simple>
        </BillingHistoryEditForm>
    );
}

BillingHistoryEditPage.getLayout = getOrgMainLayout;
