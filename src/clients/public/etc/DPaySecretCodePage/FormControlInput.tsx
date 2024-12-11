import React, {InputHTMLAttributes} from 'react';
import {FieldPath, UseFormReturn, UseFormRegisterReturn} from 'react-hook-form';
import {DPayRequestFormDto} from '^models/_scordi/ScordiPayment/type';
import {TextInput} from './TextInput';

interface FormControlInputProps<FieldName extends FieldPath<DPayRequestFormDto>>
    extends InputHTMLAttributes<HTMLInputElement> {
    f: UseFormReturn<DPayRequestFormDto>;
    field: FieldName;
    register: UseFormRegisterReturn<FieldName>;
    errorMessage?: string;
    label?: string;
}

export const FormControlInput = <FieldName extends FieldPath<DPayRequestFormDto>>(
    props: FormControlInputProps<FieldName>,
) => {
    const {f, field, errorMessage, register, type = 'text', label, ...res} = props;

    return (
        <div className="w-full">
            <label htmlFor="customerName" className="flex flex-col gap-2">
                {label && <span>{label}</span>}
                <TextInput
                    type={type}
                    {...register}
                    isInvalid={!!errorMessage}
                    onBlur={() => f.trigger(field)}
                    {...res}
                />
                {errorMessage && <p className="text-red-600 text-right text-12">{errorMessage}</p>}
            </label>
        </div>
    );
};
