import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {OutLink} from '^components/OutLink';
import {FadeUp} from '^components/FadeUp';
import {createSubscriptionFormData} from '../atom';
import {StepLayout} from '../_common/StepLayout';
import {InputSection, PricingTypeSelect, CurrencySelect, RecurringAmount} from '../inputs';
import {useCurrentConnectingProduct} from '../useCurrentConnectingProduct';

export const SubscriptionInfoStep = memo(() => {
    const {currentConnectingProduct} = useCurrentConnectingProduct();
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);

    return (
        <StepLayout title="얼마에 구독하고 있나요?" desc="구독 요금제를 기반으로 아래 항목을 입력해주세요.">
            <InputSection className="max-w-lg">
                <div className="grid grid-cols-8 gap-2 mb-6">
                    <div className="col-span-3">
                        <PricingTypeSelect />
                    </div>

                    <div className="col-span-3">
                        <RecurringAmount />
                    </div>

                    <div className="col-span-2">
                        <CurrencySelect />
                    </div>
                </div>

                {currentConnectingProduct?.pricingPageUrl && (
                    <div>
                        <OutLink
                            text="사이트에서 내 플랜 확인하기"
                            href={currentConnectingProduct.pricingPageUrl}
                            className="text-14"
                        />
                    </div>
                )}
            </InputSection>

            {/*<RecurringDate />*/}

            <InputSection className="max-w-lg">
                <FadeUp show={!formData.isFreeTier} delay="delay-[100ms]">
                    <div className="form-control">
                        <label className="label cursor-pointer flex items-start justify-between p-0">
                            <div>
                                <h4 className="text-16 font-medium tracking-[0.25px]">계속해서 변경되는 금액</h4>
                                <p className="text-14 tracking-[0.25px] text-gray-500">
                                    사용량 과금과 같이 매번 금액이 조금씩 바뀐다면, <br />
                                    약간의 오차를 감안해 비용 변동 등에 대한 알림을 전해드릴게요.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                defaultChecked={formData.isDynamicBillingAmount}
                                onChange={(e) => {
                                    setFormData((f) => ({
                                        ...f,
                                        isDynamicBillingAmount: e.target.checked,
                                    }));
                                }}
                            />
                        </label>
                        {/*사용량 과금과 같이 매번 금액이 조금씩 바뀐다면,*/}
                        {/*약간의 오차를 감안해 비용 변동 등에 대한 알림을 전해드릴게요.*/}
                    </div>
                </FadeUp>
            </InputSection>
        </StepLayout>
    );
});
SubscriptionInfoStep.displayName = 'SubscriptionInfo';
