import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ReactNodeLike} from 'prop-types';

interface SummarySectionItemProps extends WithChildren {
    label: ReactNodeLike;
    value?: ReactNodeLike;
}

export const SummarySectionItem = memo((props: SummarySectionItemProps) => {
    const {label, value, children} = props;

    return (
        <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="font-semibold text-18">{children || value}</p>
        </div>
    );
});
