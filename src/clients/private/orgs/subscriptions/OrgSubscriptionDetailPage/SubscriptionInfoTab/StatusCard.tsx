import React, {memo} from 'react';

interface StatusCardProps {
    title: string;
    titleValue: string;
    icon: React.ReactNode;
    iconColor: string;
}

export const StatusCard = memo((props: StatusCardProps) => {
    const {title, titleValue, icon, iconColor} = props;
    return (
        <div className="col-span-1 bg-white px-4 py-6 rounded-lg flex justify-between border border-gray-300">
            <div className="flex flex-col justify-between">
                <div className="text-gray-600">{title}</div>
                <div className="text-2xl font-medium max-w-[150px]">{titleValue}</div>
            </div>
            <div className={` rounded-full p-2 ${iconColor} w-16 h-16`}>{icon}</div>
        </div>
    );
});
