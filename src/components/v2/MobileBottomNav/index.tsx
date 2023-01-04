import React from 'react';
import {WithChildren} from '^types/global.type';
import {MobileBottomNavItem} from './MobileBottomNavItem';

const SIZE = {
    NAV_HEIGHT: `70px`,
};

export const MobileBottomNav = ({children}: WithChildren) => {
    return (
        <>
            <section
                data-component="MobileBottomNav--suspension"
                className={`bs-container h-[${SIZE.NAV_HEIGHT}]`}
                style={{height: SIZE.NAV_HEIGHT}}
            />
            <section
                data-component="MobileBottomNav"
                className={`bs-container h-[${SIZE.NAV_HEIGHT}] fixed bg-transparent left-0 bottom-0 items-center`}
                style={{minHeight: SIZE.NAV_HEIGHT}}
            >
                <div className="bs-row h-full max-w-[600px] mx-auto">{children}</div>
            </section>
        </>
    );
};

const MobileBottomNavV2 = ({children}: WithChildren) => {
    return (
        <>
            <div className={`bs-container h-[${SIZE.NAV_HEIGHT}]`} />
            <div
                className={`bs-container h-[${SIZE.NAV_HEIGHT}] fixed bg-white left-0 bottom-0 border border-l-0 border-r-0 border-t-1 items-center`}
            >
                <div className="bs-row h-full">{children}</div>
            </div>
        </>
    );
};

MobileBottomNav.Item = MobileBottomNavItem;
