import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {CurrencyCode} from '^models/Money';
import {orgIdParamState} from '^atoms/common';
import {LoadableBox} from '^components/util/loading';
import {StepProgress} from './_common/StepProgress';
import {createSubscriptionFormData, currentStepAtom} from './atom';
import {useCurrentConnectingProduct} from './useCurrentConnectingProduct';
import {PrevNextButtons} from './PrevNextButtons';
import {
    Steps,
    ProductNotSelected,
    IsFreeTierStep,
    RecurringCycleStep,
    SubscriptionInfo,
    PaymentMethod,
    InvoiceAccountSelectStep,
    TeamMemberStep,
    MasterStep,
    PartnerCompanyStep,
    MemoStep,
} from './steps';
import {PricingModelOptions} from '^models/Subscription/types/PricingModelOptions';

export const ContentFunnels = memo(function ContentFunnels() {
    const organizationId = useRecoilValue(orgIdParamState);
    const {isLoading, currentConnectingProduct} = useCurrentConnectingProduct();
    const setFormData = useSetRecoilState(createSubscriptionFormData);
    const [currentStep, setStep] = useRecoilState(currentStepAtom);

    useEffect(() => {
        if (!organizationId || isNaN(organizationId)) return;
        if (!currentConnectingProduct) return;

        setFormData((f) => {
            return {
                ...f,
                organizationId,
                productId: currentConnectingProduct.id,
                isFreeTier: true,
                pricingModel: PricingModelOptions.PER_SEAT,
                currentBillingAmount: {amount: 0, currency: CurrencyCode.KRW},
                creditCardId: undefined,
                invoiceAccountId: undefined,
            };
        });
        setStep(1);
    }, [organizationId, currentConnectingProduct]);

    if (!currentConnectingProduct) {
        return (
            <div className="container max-w-4xl mx-auto pt-[40px]">
                <ProductNotSelected />
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen -mb-[65px] pb-[65px]">
                <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
                    <div className="container max-w-5xl mx-auto py-[40px] px-8">
                        <StepProgress />

                        {currentStep === Steps.IsFreeTier && <IsFreeTierStep />}
                        {currentStep === Steps.RecurringCycle && <RecurringCycleStep />}
                        {currentStep === Steps.SubscriptionInfo && <SubscriptionInfo />}
                        {currentStep === Steps.PaymentMethod && <PaymentMethod />}
                        {currentStep === Steps.InvoiceAccount && <InvoiceAccountSelectStep />}
                        {currentStep === Steps.TeamMembers && <TeamMemberStep />}
                        {currentStep === Steps.Master && <MasterStep />}
                        {currentStep === Steps.PartnerCompany && <PartnerCompanyStep />}
                        {currentStep === Steps.Memo && <MemoStep />}
                    </div>
                </LoadableBox>
            </div>

            <PrevNextButtons />
        </>
    );
});
