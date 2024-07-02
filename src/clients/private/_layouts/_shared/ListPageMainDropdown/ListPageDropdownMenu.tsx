import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ListPageDropdownMenuProps extends WithChildren {}

export const ListPageDropdownMenu = memo((props: ListPageDropdownMenuProps) => {
    const {children} = props;

    return (
        <div className="dropdown-content menu p-0 shadow-xl bg-white rounded-btn min-w-[220px] !z-[1] text-14">
            {children}
        </div>
    );
});
ListPageDropdownMenu.displayName = 'ListPageDropdownMenu';
