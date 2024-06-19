import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface MainTabButtonProps extends WithChildren {
    onClick?: () => any;
    active?: boolean;
}

export const MainTabButton = memo((props: MainTabButtonProps) => {
    const {onClick, active = false, children} = props;

    return (
        <div
            className={`group relative py-4 cursor-pointer ${
                active ? 'text-scordi' : 'hover:text-black'
            } border-scordi transition-all`}
            onClick={onClick}
        >
            <div>{children}</div>
            <span className={`absolute bottom-0 block w-full bg-scordi ${active ? 'h-[3px]' : 'h-0'} transition-all`} />
        </div>
    );
});
MainTabButton.displayName = 'MainTabButton';
