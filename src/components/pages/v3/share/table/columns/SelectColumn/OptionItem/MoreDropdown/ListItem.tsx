import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface MoreDropdownListItemProps extends WithChildren {
    onClick: () => any;
}

export const MoreDropdownListItem = memo((props: MoreDropdownListItemProps) => {
    const {onClick, children} = props;

    return (
        <li onClick={onClick} className="cursor-pointer">
            <div className="text-sm !rounded-[4px] py-1 px-[10px] !text-gray-800 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100">
                {children}
            </div>
        </li>
    );
});
MoreDropdownListItem.displayName = 'MoreDropdownListItem';
