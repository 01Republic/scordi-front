import React, {ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
    isInvalid?: boolean;
}

export const TextInput = forwardRef((props: TextInputProps, ref: ForwardedRef<any>) => {
    const {type = 'text', isInvalid = false, className = '', ...res} = props;

    return (
        <input
            ref={ref}
            type={type}
            // className={cn('border border-gray-300 hover:border-[#6454FF] w-full h-11 rounded-lg pl-4', {
            //     'border-[#6454FF]': defaultValue,
            //     'border-red-500': isInvalid,
            // })}
            className={`input input-md sm:input-md sm:h-10 input-bordered border-[#e5e7eb] focus-within:border-[#6454FF] ${
                isInvalid ? 'border-red-500' : ''
            } focus-visible:outline-none ${className}`}
            {...res}
        />
    );
});

export const NumberTextInput = forwardRef((props: TextInputProps, ref: ForwardedRef<any>) => {
    const {type = 'text', isInvalid = false, className = '', ...res} = props;

    return (
        <input
            ref={ref}
            type={type}
            // className={cn('border border-gray-300 hover:border-[#6454FF] w-full h-11 rounded-lg pl-4', {
            //     'border-[#6454FF]': defaultValue,
            //     'border-red-500': isInvalid,
            // })}
            autoComplete={type === 'password' ? 'new-password' : 'one-time-code'}
            className={`input input-md sm:input-md sm:h-10 input-bordered border-[#e5e7eb] focus-within:border-[#6454FF] ${
                isInvalid ? 'border-red-500' : ''
            } focus-visible:outline-none px-2 w-full ${className}`}
            onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.replace(/[^0-9]/g, '');
            }}
            {...res}
        />
    );
});
