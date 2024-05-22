import {ClassAttributes, InputHTMLAttributes} from 'react';

type InputTextProps = ClassAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement>;
interface NumericTextInputProps extends InputTextProps {}

export const NumericTextInput = (props: NumericTextInputProps) => {
    const {minLength, maxLength, defaultValue, onChange, disabled, ...res} = props;

    return (
        <div>
            <input
                type="text"
                minLength={minLength}
                maxLength={maxLength}
                defaultValue={defaultValue}
                onChange={(e) => {
                    const input = e.target;
                    onChange(e);
                    if (input.value.length < minLength) {
                        input.setCustomValidity('번호가 너무 짧아요');
                    } else {
                        input.setCustomValidity('');
                    }
                    input.reportValidity();
                }}
                className="input border-gray-200 bg-gray-100 text-16 w-full disabled:text-gray-400 invalid:input-error"
                disabled={disabled}
                {...res}
            />
        </div>
    );
};
NumericTextInput.displayName = 'NumericTextInput';
