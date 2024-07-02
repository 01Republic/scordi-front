import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ListPageDropdownProps extends WithChildren {}

export const ListPageDropdown = memo((props: ListPageDropdownProps) => {
    const {children} = props;

    return <div className="dropdown dropdown-bottom dropdown-end">{children}</div>;
});
ListPageDropdown.displayName = 'ListPageDropdown';
