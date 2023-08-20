import React, {ForwardedRef, forwardRef, InputHTMLAttributes, memo, useState} from 'react';
import {useId} from 'react-id-generator';
import {ReactNodeLike} from 'prop-types';

export const TextInput = forwardRef(
    (props: {label: ReactNodeLike} & InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<any>) => {
        const [id] = useId(1, 'text-input');
        const [errorMessage, setErrorMessage] = useState('');
        const {label, ...inputProps} = props;

        return (
            <div className="w-full grid grid-cols-3">
                <label htmlFor={id} className="label p-0 items-start">
                    <span className="label-text">{label}</span>
                </label>

                <div className="col-span-2 flex flex-col gap-1.5">
                    <input id={id} ref={ref} type="text" className="input input-bordered w-full" {...inputProps} />
                    <label className="label p-0">
                        <span className="label-text-alt" />
                        <span className="label-text-alt">&nbsp;{errorMessage}</span>
                    </label>
                </div>
            </div>
        );
    },
);
