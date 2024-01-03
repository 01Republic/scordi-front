import React, {memo, ReactNode} from 'react';
import {WithChildren} from '^types/global.type';

interface TopLeftLabelProps extends WithChildren {
    text?: ReactNode;
}

export const TopLeftLabel = memo((props: TopLeftLabelProps) => {
    const {text, children} = props;

    return (
        <label className="label px-0">
            <span className="label-text font-[500]">{children || text}</span>
        </label>
    );
});
TopLeftLabel.displayName = 'TopLeftLabel';

export const RequiredTopLeftLabel = memo((props: TopLeftLabelProps) => {
    const {text} = props;

    return (
        <label className="label px-0">
            <p className="flex items-center gap-1">
                {text} <span className="text-red-500 self-center">*</span>
            </p>
        </label>
    );
});
