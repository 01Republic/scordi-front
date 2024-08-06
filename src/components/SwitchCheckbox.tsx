import {ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';

export type SwitchCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

export const SwitchCheckbox = forwardRef((props: SwitchCheckboxProps, ref: ForwardedRef<any>) => {
    const {label, className = '', ...inputProps} = props;
    return (
        <div className="form-control">
            {label ? (
                <label className="label cursor-pointer">
                    <span className="label-text">{label}</span>
                    <input ref={ref} type="checkbox" className={`toggle toggle-primary ${className}`} {...inputProps} />
                </label>
            ) : (
                <input ref={ref} type="checkbox" className={`toggle toggle-primary ${className}`} {...inputProps} />
            )}
        </div>
    );
});
