import React, {memo} from 'react';
import {FieldErrors, FormProvider, useForm, UseFormRegister, UseFormWatch} from 'react-hook-form';
import cn from 'classnames';
import {WithChildren} from '^types/global.type';
import {DPayPageLayout} from '^clients/public/etc/DPaySecretCodePage/DPayPageLayout';
import {FormCustomerPhone} from '^pages/direct-pay/[secretCode]/FormCustomerPhone';
import {FormCustomerName} from '^pages/direct-pay/[secretCode]/FormCustomerName';
import {FormCustomerEmail} from '^pages/direct-pay/[secretCode]/FormCustomerEmail';
import {CreateScordiPaymentWithCustomerKeyRequestDto} from '^models/_scordi/ScordiPayment/type';

interface CustomerInfoSection extends WithChildren {
    nextStep: () => void;
    register: UseFormRegister<CreateScordiPaymentWithCustomerKeyRequestDto>;
    isValid: boolean;
    watch: UseFormWatch<CreateScordiPaymentWithCustomerKeyRequestDto>;
    errors: FieldErrors<CreateScordiPaymentWithCustomerKeyRequestDto>;
}

export const UserInfoSection = memo((props: CustomerInfoSection) => {
    const {nextStep, register, isValid, watch, errors} = props;

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
        <DPayPageLayout title="사용자 정보를">
            <>
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
            </>
        </DPayPageLayout>
    );
});
