import InputMask, {Props as InputMaskProps} from 'react-input-mask';
import React, {memo} from 'react';

interface MaskedInputProps extends InputMaskProps {
    mask: string;
    callback: (mask: string, value: string) => any;
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
