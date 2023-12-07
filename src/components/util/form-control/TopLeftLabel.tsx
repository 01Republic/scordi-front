import React, {memo, ReactNode} from 'react';
import {WithChildren} from '^types/global.type';

interface TopLeftLabelProps extends WithChildren {
    text?: ReactNode;
}

export const TopLeftLabel = memo((props: TopLeftLabelProps) => {
    const {text, children} = props;

    return (
        <label className="label">
            <span className="label-text font-[500]">{children || text}</span>
        </label>
    );
});
TopLeftLabel.displayName = 'TopLeftLabel';
