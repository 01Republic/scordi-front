import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {DPayRequestFormDto} from '^models/_scordi/ScordiPayment/type';
import {FormControlInput} from './FormControlInput';
import {CTASection} from './CTASection';
import {CTAButton} from './CTAButton';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';

interface CustomerInfoSection extends WithChildren {
    nextStep: () => void;
    form: UseFormReturn<DPayRequestFormDto>;
    plan: ScordiPlanDto;
}

export const UserInfoSection = memo((props: CustomerInfoSection) => {
    const {nextStep, form, plan, children} = props;
    const {errors} = form.formState;
    const planData = plan.getDPayPlanData();
    const etcRequired = !!planData?.etcRequired;

    const checkValid = () => {
        if (errors.planId) return false;
        if (!form.watch('customerName')) return false;
        if (!form.watch('customerEmail') || errors.customerEmail) return false;
        if (!form.watch('customerPhone')) return false;
        if (etcRequired && !form.watch('etc')) return false;

        return true;
    };

    const isValid = checkValid();

    return (
        <article className="p-8 flex flex-col sm:flex-row gap-8 sm:gap-16 h-full">
            <section className="w-full sm:w-1/3">{children}</section>

            <section className="w-full sm:w-2/3 h-full">
                <div className="w-full h-full flex flex-col justify-between text-sm">
                    <article className="flex flex-col gap-4 sm:gap-5 mb-6">
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
                        {etcRequired && (
                            <FormControlInput
                                f={form}
                                label={planData?.etcLabel}
                                field="etc"
                                register={form.register('etc', {
                                    required: `입력해주세요`,
                                })}
                                errorMessage={errors.etc?.message}
                            />
                        )}
                    </article>

                    {/*<section className="w-full h-24 sm:hidden" />*/}

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
