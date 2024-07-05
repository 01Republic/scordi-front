import {ClassAttributes, InputHTMLAttributes} from 'react';
import {NumericTextInput as NumericInput} from '^clients/private/_components/inputs/NumericTextInput';

type InputTextProps = ClassAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement>;
interface NumericTextInputProps extends InputTextProps {}

export const NumericTextInput = (props: NumericTextInputProps) => {
    const {minLength, maxLength, defaultValue, onChange, disabled, ...res} = props;

    return (
        <div>
            <NumericInput
                minLength={minLength}
                maxLength={maxLength}
                defaultValue={defaultValue}
                invalidMessage="번호가 너무 짧아요"
                className="border-gray-200 bg-gray-100 text-16 w-full"
                disabled={disabled}
                {...res}
            />
        </div>
    );
};
