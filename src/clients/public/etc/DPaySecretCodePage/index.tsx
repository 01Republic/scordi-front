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
import {serviceHost} from '^config/environments';
import {plainToInstance} from 'class-transformer';

export const DPaySecretCodePage = memo(({plans}: {plans: ScordiPlanDto[]}) => {
    const secretCode = useRecoilValue(secretCodeParamsAtom);
    const {postDirectPayMutate, isPending} = usePostDirectPay();
    // const {plans, fetch} = useDPayPlanList();
    const [currentStep, setCurrentStep] = useState(0);
    const [resultPayment, setResultPayment] = useState<ScordiPaymentDto>();
    const form = useForm<DPayRequestFormDto>();

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

    if (currentStep === 0) {
        return (
            <div className="bg-gray-300">
                <SEO
                    url={DPaySecretCodePageRoute.url(secretCode)}
                    title={`참가비 결제를 요청합니다 | D-Pay`}
                    description={`${plans
                        .map((plan) => `${plan.name} - ${plan.price.toLocaleString()}원`)
                        .join(' / ')}`}
                    keywords={`D-Pay, 디페이, 간편결제, 스코디, 제로원리퍼블릭, ${planNames}`}
                    // thumbnail={serviceHost + '/images/thumbnails/01R-og_img-alt-241011.png'}
                    // thumbnail={`https://smartseotools.org/placeholder/800x420/6453ff/ffffff/---_/webp`}
                    // thumbnail={`https://smartseotools.org/placeholder/800x420/6453ff/ffffff/~$/webp`}
                    thumbnail={`https://smartseotools.org/placeholder/800x420/6453ff/ffffff/d-pay''/webp`}
                    siteName="D-Pay"
                />
                <ChannelTalkHideStyle />
                <img
                    src="https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/464592335_531482172993693_3122415523032101838_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=wyqLBJm5N6cQ7kNvgHWL6Ke&_nc_zt=23&_nc_ht=scontent-gmp1-1.xx&_nc_gid=AFUqoLHRQ-F0kBT7mNAtmtO&oh=00_AYBgeQjqRdCzQXCoKvBTsPJtFJrVpxaF_dJk38UmWZX2zA&oe=672C02FD"
                    alt="event cover page"
                    style={{
                        width: '100%',
                    }}
                />
                <div className="sticky bottom-0 w-full">
                    <div className="w-full max-w-3xl mx-auto p-8">
                        <button
                            className="btn btn-block btn-lg bg-white text-black hover:bg-gray-100"
                            style={{
                                boxShadow: '0 12px 60px #555',
                            }}
                            onClick={nextStep}
                        >
                            참여비 결제 시작하기
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <DPayPageLayout>
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
