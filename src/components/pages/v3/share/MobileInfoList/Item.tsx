import React, {memo} from 'react';
import {ReactNodeLike} from 'prop-types';
import {WithChildren} from '^types/global.type';

interface MobileInfoListItemProps extends WithChildren {
    label: ReactNodeLike;
    value?: ReactNodeLike;
    className?: string;
    onClick?: () => void;
}

export const MobileInfoListItem = memo((props: MobileInfoListItemProps) => {
    const {label, value, children, className = '', onClick} = props;

    return (
        <li
            onClick={onClick}
            className={`flex justify-between items-center text-[16px] min-h-[50px] no-selectable ${className} ${
                onClick && 'cursor-pointer'
            }`}
        >
            <div className="">{label}</div>
            <div className="max-w-[70%] text-right font-light">{children || value}</div>
        </li>
    );
});
