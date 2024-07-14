import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface MoreDropdownListItemProps extends WithChildren {
    onClick: () => any;
    theme?: 'default' | 'white' | 'scordi' | 'danger';
}

export const MoreDropdownListItem = memo((props: MoreDropdownListItemProps) => {
    const {onClick, children, theme = 'default'} = props;

    return (
        <li onClick={onClick} className="cursor-pointer">
            <div className={`text-sm !rounded-[4px] py-1 px-[10px] ${themeClass(theme)}`}>{children}</div>
        </li>
    );
});
MoreDropdownListItem.displayName = 'MoreDropdownListItem';

function themeClass(theme: 'default' | 'white' | 'scordi' | 'danger') {
    return {
        default: '!text-gray-800 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100',
        white: 'text-gray-500 !bg-white hover:text-gray-700 focus:text-gray-700 active:text-gray-700',
        scordi: 'text-scordi hover:text-scordi-700 hover:bg-scordi-100 focus:bg-scordi-100 active:bg-scordi-100',
        danger: 'text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 focus:bg-red-100 active:bg-red-100',
    }[theme];
}
