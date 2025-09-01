import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {usePostDirectPay} from '^models/_scordi/ScordiPayment/hook';
import {DPayRequestFormDto, ScordiPaymentDto} from '^models/_scordi/ScordiPayment/type';
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
import {plainToInstance} from 'class-transformer';
import {undef} from '^utils/array';

export const DPaySecretCodePage = memo(({plans}: {plans: ScordiPlanDto[]}) => {
    const secretCode = useRecoilValue(secretCodeParamsAtom);
    const {postDirectPayMutate, isPending} = usePostDirectPay();
    const [currentStep, setCurrentStep] = useState(0);
    const [resultPayment, setResultPayment] = useState<ScordiPaymentDto>();
    const form = useForm<DPayRequestFormDto>();
    const plan = undef(plans[0]);

    const onSubmit = debounce((data: DPayRequestFormDto) => {
        const formData = plainToInstance(DPayRequestFormDto, data);
        const body = formData.toRequestDto();
        postDirectPayMutate(body)
            .then(setResultPayment)
            .catch((e: ApiError) => {
                const msg = e.response?.data?.message;
                if (msg) toast.error(msg.replace('[토스페이먼츠] ', ''));
            });
    }, 500);

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);
    const planNames = plans.map((plan) => plan.name).join(', ');

    const {title, subtitle} = plan?.getDPayPlanData() || {};

    return (
        <DPayPageLayout>
            <SEO
                url={DPaySecretCodePageRoute.url(secretCode)}
                title={`${title || '참가비 결제를 요청합니다'} | D-Pay`}
                description={`${plans.map((plan) => `${plan.name} - ${plan.price.toLocaleString()}원`).join(' / ')}`}
                keywords={`D-Pay, 디페이, 간편결제, 스코디, 제로원리퍼블릭, ${planNames}`}
                // thumbnail={serviceHost + '/images/thumbnails/01R-og_img-alt-241011.png'}
                // thumbnail={`https://smartseotools.org/placeholder/800x420/6453ff/ffffff/---_/webp`}
                // thumbnail={`https://smartseotools.org/placeholder/800x420/6453ff/ffffff/~$/webp`}
                thumbnail={`/images/thumbnails/d-pay.default-thumbnail.webp`}
                siteName="D-Pay"
                stepBy={false}
            />
            <ChannelTalkHideStyle />
            {!resultPayment ? (
                <form className="w-full h-full" onSubmit={form.handleSubmit(onSubmit)}>
                    {currentStep === 0 && (
                        <UserInfoSection form={form} nextStep={nextStep} plan={plan}>
                            <Title text={title || `환영합니다!`} desc={subtitle || `모임 전, 참가비를 결제해주세요.`} />
                            <PlanList plans={plans} form={form} />
                        </UserInfoSection>
                    )}
                    {currentStep === 1 && (
                        <CardInfoSection form={form} prevStep={prevStep}>
                            <Title text="카드 정보를 입력해주세요" desc="" />
                            <PlanList plans={plans} form={form} />
                        </CardInfoSection>
                    )}
                </form>
            ) : (
                <PaymentComplete payment={resultPayment} plan={plan} />
            )}
            <AnimatedModal open={isPending} onClose={console.log} backdrop={{opacity: 0.25}}>
                <div>
                    <Spinner size={30} posY="center" />
                </div>
            </AnimatedModal>
        </DPayPageLayout>
    );
});
