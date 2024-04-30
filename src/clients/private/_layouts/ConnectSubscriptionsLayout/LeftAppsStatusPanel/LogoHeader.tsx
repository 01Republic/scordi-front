import {memo} from 'react';

export const LogoHeader = memo(function LogoHeader() {
    return (
        <img
            src="/images/logo/scordi/png/symbol_and_text/symbol_and_text--primary.png"
            alt=""
            draggable={false}
            loading="lazy"
            className="w-[140px]"
        />
    );
});
