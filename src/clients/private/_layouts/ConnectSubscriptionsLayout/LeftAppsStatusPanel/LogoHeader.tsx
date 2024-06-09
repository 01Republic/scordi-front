import {memo} from 'react';

export const LogoHeader = memo(function LogoHeader() {
    return (
        <div className="flex items-center gap-4">
            <img
                src="/images/logo/scordi/png/symbol/circle/symbol-black-circle.png"
                alt="scordi symbol logo"
                draggable={false}
                loading="lazy"
                className="w-9 p-[2px]"
            />

            <img
                src="/images/logo/scordi/png/text/text-black.png"
                alt="scordi text logo"
                draggable={false}
                loading="lazy"
                className="w-[120px] pb-[2px]"
            />
        </div>
    );
});
