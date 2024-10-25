import React, {ForwardedRef, forwardRef, InputHTMLAttributes, memo, ReactNode, useState} from 'react';
import {useId} from 'react-id-generator';

export const FileInput = forwardRef(
    (props: {label: ReactNode} & InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<any>) => {
        const [id] = useId(1, 'excel-file-input');
        const [errorMessage, setErrorMessage] = useState('');
        const {label, ...inputProps} = props;

        return (
            <div className="w-full grid grid-cols-3">
                <label htmlFor={id} className="label p-0 items-start">
                    <span className="label-text">{label}</span>
                </label>

                <div className="col-span-2 flex flex-col gap-1.5">
                    <input
                        id={id}
                        ref={ref}
                        type="file"
                        className="file-input file-input-bordered w-full"
                        {...inputProps}
                    />
                    <label className="label p-0">
                        <span className="label-text-alt" />
                        <span className="label-text-alt">&nbsp;{errorMessage}</span>
                    </label>
                </div>
            </div>
        );
    },
);
