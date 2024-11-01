import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import cn from 'classnames';
import {WithChildren} from '^types/global.type';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';
import {FormCustomerPhone} from './FormCustomerPhone';
import {FormCustomerName} from './FormCustomerName';
import {FormCustomerEmail} from './FormCustomerEmail';

interface CustomerInfoSection extends WithChildren {
    nextStep: () => void;
    form: UseFormReturn<CreateScordiPaymentWithCustomerKeyRequestDto, any>;
}

export const UserInfoSection = memo((props: CustomerInfoSection) => {
    const {nextStep, form, children} = props;
    const {register, watch, formState} = form;
    const {errors, isValid} = formState;

    const customerName = watch('customerName');
    const customerEmail = watch('customerEmail');
    const customerPhone = watch('customerPhone');

    const isStepValid =
        customerName &&
        customerEmail &&
        customerPhone &&
        !errors.customerName &&
        !errors.customerEmail &&
        !errors.customerPhone;

    return (
        <article className="p-8 flex flex-col lg:flex-row gap-8 lg:gap-16 h-full">
            <section className="w-full lg:w-1/3">{children}</section>

            <section className="w-full lg:w-2/3 h-full">
                <div className="w-full h-full flex flex-col justify-between text-sm">
                    <article className="flex flex-col gap-5">
                        <FormCustomerName register={register} watch={watch} errors={errors} />
                        <FormCustomerEmail register={register} watch={watch} errors={errors} />
                        <FormCustomerPhone register={register} watch={watch} errors={errors} />
                    </article>
                    <button
                        type="button"
                        className={cn('w-full rounded-md h-10 text-white', {
                            'bg-gray-300': !isStepValid,
                            'bg-[#6454FF]': isStepValid,
                        })}
                        onClick={nextStep}
                        disabled={!isStepValid}
                    >
                        다음
                    </button>
                </div>
            </section>
        </article>
    );
});
