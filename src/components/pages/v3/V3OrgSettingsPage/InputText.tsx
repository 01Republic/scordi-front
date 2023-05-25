import React, {ForwardedRef, forwardRef, InputHTMLAttributes, memo} from 'react';
import {useId} from 'react-id-generator';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    defaultValue?: string;
    helpText?: string | JSX.Element;
    helpClass?: string;
    editable?: boolean;
}

export const InputText = forwardRef((props: InputTextProps, ref: ForwardedRef<any>) => {
    const {editable = true, label, ...attrs} = props;
    const [id] = useId(1, 'textfield');

    return (
        <div className="form-control gap-4 flex-row">
            <label htmlFor={id} className="label px-0 cursor-pointer w-[30%]">
                <span className="label-text font-semibold text-lg">{label}</span>
            </label>
            <div className="flex-grow">
                {editable ? (
                    <input id={id} ref={ref} type="text" className="input w-full input-bordered" {...attrs} />
                ) : (
                    <div className="h-full flex items-center">{attrs.defaultValue}</div>
                )}
            </div>
        </div>
    );
});

export const FormControl = forwardRef((props: InputTextProps, ref: ForwardedRef<any>) => {
    const [id] = useId(1, 'form_control');
    const {label, children} = props;

    return (
        <div className="form-control gap-4 flex-row">
            <label htmlFor={id} className="label px-0 cursor-pointer w-[30%]">
                <span className="label-text font-semibold text-lg">{label}</span>
            </label>
            <div className="flex-grow flex items-center">{children}</div>
        </div>
    );
});
