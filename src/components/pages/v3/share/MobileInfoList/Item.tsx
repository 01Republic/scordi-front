import React, {memo} from 'react';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {ChevronRight} from 'lucide-react';

interface MobileInfoListItemProps extends WithChildren {
    label: ReactNodeElement;
    value?: ReactNodeElement;
    className?: string;
    onClick?: () => void;
}

export const MobileInfoListItem = memo((props: MobileInfoListItemProps) => {
    const {label, value, children, onClick, className = ''} = props;

    return (
        <li
            onClick={onClick}
            className={`flex justify-between items-center text-[16px] min-h-[50px] no-selectable ${className} ${
                onClick ? '' : ''
            }`}
        >
            <div className="">{label}</div>
            <div className={`max-w-[70%] text-right transition-all ${onClick ? '' : ''}`}>
                {onClick ? (
                    <div className="flex items-center justify-end gap-2 cursor-pointer text-gray-500 hover:text-gray-700 transition-all">
                        <div>{children || value}</div>
                        <ChevronRight />
                    </div>
                ) : (
                    children || value
                )}
            </div>
        </li>
    );
});
