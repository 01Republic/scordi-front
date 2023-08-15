import {ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';
import {useId} from 'react-id-generator';

export type CheckboxInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    defaultValue?: boolean;
    helpText?: string | JSX.Element;
    helpClass?: string;
    className?: string;
};

export const CheckboxInput = forwardRef((props: CheckboxInputProps, ref: ForwardedRef<any>) => {
    const [id] = useId(1, 'CheckboxInput');
    return (
        <div className="form-control w-full">
            <div className="flex-1 pr-4">
                {props.label && (
                    <label className="label" htmlFor={id}>
                        <span className="label-text text-xl">
                            {props.label}
                            {props.required && <span className="text-red-500"> *</span>}
                        </span>
                    </label>
                )}
                {props.helpText && (
                    <div className="label">
                        <p className={props.helpClass}>{props.helpText}</p>
                    </div>
                )}
            </div>

            <div className="flex-1">
                <input
                    type="text"
                    id={id}
                    ref={ref}
                    defaultValue={props.defaultValue}
                    disabled={props.disabled}
                    className={props.className}
                    {...props}
                />
            </div>
        </div>
    );
});

export const CheckboxInputLg = forwardRef((props: CheckboxInputProps, ref: ForwardedRef<any>) => {
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
