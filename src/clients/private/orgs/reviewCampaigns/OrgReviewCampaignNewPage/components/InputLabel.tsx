import React, {memo} from 'react';
import {ReactNodeElement, WithChildren} from '^types/global.type';

interface InputLabelProps extends WithChildren {
    title?: ReactNodeElement;
    required?: boolean;
}

export const InputLabel = memo((props: InputLabelProps) => {
    const {title, required = false, children} = props;

    return (
        <div className={'text-14 font-medium'}>
            {title || children} {required && <span className={'text-red-400'}>*</span>}
        </div>
    );
});
InputLabel.displayName = 'InputLabel';
