import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface TopNavBarDropdownContentProps extends WithChildren {}

export const TopNavBarDropdownContent = memo((props: TopNavBarDropdownContentProps) => {
    const {children} = props;

    return (
        <ul className="dropdown-content text-14 menu -mt-4 p-0 shadow-xl bg-white border rounded-md min-w-[178px]">
            {children}
        </ul>
    );
});
TopNavBarDropdownContent.displayName = 'TopNavBarDropdownContent';
