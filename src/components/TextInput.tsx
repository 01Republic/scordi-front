import {ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';
import {useId} from 'react-id-generator';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    defaultValue?: string;
    helpText?: string | JSX.Element;
    helpClass?: string;
    inputClass?: string;
};

export const TextInput = forwardRef((props: TextInputProps, ref: ForwardedRef<any>) => {
    const [id] = useId(1, 'TextInput');
    return (
        <div className="form-control w-full">
            {props.label && (
                <label className="label" htmlFor={id}>
                    <span className="label-text">
                        {props.label}
                        {props.required && <span className="text-red-500"> *</span>}
                    </span>
                </label>
            )}
            <input
                type="text"
                id={id}
                ref={ref}
                defaultValue={props.defaultValue}
                disabled={props.disabled}
                className={`input input-bordered w-full bg-slate-50 border-slate-100 ${props.inputClass || ''}`}
                {...props}
            />
            {props.helpText && (
                <div className="label">
                    <p className={props.helpClass}>{props.helpText}</p>
                </div>
            )}
        </div>
    );
});

export const TextInputLg = forwardRef((props: TextInputProps, ref: ForwardedRef<any>) => {
    return (
        <div className="form-control w-full">
            {props.label && (
                <label className="label">
                    <span className="label-text">
                        {props.label}
                        {props.required && <span className="text-red-500"> *</span>}
                    </span>
                </label>
            )}
            <input
                type="text"
                ref={ref}
                disabled={props.disabled}
                className="input input-lg input-bordered w-full"
                {...props}
            />
        </div>
    );
});
