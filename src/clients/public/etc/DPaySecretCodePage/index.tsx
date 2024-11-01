import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useForm} from 'react-hook-form';
import {usePostDirectPay} from '^models/_scordi/ScordiPayment/hook';
import {CreateScordiPaymentWithCustomerKeyRequestDto, ScordiPaymentDto} from '^models/_scordi/ScordiPayment/type';
import {CardInfoSection} from '^pages/direct-pay/[secretCode]/CardInfoSection';
import {UserInfoSection} from '^pages/direct-pay/[secretCode]/CustomerInfoSection';
import {Spinner} from '^components/util/loading';
import {secretCodeParamsAtom} from './atom';
import {useDPayPlanList} from './hook';
import {DPayPageLayout} from './DPayPageLayout';
import {Title} from './Title';
import {PlanList} from './PlanList';
import {PaymentComplete} from './PaymentComplete';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {ApiError, errorToast} from '^api/api';
import {toast} from 'react-hot-toast';

export const DPaySecretCodePage = memo(function DPaySecretCodePage() {
    const secretCode = useRecoilValue(secretCodeParamsAtom);
    const {postDirectPayMutate, isPending} = usePostDirectPay();
    const {isLoading, plans, fetch} = useDPayPlanList();
    const [currentStep, setCurrentStep] = useState(1);
    const [resultPayment, setResultPayment] = useState<ScordiPaymentDto>();
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
        postDirectPayMutate(data)
            .then(setResultPayment)
            .catch((e: ApiError) => {
                const msg = e.response?.data?.message;
                if (msg) toast.error(msg.replace('[토스페이먼츠] ', ''));
            });
    };

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    return (
        <DPayPageLayout>
            {!resultPayment ? (
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
            ) : (
                <PaymentComplete payment={resultPayment} />
            )}
            <AnimatedModal open={isPending} onClose={console.log} backdrop={{opacity: 0.1}}>
                <div>
                    <Spinner size={30} posY="center" />
                </div>
            </AnimatedModal>
        </DPayPageLayout>
    );
});
