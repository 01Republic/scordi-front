import React, {memo} from 'react';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useOnResize2} from '^components/util/onResize2';
import {V30JoinDesktop} from '^v3/V3OrgJoin/desktop';
import {V30JoinMobile} from '^v3/V3OrgJoin/mobile';
import {useRouter} from 'next/router';

export const V3OrgJoin = memo(() => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const isDesktop = useOnResize2();
    const router = useRouter();
    const membershipId = Number(router.query.membershipId || '');

    if (!orgId || isNaN(orgId)) return <></>;
    if (!membershipId || isNaN(membershipId)) return <>초대장이 만료되었습니다. 초대를 다시 요청해주세요.</>;

    return <>{isDesktop ? <V30JoinDesktop /> : <V30JoinMobile />}</>;
});
