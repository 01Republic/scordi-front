import React, {ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';

type FormControlCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    // labelTop?: string;
    // labelAltTop?: string;
    // labelBottom?: string;
    // labelAltBottom?: string;
    inputSize?: 'xs' | 'sm' | 'md' | 'lg';
    inputColor?: 'primary' | 'secondary' | 'mark' | 'accent';
};

export const FormControlCheckbox = forwardRef((props: FormControlCheckboxProps, ref: ForwardedRef<any>) => {
    const {
        label = '',
        inputSize = 'md',
        inputColor = 'primary',
        // labelTop,
        // labelAltTop,
        // labelBottom,
        // labelAltBottom,
        className = '',
        ...inputProps
    } = props;

    return (
        <div className="form-control w-full mb-3">
            <label className="label cursor-pointer">
                <span className="label-text">{label}</span>
                <input
                    ref={ref}
                    type="checkbox"
                    className={`checkbox checkbox-${inputSize} checkbox-${inputColor} ${className}`}
                    {...inputProps}
                />
            </label>
        </div>
    );
});
