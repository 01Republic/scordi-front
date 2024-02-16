import React, {memo} from 'react';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useOnResize2} from '^components/util/onResize2';
import {V3OrgJoinDesktop} from '^v3/V3OrgJoin/desktop';
import {V3OrgJoinMobile} from '^v3/V3OrgJoin/mobile';

export const V3OrgJoin = memo(() => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const isDesktop = useOnResize2();

    if (!orgId || isNaN(orgId)) return <></>;

    return <>{isDesktop ? <V3OrgJoinDesktop /> : <V3OrgJoinMobile />}</>;
});
