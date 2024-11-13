import {memo} from 'react';

export const LogoHeader = memo(function LogoHeader() {
    return (
        <div className="flex items-center gap-4 mt-8">
            <img
                src="/images/renewallogo/scordi-symbol-logo.png"
                alt="scordi symbol logo"
                draggable={false}
                loading="lazy"
                className="w-9 p-[2px]"
            />

            <img
                src="/images/renewallogo/scordi-text-loco.png"
                alt="scordi text logo"
                draggable={false}
                loading="lazy"
                className="w-[120px] pb-[2px]"
            />
        </div>
    );
});
