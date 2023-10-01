import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface TopNavMobileContainerProps extends WithChildren {}

export const TopNavMobileContainer = memo((props: TopNavMobileContainerProps) => {
    const {children} = props;

    return (
        <>
            <div
                data-component="TopNavMobileContainer"
                className="flex container-fluid items-center justify-between fixed w-full top-0 min-h-[50px] h-[50px] bg-white z-10"
            >
                {children}
            </div>
            <div
                data-component="TopNavMobileContainerBackdrop"
                className="w-full sticky top-0 min-h-[50px] h-[50px] bg-white"
            />
        </>
    );
});
