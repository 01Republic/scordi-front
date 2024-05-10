import {memo, useEffect} from 'react';
import {LoadableBox} from '^components/util/loading';
import {StepProgress} from './_common/StepProgress';
import {useCurrentConnectingProduct} from './useCurrentConnectingProduct';
import {CurrencyCode} from '^models/Money';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {createSubscriptionFormData, currentStepAtom} from './atom';
import {SubscriptionInfo, PaymentMethod, IsFreeTierStep, RecurringCycleStep} from './steps';
import {PrevNextButtons} from './PrevNextButtons';

export const ContentFunnels = memo(function ContentFunnels() {
    const orgId = useRecoilValue(orgIdParamState);
    const {isLoading, currentConnectingProduct} = useCurrentConnectingProduct();
    // useCreateSubscriptionFormList();
    const setFormData = useSetRecoilState(createSubscriptionFormData);
    const [currentStep, setStep] = useRecoilState(currentStepAtom);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!currentConnectingProduct) return;

        setFormData((f) => {
            return {
                ...f,
                organizationId: orgId,
                productId: currentConnectingProduct.id,
                isFreeTier: false,
                currentBillingAmount: {amount: 0, currency: CurrencyCode.KRW},
            };
        });
        setStep(1);
    }, [orgId, currentConnectingProduct]);

    return (
        <>
            <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
                <div className="container max-w-4xl mx-auto pt-[40px]">
                    <StepProgress />

                    {currentStep === 1 && <IsFreeTierStep />}
                    {currentStep === 2 && <RecurringCycleStep />}
                    {currentStep === 3 && <SubscriptionInfo />}
                    {currentStep === 4 && <PaymentMethod />}
                </div>
            </LoadableBox>

            <PrevNextButtons />
        </>
    );
});
