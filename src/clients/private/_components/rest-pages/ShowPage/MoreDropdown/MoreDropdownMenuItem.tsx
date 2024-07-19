import {memo} from 'react';
import {WithChildren} from '^types/global.type';

type MoreDropdownMenuItemSize = 'default' | 'compact' | 'none';
type MoreDropdownMenuItemTheme = 'default' | 'white' | 'scordi' | 'danger' | 'none';

interface MoreDropdownMenuItemProps extends WithChildren {
    onClick: () => any;
    theme?: MoreDropdownMenuItemTheme;
    size?: MoreDropdownMenuItemSize;
}

export const MoreDropdownMenuItem = memo((props: MoreDropdownMenuItemProps) => {
    const {onClick, children, theme = 'default', size = 'default'} = props;

    return (
        <div className="group">
            <div tabIndex={0} onClick={onClick} className={`cursor-pointer ${sizeClass(size)} ${themeClass(theme)}`}>
                {children}
            </div>
        </div>
    );
});
MoreDropdownMenuItem.displayName = 'MoreDropdownMenuItem';

function themeClass(theme: MoreDropdownMenuItemTheme) {
    return {
        none: '',
        default: '!text-gray-800 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100',
        white: 'text-gray-500 !bg-white hover:text-gray-700 focus:text-gray-700 active:text-gray-700',
        scordi: 'text-scordi hover:text-scordi-700 hover:bg-scordi-100 focus:bg-scordi-100 active:bg-scordi-100',
        danger: 'text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 focus:bg-red-100 active:bg-red-100',
    }[theme];
}

function sizeClass(size: MoreDropdownMenuItemSize) {
    return {
        none: '',
        default: 'py-3 px-[10px] text-14',
        compact: 'py-1 px-[10px] text-14',
    }[size];
}
