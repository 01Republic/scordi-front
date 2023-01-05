import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {MobileSection} from '^components/v2/MobileSection';
import {MobileKeyValueItem} from '^components/v2/MobileKeyValueItem';
import {useRouter} from 'next/router';
import {useApplication} from '^hooks/useApplications';
import {t_BillingCycleTerm} from '^types/applicationBillingCycle.type';
import {TitleSection} from '^components/v2/TitleSection';
import {safeImageSrc} from '^types/applicationPrototype.type';
import {ImageV2} from '^components/v2/ui/Image';

type AppInfoSectionProps = {};

export const AppInfoSection = memo((props: AppInfoSectionProps) => {
    const {} = props;
    const router = useRouter();
    const applicationId = Number(router.query.appId);
    const {application} = useApplication(applicationId);

    if (!application) return <></>;

    const {prototype, paymentPlan, billingCycle} = application;

    return (
        <>
            <TitleSection.TopPadding />
            <TitleSection.Simple flex={false}>
                <TitleSection.Title size="xl" className="flex items-center">
                    <ImageV2 width={30} src={safeImageSrc(prototype, 30, 30)} alt={`${prototype.name} logo`} />
                    <span className="mx-2">{prototype.name}</span>
                </TitleSection.Title>
                <TitleSection.Title size="lg" className="text-right">
                    <div className="text-base font-medium">Next {application.nextBillingDate}</div>
                    <div>US${application.nextBillingAmount.toLocaleString()}</div>
                </TitleSection.Title>
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
