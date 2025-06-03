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
        <div className="col-span-1 bg-white py-4 lg:py-6 px-4 rounded-lg flex justify-between border border-gray-300">
            <div className="flex flex-col gap-1 whitespace-nowrap">
                <div className="text-sm text-gray-600">{title}</div>
                <div className="text-xl font-medium max-w-[150px]">{titleValue}</div>
            </div>
            <div
                className={`size-12 rounded-full flex items-center justify-center md:size-10 lg:size-12 aspect-square ${iconColor}`}
            >
                {icon}
            </div>
        </div>
    );
});
