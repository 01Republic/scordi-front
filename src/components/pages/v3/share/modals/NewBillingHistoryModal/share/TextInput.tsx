import {ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';
import {useId} from 'react-id-generator';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    required?: boolean;
    disabled?: boolean;
    defaultValue?: string;
    helpText?: string | JSX.Element;
    helpClass?: string;
    inputclass?: string;
};

export const TextInput = forwardRef((props: TextInputProps, ref: ForwardedRef<any>) => {
    const [id] = useId(1, 'Input');
    return (
        <>
            <input
                type={props.type || 'text'}
                id={id}
                ref={ref}
                defaultValue={props.defaultValue}
                disabled={props.disabled}
                className={`input input-bordered w-full font-semibold text-neutral-500 ${props.inputclass || ''}`}
                {...props}
            />
            {props.helpText && (
                <div className="label">
                    <p className={props.helpClass}>{props.helpText}</p>
                </div>
            )}
        </>
    );
});
