import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface MoreDropdownMenuItemProps extends WithChildren {
    onClick?: () => any;
    className?: string;
}

export const MoreDropdownMenuItem = memo((props: MoreDropdownMenuItemProps) => {
    const {onClick, className = '', children} = props;

    return (
        <div onClick={onClick} className={`cursor-pointer px-2 py-1.5 hover:bg-slate-100 btn-animation ${className}`}>
            {children}
        </div>
    );
});
MoreDropdownMenuItem.displayName = 'MoreDropdownMenuItem';
