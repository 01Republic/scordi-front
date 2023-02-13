import {ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';

type FormControlInputProps = {
    labelTop?: string;
    labelAltTop?: string;
    labelBottom?: string;
    labelAltBottom?: string;
    inputSize?: 'sm' | 'lg';
} & InputHTMLAttributes<HTMLInputElement>;

export const FormControlInput = forwardRef((props: FormControlInputProps, ref: ForwardedRef<any>) => {
    const {inputSize, labelTop, labelAltTop, labelBottom, labelAltBottom, className = '', ...inputProps} = props;

    return (
        <div className="form-control w-full mb-3">
            {(labelTop || labelAltTop) && (
                <label className="label">
                    <span className="label-text">{labelTop}</span>
                    <span className="label-text-alt">{labelAltTop}</span>
                </label>
            )}

            <input
                ref={ref}
                autoComplete={'off'}
                autoFocus={false}
                className={`input ${inputSize ? `input-${inputSize}` : ''} input-bordered w-full ${className}`}
                {...inputProps}
            />

            {labelBottom || labelAltBottom ? (
                <label className="label">
                    <span className="label-text-alt">{labelBottom}</span>
                    <span className="label-text-alt">{labelAltBottom}</span>
                </label>
            ) : (
                ''
            )}
        </div>
    );
});
