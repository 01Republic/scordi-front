import React, {memo} from 'react';
import {TitleSection} from '^components/v2/TitleSection';
import {useRouter} from 'next/router';
import {useApplication} from '^hooks/useApplications';
import {AppNameWithLogoBlock} from '^components/pages/OrgAppInfoPage/AppNameWithLogoBlock';
import {BillingHistoryAmountInfoBlock} from '^components/pages/BillingHistoryShowPage/BillingHistoryAmountInfoBlock';
import {MobileKeyValueItem} from '^components/v2/MobileKeyValueItem';
import {MobileSection} from '^components/v2/MobileSection';
import {useBillingHistory} from '^hooks/useBillingHistories';

type BillingHistoryInfoSectionProps = {};

export const BillingHistoryInfoSection = memo((props: BillingHistoryInfoSectionProps) => {
    const {} = props;
    const router = useRouter();
    const applicationId = Number(router.query.appId) || null;
    const billingHistoryId = Number(router.query.billingHistoryId) || null;
    const {application} = useApplication(applicationId);
    const {data: billingHistory, isLoading} = useBillingHistory(billingHistoryId);

    if (!application) return <></>;
    if (isLoading || !billingHistory) return <></>;

    const {prototype, paymentPlan, billingCycle} = application;

    return (
        <>
            <TitleSection.TopPadding />
            <TitleSection.Simple flex={false}>
                <AppNameWithLogoBlock prototype={prototype} />
                <BillingHistoryAmountInfoBlock />
            </TitleSection.Simple>

            <MobileSection className="pb-3 border-b-8">
                <MobileKeyValueItem label="결제일시" value={billingHistory.paidAt} />
                <MobileKeyValueItem label="결제상태" value={billingHistory.isSuccess ? '결제완료' : '-'} />
            </MobileSection>
        </>
    );
});
