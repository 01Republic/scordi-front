import React from 'react';
import {useFormContext} from 'react-hook-form';
import {RadioInputForm} from '^clients/public/home/LandingPages/SignAdditionalInfoPage/RadioInputForm';
import {StepButton} from '^clients/public/home/LandingPages/SignAdditionalInfoPage/StepButton';

export const FunnelSection = () => {
    const {register, watch} = useFormContext();

    const selectedFunnel = watch('funnel');

    return (
        <article className="w-full flex flex-col gap-10">
            <section className="flex flex-col gap-3">
                <RadioInputForm value="지인추천" />
                <RadioInputForm value="검색" />
                <RadioInputForm value="광고" />
                <RadioInputForm value="블로그 컨텐츠" />
                <RadioInputForm value="기타" />
                {selectedFunnel === '기타' && (
                    <input
                        placeholder="유입 경로를 알려주세요."
                        {...register('funnelOtherDetails')}
                        className="'w-full h-12 border text-sm text-neutral-900 rounded-lg px-5 focus:outline focus:outline-1'"
                    />
                )}
            </section>
            <StepButton text="건너뛰기" disabled={true} />
        </article>
    );
};
