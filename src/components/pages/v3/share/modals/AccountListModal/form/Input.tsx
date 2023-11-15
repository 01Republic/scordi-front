import React, {ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';
import {FieldPath, FieldValues, UseFormReturn} from 'react-hook-form';
import {useId} from 'react-id-generator';
import {ReactNodeLike} from 'prop-types';
import {UnSignedAccountFormData} from '^models/Account/types';

type TextInputProps<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
    label: ReactNodeLike;
    formObj: UseFormReturn<T, any>;
    name: FieldPath<T>;
};

export const Input = forwardRef((props: TextInputProps<UnSignedAccountFormData>, ref: ForwardedRef<any>) => {
    const {label, formObj, name, required, ...res} = props;
    const [id] = useId(1, `Input-${name}`);

    return (
        <div className="w-full">
            <div className="col-span-1">
                <label htmlFor={id} className="text-gray-500">
                    {label} <small className="text-gray-400">{required ? '(필수)' : ''}</small>
                </label>
            </div>
            <div className="col-span-2 mb-4">
                <input
                    id={id}
                    className="input input-underline px-0 h-[2.5rem] text-xl font-[500] w-full"
                    {...formObj.register(name)}
                    {...res}
                    required={required}
                />
                <span />
            </div>
        </div>
    );
});
