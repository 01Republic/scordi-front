import React, {memo} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {MobileKeyValueItem} from '^components/v2/MobileKeyValueItem';
import {useRouter} from 'next/router';
import {useApplication} from '^hooks/useApplications';
import {t_BillingCycleTerm} from '^types/applicationBillingCycle.type';
import {TitleSection} from '^components/v2/TitleSection';
import {AppNameWithLogoBlock} from './AppNameWithLogoBlock';
import {AppNextPayInfoBlock} from '^components/pages/OrgAppInfoPage/AppNextPayInfoBlock';

type AppInfoSectionProps = {};

export const AppInfoSection = memo((props: AppInfoSectionProps) => {
    const {} = props;
    const router = useRouter();
    const applicationId = Number(router.query.appId);
    const {data: application} = useApplication(applicationId);

    if (!application) return <></>;

    const {prototype, paymentPlan, billingCycle} = application;

    return (
        <>
            <TitleSection.TopPadding />
            <TitleSection.Simple flex={false}>
                <AppNameWithLogoBlock prototype={prototype} />
                <AppNextPayInfoBlock application={application} />
            </TitleSection.Simple>

            <MobileSection className="pb-3 border-b-8">
                <MobileKeyValueItem label="연동유형" value={`수동`} />
                <MobileKeyValueItem label="플랜" value={paymentPlan.name} />
                <MobileKeyValueItem label="결제주기" value={t_BillingCycleTerm(billingCycle.term, true)} />
                <MobileKeyValueItem label="단위가격" value={`$${billingCycle.unitPrice}`} />
            </MobileSection>
        </>
    );
});
