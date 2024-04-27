import {memo} from 'react';

export const LogoImg = memo(function LogoImg() {
    return (
        <img
            src="/images/logo/scordi/logo-black-transparent-2.png"
            alt="scordi logo"
            className="mx-auto mb-10"
            loading="lazy"
        />
    );
});
