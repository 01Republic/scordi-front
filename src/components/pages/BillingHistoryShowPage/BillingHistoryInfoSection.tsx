import React, {memo} from 'react';
import {TitleSection} from '^components/v2/TitleSection';
import {useCurrentApplication} from '^hooks/useApplications';
import {AppNameWithLogoBlock} from '^components/pages/OrgAppInfoPage/AppNameWithLogoBlock';
import {BillingHistoryAmountInfoBlock} from '^components/pages/BillingHistoryShowPage/BillingHistoryAmountInfoBlock';
import {MobileKeyValueItem} from '^components/v2/MobileKeyValueItem';
import {MobileSection} from '^components/v2/MobileSection';
import {useBillingHistory} from '^hooks/useBillingHistories';
import {t_paidAt} from '^types/billing.type';

type BillingHistoryInfoSectionProps = {};

export const BillingHistoryInfoSection = memo((props: BillingHistoryInfoSectionProps) => {
    const {currentApplication: application} = useCurrentApplication();
    const billingHistory = useBillingHistory();

    if (!application || !billingHistory) return <></>;

    return (
        <>
            <TitleSection.TopPadding />
            <TitleSection.Simple flex={false}>
                <AppNameWithLogoBlock prototype={application.prototype} />
                <BillingHistoryAmountInfoBlock billingHistory={billingHistory} />
            </TitleSection.Simple>

            <MobileSection className="pb-3 border-b-8">
                <MobileKeyValueItem label="결제일시" value={t_paidAt(billingHistory)} />
                <MobileKeyValueItem label="결제상태" value={billingHistory.isSuccess ? '결제완료' : '-'} />
            </MobileSection>
        </>
    );
});
