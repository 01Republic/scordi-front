import {ClassAttributes, InputHTMLAttributes} from 'react';

type InputTextProps = ClassAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement>;

interface NumericTextInputProps extends InputTextProps {
    invalidMessage?: string;
}

export const NumericTextInput = (props: NumericTextInputProps) => {
    const {
        type = 'text',
        minLength,
        maxLength,
        defaultValue,
        onChange,
        disabled,
        className = '',
        invalidMessage = '너무 짧아요',
        ...res
    } = props;

    return (
        <input
            type={type}
            minLength={minLength}
            maxLength={maxLength}
            defaultValue={defaultValue}
            onChange={(e) => {
                const input = e.target;
                onChange && onChange(e);

                if (typeof minLength === 'number') {
                    if (input.value.length < minLength) {
                        input.setCustomValidity(invalidMessage);
                    } else {
                        input.setCustomValidity('');
                    }
                }
                input.reportValidity();
            }}
            className={`input disabled:text-gray-400 invalid:input-error ${className}`}
            disabled={disabled}
            {...res}
        />
    );
};
