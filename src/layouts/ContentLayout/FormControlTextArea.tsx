import {ForwardedRef, forwardRef, InputHTMLAttributes, TextareaHTMLAttributes} from 'react';

type FormControlTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    labelTop?: string;
    labelAltTop?: string;
    labelBottom?: string;
    labelAltBottom?: string;
};

export const FormControlTextArea = forwardRef((props: FormControlTextAreaProps, ref: ForwardedRef<any>) => {
    const {labelTop, labelAltTop, labelBottom, labelAltBottom, className = '', ...inputProps} = props;

    return (
        <div className="form-control w-full mb-3">
            {(labelTop || labelAltTop) && (
                <label className="label">
                    <span className="label-text">{labelTop}</span>
                    <span className="label-text-alt">{labelAltTop}</span>
                </label>
            )}

            <textarea
                ref={ref}
                autoComplete={'off'}
                autoFocus={false}
                className={`textarea textarea-bordered w-full ${className}`}
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
