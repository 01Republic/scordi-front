import React from 'react';
import {useFormContext} from 'react-hook-form';
import {RadioInputForm} from './RadioInputForm';
import {CreateUserDetailRequestDto} from '^models/User/types';

export const FunnelSection = () => {
    const {register, watch} = useFormContext<CreateUserDetailRequestDto>();

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
                        {...register('funnelEtc')}
                        className="'w-full h-14 border text-sm text-gray-900 rounded-lg px-5 focus:outline focus:outline-1'"
                    />
                )}
            </section>
        </article>
    );
};
