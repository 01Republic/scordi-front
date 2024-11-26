import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {DPayRequestFormDto} from '^models/_scordi/ScordiPayment/type';
import {TextInput} from './TextInput';

interface FormCustomerNameProps extends WithChildren {
    form: UseFormReturn<DPayRequestFormDto, any>;
    errorMessage?: string;
}

export const FormCustomerName = memo((props: FormCustomerNameProps) => {
    const {form, errorMessage} = props;

    return (
        <div className="w-full">
            <label htmlFor="customerName" className="flex flex-col gap-2">
                <span>이름</span>
                <TextInput
                    type="text"
                    {...form.register('customerName', {
                        required: '이름을 입력해주세요',
                    })}
                    isInvalid={!!errorMessage}
                    onBlur={() => form.trigger('customerName')}
                    onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[0-9]/g, '');
                    }}
                />
                {errorMessage && <p className="text-red-600 text-right text-12">{errorMessage}</p>}
            </label>
        </div>
    );
});
