import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {usePostDirectPay} from '^models/_scordi/ScordiPayment/hook';
import {CreateScordiPaymentWithCustomerKeyRequestDto, ScordiPaymentDto} from '^models/_scordi/ScordiPayment/type';
import {ApiError} from '^api/api';
import {Spinner} from '^components/util/loading';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {secretCodeParamsAtom} from './atom';
import {useDPayPlanList} from './hook';
import {DPayPageLayout} from './DPayPageLayout';
import {Title} from './Title';
import {PlanList} from './PlanList';
import {CardInfoSection} from './CardInfoSection';
import {UserInfoSection} from './CustomerInfoSection';
import {PaymentComplete} from './PaymentComplete';
import {debounce} from 'lodash';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {PageSEO, SEO} from '^components/SEO';
import {DPaySecretCodePageRoute} from '^pages/direct-pay/[secretCode]';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {serviceHost} from '^config/environments';

export const DPaySecretCodePage = memo(({plans}: {plans: ScordiPlanDto[]}) => {
    const secretCode = useRecoilValue(secretCodeParamsAtom);
    const {postDirectPayMutate, isPending} = usePostDirectPay();
    // const {plans, fetch} = useDPayPlanList();
    const [currentStep, setCurrentStep] = useState(1);
    const [resultPayment, setResultPayment] = useState<ScordiPaymentDto>();
    const form = useForm<CreateScordiPaymentWithCustomerKeyRequestDto>();

    // useEffect(() => {
    //     if (!secretCode) return;
    //     fetch({
    //         where: {secretCode, isActive: true},
    //         itemsPerPage: 0,
    //     });
    // }, [secretCode]);

    const onSubmit = debounce((data: CreateScordiPaymentWithCustomerKeyRequestDto) => {
        data.cardNumber = data.cardNumberFirst + data.cardNumberSecond + data.cardNumberThird + data.cardNumberFourth;
        postDirectPayMutate(data)
            .then(setResultPayment)
            .catch((e: ApiError) => {
                const msg = e.response?.data?.message;
                if (msg) toast.error(msg.replace('[토스페이먼츠] ', ''));
            });
    }, 500);

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);
    const planNames = plans.map((plan) => plan.name).join(', ');

    return (
        <DPayPageLayout>
            <SEO
                url={DPaySecretCodePageRoute.url(secretCode)}
                title={`참가비 결제를 요청합니다 | D-Pay`}
                description={`${plans.map((plan) => `${plan.name} - ${plan.price.toLocaleString()}원`).join(' / ')}`}
                keywords={`D-Pay, 디페이, 간편결제, 스코디, 제로원리퍼블릭, ${planNames}`}
                // thumbnail={serviceHost + '/images/thumbnails/01R-og_img-alt-241011.png'}
                // thumbnail={`https://smartseotools.org/placeholder/800x420/6453ff/ffffff/---_/webp`}
                // thumbnail={`https://smartseotools.org/placeholder/800x420/6453ff/ffffff/~$/webp`}
                thumbnail={`https://smartseotools.org/placeholder/800x420/6453ff/ffffff/d-pay''/webp`}
                siteName="D-Pay"
            />
            <ChannelTalkHideStyle />
            {!resultPayment ? (
                <form className="w-full h-full" onSubmit={form.handleSubmit(onSubmit)}>
                    {currentStep === 1 && (
                        <UserInfoSection form={form} nextStep={nextStep}>
                            <Title text="결제자 정보 입력" desc="모임 전, 참가비 3만원을 결제해주세요." />
                            <PlanList plans={plans} form={form} />
                        </UserInfoSection>
                    )}
                    {currentStep === 2 && (
                        <CardInfoSection form={form} prevStep={prevStep}>
                            <Title text="카드 정보를 입력해주세요" desc="" />
                            <PlanList plans={plans} form={form} />
                        </CardInfoSection>
                    )}
                </form>
            ) : (
                <PaymentComplete payment={resultPayment} />
            )}
            <AnimatedModal open={isPending} onClose={console.log} backdrop={{opacity: 0.25}}>
                <div>
                    <Spinner size={30} posY="center" />
                </div>
            </AnimatedModal>
        </DPayPageLayout>
    );
});
