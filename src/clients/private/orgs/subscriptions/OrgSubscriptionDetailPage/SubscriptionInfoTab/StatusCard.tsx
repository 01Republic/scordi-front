import {memo, ReactNode} from 'react';
import {WithChildren} from '^types/global.type';

interface StatusCardProps extends WithChildren {
    label: ReactNode;
    value?: ReactNode;
    icon: ReactNode;
    iconColor: string;
}

export const StatusCard = memo((props: StatusCardProps) => {
    const {label, value, icon, iconColor, children} = props;
    return (
        <div className="col-span-1 bg-white py-4 lg:py-6 px-4 rounded-lg flex justify-between border border-gray-300">
            <div className="flex flex-col gap-1 whitespace-nowrap">
                <div className="text-sm text-gray-600">{label}</div>
                <div className="text-xl font-medium max-w-[150px]">{value || children}</div>
            </div>
            <div
                className={`relative size-12 rounded-full flex items-center justify-center md:size-10 lg:size-12 aspect-square ${iconColor}`}
            >
                {icon}
            </div>
        </div>
    );
});
