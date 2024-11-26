import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface MoreDropdownItemButtonProps extends WithChildren {
    className?: string;
    onClick?: () => any;
}

export const MoreDropdownItemButton = memo((props: MoreDropdownItemButtonProps) => {
    const {className = '', onClick, children} = props;

    return (
        <a
            className={`text-12 flex items-center gap-2 py-2 bg-base-100 font-[500] text-gray-700 ${className}`}
            onClick={onClick}
        >
            {children}
        </a>
    );
});
MoreDropdownItemButton.displayName = 'MoreDropdownItemButton';
