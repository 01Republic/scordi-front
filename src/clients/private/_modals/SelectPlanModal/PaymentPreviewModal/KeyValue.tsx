import React, {memo} from 'react';
import {ReactNodeElement, WithChildren} from '^types/global.type';

interface KeyValueProps extends WithChildren {
    label?: ReactNodeElement;
    value?: ReactNodeElement;
}

export const KeyValue = memo((props: KeyValueProps) => {
    const {label, value, children} = props;

    return (
        <div className="flex items-start justify-between text-14 font-medium">
            <div className="list-disc pl-3.5">
                <div className="text-gray-500 list-item marker:text-gray-300">{label}</div>
            </div>
            <div>{value || children}</div>
        </div>
    );
});
KeyValue.displayName = 'KeyValue';
