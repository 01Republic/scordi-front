import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useForm} from 'react-hook-form';
import {usePostDirectPay} from '^models/_scordi/ScordiPayment/hook';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';
import {secretCodeParamsAtom} from './atom';
import {useDPayPlanList} from './hook';
import {DPayPageLayout} from './DPayPageLayout';
import {Title} from './Title';
import {PlanList} from './PlanList';
import {CardInfoSection} from '^pages/direct-pay/[secretCode]/CardInfoSection';
import {UserInfoSection} from '^pages/direct-pay/[secretCode]/CustomerInfoSection';

export const DPaySecretCodePage = memo(function DPaySecretCodePage() {
    const secretCode = useRecoilValue(secretCodeParamsAtom);
    const postDirectPayMutate = usePostDirectPay();
    const {isLoading, plans, fetch} = useDPayPlanList();
    const [currentStep, setCurrentStep] = useState(1);
    const form = useForm<CreateScordiPaymentWithCustomerKeyRequestDto>();

    useEffect(() => {
        if (!secretCode) return;
        fetch({
            where: {secretCode, isActive: true},
            itemsPerPage: 0,
        });
    }, [secretCode]);

    const onSubmit = (data: CreateScordiPaymentWithCustomerKeyRequestDto) => {
        data.cardNumber = data.cardNumberFirst + data.cardNumberSecond + data.cardNumberThird + data.cardNumberFourth;
        postDirectPayMutate(data);
    };

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    return (
        <DPayPageLayout>
            <form className="w-full h-full" onSubmit={form.handleSubmit(onSubmit)}>
                {currentStep === 1 && (
                    <UserInfoSection form={form} nextStep={nextStep}>
                        <Title line1="사용자 정보를" />
                        <PlanList plans={plans} form={form} />
                    </UserInfoSection>
                )}
                {currentStep === 2 && (
                    <CardInfoSection form={form} prevStep={prevStep}>
                        <Title line1="카드 정보를" />
                        <PlanList plans={plans} form={form} />
                    </CardInfoSection>
                )}
            </form>
        </DPayPageLayout>
    );
});
