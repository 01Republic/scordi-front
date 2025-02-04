import React, {memo} from 'react';

type StatusCardProps = {
    title: string;
    titleValue: string;
    icon: React.ReactNode;
    iconColor: string;
};

export const StatusCard = memo((props: StatusCardProps) => {
    return (
        <div className="col-span-1 bg-white px-4 py-6 rounded-lg flex justify-between border border-gray-300">
            <div>
                <div className="text-gray-600">{props.title}</div>
                <div className="text-2xl font-medium max-w-[150px]">{props.titleValue}</div>
            </div>
            <div className={`rounded-full p-2 ${props.iconColor} w-16 h-16`}>{props.icon}</div>
        </div>
    );
});
