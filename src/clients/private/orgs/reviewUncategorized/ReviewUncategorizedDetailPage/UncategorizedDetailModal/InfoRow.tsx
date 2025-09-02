import React, {memo} from 'react';

interface InfoRowProps {
    label: string;
    value: React.ReactNode;
}

export const InfoRow = memo((props: InfoRowProps) => {
    const {label, value} = props;

    return (
        <div className="flex justify-between items-center p-2 ">
            <span className="w-16">{label}</span>
            <span className="text-gray-600">{value}</span>
        </div>
    );
});

InfoRow.displayName = 'InfoRow';
