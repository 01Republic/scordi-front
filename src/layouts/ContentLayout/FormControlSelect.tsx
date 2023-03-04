import React, {ForwardedRef, forwardRef, ReactNode, SelectHTMLAttributes} from 'react';

type FormControlSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options?: [string | ReactNode, string | number | readonly string[] | undefined][];
    labelTop?: string;
    labelAltTop?: string;
    labelBottom?: string;
    labelAltBottom?: string;
    inputSize?: 'sm' | 'lg';
};

export const FormControlSelect = forwardRef((props: FormControlSelectProps, ref: ForwardedRef<any>) => {
    const {
        options,
        inputSize,
        labelTop,
        labelAltTop,
        labelBottom,
        labelAltBottom,
        className = '',
        children,
        ...inputProps
    } = props;

    return (
        <div className="form-control w-full mb-3">
            {(labelTop || labelAltTop) && (
                <label className="label">
                    <span className="label-text">{labelTop}</span>
                    <span className="label-text-alt">{labelAltTop}</span>
                </label>
            )}

            <select ref={ref} className="select select-bordered w-full" {...inputProps}>
                {options
                    ? options.map(([k, v], i) => (
                          <option key={i} value={v}>
                              {k}
                          </option>
                      ))
                    : children}
            </select>

            {(labelBottom || labelAltBottom) && (
                <label className="label">
                    <span className="label-text-alt">{labelBottom}</span>
                    <span className="label-text-alt">{labelAltBottom}</span>
                </label>
            )}
        </div>
    );
});
