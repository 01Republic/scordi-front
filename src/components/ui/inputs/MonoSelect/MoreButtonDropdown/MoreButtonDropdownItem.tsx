import {WithChildren} from '^types/global.type';
import React from 'react';

interface MoreButtonDropdownItemProps extends WithChildren {
    onClick: () => any;
}

export function MoreButtonDropdownItem(props: MoreButtonDropdownItemProps) {
    const {children, onClick} = props;

    return (
        <div
            className="px-3 py-1 text-gray-500 text-14 bg-white rounded-md transition-all hover:text-scordi hover:bg-scordi-50 cursor-pointer"
            onClick={onClick}
        >
            {children}
        </div>
    );
}
