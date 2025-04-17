import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface MoreDropdownMenuProps extends WithChildren {
    className?: string;
}

export const MoreDropdownMenu = memo((props: MoreDropdownMenuProps) => {
    const {className = '', children} = props;

    return (
        <div
            className={`dropdown-content text-14 menu p-0 shadow-xl bg-white border rounded-md min-w-[180px] !z-[1] ${className}`}
        >
            {children}
        </div>
    );
});
MoreDropdownMenu.displayName = 'MoreDropdownMenu';
