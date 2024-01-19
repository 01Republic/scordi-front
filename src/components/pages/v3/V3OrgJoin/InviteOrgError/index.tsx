import {memo} from 'react';
import {useOnResize2} from '^components/util/onResize2';
import {V3InviteErrorDesktop} from '^v3/V3OrgJoin/InviteOrgError/desktop';
import {InviteOrgErrorMobile} from '^v3/V3OrgJoin/InviteOrgError/mobile';

export const V3InviteOrgError = memo(() => {
    const isDesktop = useOnResize2();

    return <>{isDesktop ? <V3InviteErrorDesktop /> : <InviteOrgErrorMobile />}</>;
});
