import {memo} from 'react';

export const LogoImg = memo(function LogoImg() {
    return (
        <img
            src="/images/renewallogo/scordi-text-loco.png"
            alt="scordi logo"
            className="mx-auto h-10 mb-10"
            loading="lazy"
        />
    );
});
