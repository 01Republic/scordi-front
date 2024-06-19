import React, {memo, ReactNode} from 'react';

interface KeyValueProps {
    label: ReactNode;
    value: ReactNode;
}

export const KeyValue = memo((props: KeyValueProps) => {
    const {label, value} = props;

    return (
        <div className="text-13 mb-[4px] grid grid-cols-4 gap-2 items-center">
            <div className="text-gray-500 font-semibold min-w-[3rem]">{label}</div>
            <div className="col-span-3">{value}</div>
        </div>
    );
});
KeyValue.displayName = 'KeyValue';
