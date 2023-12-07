import React, {memo, ReactNode} from 'react';
import {WithChildren} from '^types/global.type';

interface BottomLeftHintProps extends WithChildren {
    text?: ReactNode;
}

export const BottomLeftHint = memo((props: BottomLeftHintProps) => {
    const {text, children} = props;

    return (
        <label className="label">
            <span className="label-text-alt">{children || text}</span>
        </label>
    );
});
BottomLeftHint.displayName = 'BottomLeftHint';
