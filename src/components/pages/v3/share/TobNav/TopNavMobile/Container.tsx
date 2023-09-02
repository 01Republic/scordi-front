import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface TopNavMobileContainerProps extends WithChildren {}

export const TopNavMobileContainer = memo((props: TopNavMobileContainerProps) => {
    const {children} = props;

    return (
        <div className="flex container items-center justify-between sticky top-0 h-[50px] bg-white z-10">
            {children}
        </div>
    );
});
