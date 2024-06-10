import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {
    PricingModelOptions,
    PricingModelValues,
    t_SubscriptionPricingModel,
} from '^models/Subscription/types/PricingModelOptions';
import {MonoSelect} from '^components/ui/inputs/MonoSelect';
import {createSubscriptionFormData} from '../atom';

const options = PricingModelValues.map((value) => ({
    label: t_SubscriptionPricingModel(value),
    value,
}));

// 무관 : 별도의 과금방식이 없거나 아래 요건과 관계 없는 경우
// 인원당 : 사용하는 시트나 계정수에 따라 과금되는 경우
// 사용량 : MAU 단위나 서버비용 등과 같이 실제 사용한 만큼 과금되는 경우
// 건별결제 : 문자발송 당이나 광고비용 등과 같이 사용횟수 단위로 과금되는 경우
// 고정요금 : 금액 변동 없이 일정하게 과금되는 경우
// 라이센스 : 어도비나 마이크로소프트365처럼, 요금제에 기반하는 라이센스 단위로 과금되는 경우
// 크레딧 : 혜택을 받아 SaaS를 구매해서 무료 혹은 할인가로 과금되는 경우

const descriptions = {
    // 무관 (기본값)
    [PricingModelOptions.NONE]: <>별도의 과금방식이 없거나 아래 요건과 관계 없는 경우</>,
    // 인원당
    [PricingModelOptions.PER_SEAT]: <>사용하는 시트나 계정수에 따라 과금되는 경우</>,
    // 사용량
    [PricingModelOptions.PER_USAGE]: <>MAU 단위나 서버비용 등과 같이 실제 사용한 만큼 과금되는 경우</>,
    // 건별결제
    [PricingModelOptions.PER_UNIT]: <>문자발송 당이나 광고비용 등과 같이 사용횟수 단위로 과금되는 경우</>,
    // 고정요금
    [PricingModelOptions.FIXED]: <>금액 변동 없이 일정하게 과금되는 경우</>,
    // 라이센스
    [PricingModelOptions.LICENSE]: <>어도비나 마이크로소프트365처럼, 요금제에 기반하는 라이센스 단위로 과금되는 경우</>,
    // 크레딧
    [PricingModelOptions.CREDIT]: <>혜택을 받아 SaaS를 구매해서 무료 혹은 할인가로 과금되는 경우</>,
};

export const PricingTypeSelect = memo(function PricingTypeSelect() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);

    return (
        <label>
            <p className="text-11 text-gray-500 mb-1">과금방식</p>
            <MonoSelect
                options={options}
                onChange={(selected) => {
                    setFormData((f) => ({
                        ...f,
                        pricingModel: selected ? selected.value : PricingModelOptions.NONE,
                        isPerUser: selected?.value === PricingModelOptions.PER_SEAT,
                    }));
                }}
                getLabel={(c) => c.label}
                getValue={(c) => c.value}
                defaultValue={formData.pricingModel}
                modalTitle="과금방식을 선택해주세요"
                size="md"
                OptionComponent={({option}) => {
                    return (
                        <>
                            <p className="font-medium text-14">{option.label}</p>
                            <p className="text-12 text-gray-400">{descriptions[option.value]}</p>
                        </>
                    );
                }}
            />
        </label>
    );
});
