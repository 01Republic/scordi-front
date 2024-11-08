import InputMask from '@mona-health/react-input-mask';
import React, {InputHTMLAttributes, memo} from 'react';

interface MaskedInputProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    callback: (mask: string, value: string) => any;
    maskPlaceholder?: string | null | undefined;
}

export const MaskedInput = memo((props: MaskedInputProps) => {
    const {mask, maskPlaceholder, callback, className, ...attrs} = props;

    const onChange = (e: any) => {
        callback(mask, e.target.value);
        props.onChange && props.onChange(e);
    };

    return (
        <InputMask mask={mask} maskPlaceholder={maskPlaceholder} {...attrs} onChange={onChange}>
            <input
                type="text"
                className={`input sm:input-lg input-bordered flex-grow ${className || ''}`}
                {...attrs}
                onChange={onChange}
            />
        </InputMask>
    );
});
