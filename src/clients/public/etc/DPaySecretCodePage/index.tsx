import React, {memo, useCallback, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {secretCodeParamsAtom} from './atom';
import {useDPayPlanList} from './hook';
import {DPayPageLayout} from './DPayPageLayout';
import {FormCardNumber} from '^pages/direct-pay/[secretCode]/FormCardNumber';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {FormExpiryDate} from '^pages/direct-pay/[secretCode]/FormExpiryDate';
import {CardInfoSection} from '^pages/direct-pay/[secretCode]/CardInfoSection';
import {UserInfoSection} from '^pages/direct-pay/[secretCode]/CustomerInfoSection';
import {usePostDirectPay} from '^models/_scordi/ScordiPayment/hook';
import {CreateScordiPaymentWithCustomerKeyRequestDto, ScordiPaymentDto} from '^models/_scordi/ScordiPayment/type';

export const DPaySecretCodePage = memo(function DPaySecretCodePage() {
    const secretCode = useRecoilValue(secretCodeParamsAtom);
    const postDirectPayMutate = usePostDirectPay();
    const {isLoading, plans, fetch} = useDPayPlanList();
    const [currentStep, setCurrentStep] = useState<number>(1);

    const {
        register,
        handleSubmit,
        watch,
        setFocus,
        formState: {errors, isValid},
    } = useForm<CreateScordiPaymentWithCustomerKeyRequestDto>();

    useEffect(() => {
        fetch({
            where: {secretCode, isActive: true},
            itemsPerPage: 0,
        });
    }, [secretCode]);

    const onSubmit = (data: CreateScordiPaymentWithCustomerKeyRequestDto) => {
        data.cardNumber = data.cardNumberFirst + data.cardNumberSecond + data.cardNumberThird + data.cardNumberFourth;
        if (!plans[0]) return;

        console.log('보여줘', plans[0].id);
        data.planId = plans[0].id;
        postDirectPayMutate(data);
    };

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && (
                <UserInfoSection
                    nextStep={nextStep}
                    register={register}
                    isValid={isValid}
                    watch={watch}
                    errors={errors}
                />
            )}
            {currentStep === 2 && (
                <CardInfoSection
                    prevStep={prevStep}
                    register={register}
                    isValid={isValid}
                    watch={watch}
                    setFocus={setFocus}
                    errors={errors}
                />
            )}
        </form>
    );
});
