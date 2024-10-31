import React, {memo, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import cn from 'classnames';
import {FormCardNumber} from '^pages/direct-pay/[secretCode]/FormCardNumber';
import {FormExpiryDate} from '^pages/direct-pay/[secretCode]/FormExpiryDate';
import {WithChildren} from '^types/global.type';
import {FormBirthDay} from '^pages/direct-pay/[secretCode]/FormBirthDay';
import {FormBusinessNumber} from '^pages/direct-pay/[secretCode]/FormBusinessNumber';
import {FormCardPassword} from '^pages/direct-pay/[secretCode]/FormCardPassword';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';

interface CardInfoSectionProps extends WithChildren {
    prevStep: () => void;
    form: UseFormReturn<CreateScordiPaymentWithCustomerKeyRequestDto, any>;
}

export const CardInfoSection = memo((props: CardInfoSectionProps) => {
    const {form, prevStep, children} = props;
    const {register, watch, setFocus, formState} = form;
    const {errors, isValid} = formState;
    const [cardType, setCardType] = useState('개인카드');

    const selectCardType = (cardType: string) => {
        setCardType(cardType);
    };

    const customerName = watch('cardNumberFirst');

    return (
        <article className="p-8 flex flex-col lg:flex-row gap-8 lg:gap-16 h-full">
            <section className="w-full lg:w-1/3">{children}</section>

            <section className="w-full lg:w-2/3 h-full">
                <div className="flex flex-col h-full justify-between text-sm">
                    <section className="flex flex-col gap-5">
                        <article className="flex flex-col">
                            <div className="flex items-center gap-8 lg:gap-8">
                                <label key="개인카드" className="flex gap-1.5">
                                    <input
                                        type="radio"
                                        key="개인카드"
                                        className="mr-2 hidden"
                                        {...register('personalCard', {required: true})}
                                        onClick={() => selectCardType('개인카드')}
                                    />
                                    <div className="flex items-center justify-center w-6 h-6">
                                        <div
                                            className={cn('w-5 h-5 rounded-full flex items-center justify-center', {
                                                'bg-blue-600': cardType === '개인카드',
                                                'bg-white border-2 border-gray-200 ': cardType !== '개인카드',
                                            })}
                                        >
                                            <div
                                                className={cn('w-[10px] h-[10px]  rounded-full', {
                                                    'bg-white': cardType === '개인카드',
                                                    'bg-gray-200': cardType !== '개인카드',
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <p className="whitespace-normal w-full">개인카드</p>
                                </label>
                                <label key="법인카드" className="flex gap-1.5">
                                    <input
                                        type="radio"
                                        key="법인카드"
                                        className="mr-2 hidden"
                                        {...register('businessCard', {required: true})}
                                        onClick={() => selectCardType('법인카드')}
                                    />
                                    <div className="flex items-center justify-center w-6 h-6">
                                        <div
                                            className={cn('w-5 h-5 rounded-full flex items-center justify-center', {
                                                'bg-blue-600 ': cardType === '법인카드',
                                                'bg-white border-2 border-gray-200 ': cardType !== '법인카드',
                                            })}
                                        >
                                            <div
                                                className={cn('w-[10px] h-[10px]  rounded-full', {
                                                    'bg-white': cardType === '법인카드',
                                                    'bg-gray-200': cardType !== '법인카드',
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <p className="whitespace-normal w-full">법인카드</p>
                                </label>
                            </div>
                            <div className="lg:mt-1 h-2 mb-4">
                                {cardType === '법인카드' && (
                                    <p className="text-gray-400 ">
                                        개인 명의의 법인 카드일 경우 개인 카드로 등록해주세요
                                    </p>
                                )}
                            </div>
                        </article>
                        <FormCardNumber setFocus={setFocus} register={register} />
                        <FormExpiryDate setFocus={setFocus} register={register} />
                        <FormCardPassword register={register} />
                        {cardType === '개인카드' ? (
                            <FormBirthDay register={register} />
                        ) : (
                            <FormBusinessNumber register={register} />
                        )}
                    </section>
                    <div>
                        <label>
                            <input type="checkbox" {...register('agree', {required: true})} />
                            <span className="ml-2">[필수] 서비스 이용 약관, 개인정보 처리 동의</span>
                        </label>

                        <section className="flex gap-2 mt-2">
                            <button
                                type="button"
                                className="w-full bg-[#6454FF] rounded-md h-10 text-white"
                                onClick={prevStep}
                            >
                                이전
                            </button>
                            <button
                                type="submit"
                                className={cn('w-full rounded-md h-10 text-white', {
                                    'bg-gray-300': !isValid,
                                    'bg-[#6454FF]': isValid,
                                })}
                                disabled={!isValid}
                            >
                                결제하기
                            </button>
                        </section>
                    </div>
                </div>
            </section>
        </article>
    );
});
