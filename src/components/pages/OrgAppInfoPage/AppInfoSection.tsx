import React, {memo, useEffect} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {MobileKeyValueItem} from '^components/v2/MobileKeyValueItem';
import {useCurrentSubscription} from '^hooks/useSubscriptions';
import {t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {TitleSection} from '^components/v2/TitleSection';
import {AppNameWithLogoBlock} from './AppNameWithLogoBlock';
import {AppNextPayInfoBlock} from '^components/pages/OrgAppInfoPage/AppNextPayInfoBlock';

type AppInfoSectionProps = {};

export const AppInfoSection = memo((props: AppInfoSectionProps) => {
    const {currentApplication: application} = useCurrentSubscription();

    if (!application) return <></>;

    const {prototype, paymentPlan, billingCycle} = application;
    console.log(application);

    return (
        <>
            <TitleSection.TopPadding />
            <TitleSection.Simple flex={false}>
                <AppNameWithLogoBlock prototype={prototype} />
                <AppNextPayInfoBlock application={application} />
            </TitleSection.Simple>

            <MobileSection className="pb-3 border-b-8">
                <MobileKeyValueItem label="연동유형" value={`수동`} />
                <MobileKeyValueItem label="플랜" value={paymentPlan?.name || '-'} />
                <MobileKeyValueItem
                    label="결제주기"
                    value={billingCycle ? t_BillingCycleTerm(billingCycle.term, true) : '-'}
                />
                <MobileKeyValueItem label="단위가격">
                    <span className="text-gray-500 font-semibold">
                        {billingCycle ? (
                            <>
                                {billingCycle.isPerUser && <span className="text-xs mr-2">(1명당)</span>}
                                <span>${billingCycle.unitPrice}</span>
                            </>
                        ) : (
                            '-'
                        )}
                    </span>
                </MobileKeyValueItem>
            </MobileSection>
        </>
    );
});
