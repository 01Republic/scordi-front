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

export const FullLogoImg = memo(function LogoImg2() {
    return (
        <img
            src="/images/renewallogo/base_nav-logo.png"
            alt="scordi logo"
            className="mx-auto h-9 mb-10"
            loading="lazy"
        />
    );
});
