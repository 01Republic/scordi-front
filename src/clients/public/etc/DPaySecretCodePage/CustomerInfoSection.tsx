import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {DPayRequestFormDto} from '^models/_scordi/ScordiPayment/type';
import {FormControlInput} from './FormControlInput';
import {CTASection} from './CTASection';
import {CTAButton} from './CTAButton';

interface CustomerInfoSection extends WithChildren {
    nextStep: () => void;
    form: UseFormReturn<DPayRequestFormDto>;
}

export const UserInfoSection = memo((props: CustomerInfoSection) => {
    const {nextStep, form, children} = props;
    const {errors} = form.formState;

    const checkValid = () => {
        if (errors.planId) return false;
        if (!form.watch('customerName')) return false;
        if (!form.watch('customerEmail') || errors.customerEmail) return false;
        if (!form.watch('customerPhone')) return false;

        return true;
    };

    const isValid = checkValid();

    return (
        <article className="p-8 flex flex-col sm:flex-row gap-8 sm:gap-16 h-full">
            <section className="w-full sm:w-1/3">{children}</section>

            <section className="w-full sm:w-2/3 h-full">
                <div className="w-full h-full flex flex-col justify-between text-sm">
                    <article className="flex flex-col gap-5">
                        <FormControlInput
                            f={form}
                            label="이름"
                            field="customerName"
                            register={form.register('customerName', {
                                required: '이름을 입력해주세요',
                            })}
                            errorMessage={errors.customerName?.message}
                        />
                        <FormControlInput
                            f={form}
                            type="email"
                            label="이메일 주소"
                            field="customerEmail"
                            register={form.register('customerEmail', {
                                required: '잘못된 이메일 주소입니다.',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: '잘못된 이메일 주소입니다.',
                                },
                            })}
                            errorMessage={errors.customerEmail?.message}
                        />
                        <FormControlInput
                            f={form}
                            type="tel"
                            label="전화번호"
                            field="customerPhone"
                            register={form.register('customerPhone', {
                                required: '전화번호를 입력해주세요.',
                                minLength: {
                                    value: 11,
                                    message: '전화번호를 다시 확인해주세요',
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: '11자리의 숫자로 입력해주세요',
                                },
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    e.target.value = value.slice(0, 11);
                                },
                            })}
                            errorMessage={errors.customerPhone?.message}
                        />
                    </article>

                    <section className="w-full h-24 sm:hidden" />
                    <CTASection>
                        <section className="flex gap-2">
                            <CTAButton text="다음" onClick={() => isValid && nextStep()} disabled={!isValid} />
                        </section>
                    </CTASection>
                </div>
            </section>
        </article>
    );
});
