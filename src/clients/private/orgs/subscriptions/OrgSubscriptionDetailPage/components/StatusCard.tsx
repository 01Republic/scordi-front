import React, {memo} from 'react';

type StatusCardProps = {
    title: string;
    titleValue: string | number;
    icon: React.ReactNode;
    iconColor: string;
};

export const StatusCard = memo((props: StatusCardProps) => {
    return (
        <div className={'col-span-1 bg-white px-4 py-6 rounded-lg flex justify-between border border-gray-300'}>
            <div>
                <div className={'text-gray-600'}>{props.title}</div>
                <div className="font-medium text-2xl text-ellipsis w-2/3">{props.titleValue}</div>
            </div>
            <div
                className={`flex items-center justify-center rounded-full h-[50px] w-[50px] p-2 text-white ${props.iconColor}`}
            >
                {props.icon}
            </div>
        </div>
    );
});
