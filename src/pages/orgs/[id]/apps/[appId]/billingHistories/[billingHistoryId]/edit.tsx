import React, {useCallback, useEffect} from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import {MobileTopNav, MobileTopNavRight} from '^components/v2/MobileTopNav';
import {BackButton} from '^components/v2/ui/buttons/BackButton';
import {BasicButton} from '^components/v2/ui/buttons/BasicButton';
import {TitleSection} from '^components/v2/TitleSection';
import {useApplication} from '^hooks/useApplications';
import {useBillingHistory} from '^hooks/useBillingHistories';
import {AppNameWithLogoBlock} from '^components/pages/OrgAppInfoPage/AppNameWithLogoBlock';
import {useForm} from 'react-hook-form';
import {UpdateBillingHistoryRequestDto} from '^types/billing.type';
import {updateBillingHistory} from '^api/billing.api';
import {BillingHistoryShowPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/[billingHistoryId]/index';
import {errorNotify} from '^utils/toast-notify';
import {BillingHistoryEditForm} from '^components/v2/BillingHistoryEditPage/BillingHistoryEditForm';
import {useSetRecoilState} from 'recoil';
import {applicationIdParamState} from '^atoms/common';

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
    const router = useRouter();
    console.log(router.query);
    const applicationId = Number(router.query.appId);
    const billingHistoryId = Number(router.query.billingHistoryId) || null;
    const application = useApplication();
    const {data: billingHistory} = useBillingHistory(billingHistoryId);
    const setApplicationIdParam = useSetRecoilState(applicationIdParamState);

    useEffect(() => {
        setApplicationIdParam(applicationId);
    }, [applicationId]);

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
