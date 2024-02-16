import React, {memo, useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useOnResize2} from '^components/util/onResize2';
import {V3OrgJoinDesktop} from '^v3/V3OrgJoin/desktop';
import {V3OrgJoinMobile} from '^v3/V3OrgJoin/mobile';
import {invitedOrgIdAtom, isCopiedAtom} from '^v3/V3OrgJoin/atom';

export const V3OrgJoin = memo(() => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const isDesktop = useOnResize2();
    const router = useRouter();
    const setInvitedOrgId = useSetRecoilState(invitedOrgIdAtom);
    const setIsFromInviteLink = useSetRecoilState(isCopiedAtom);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;

        setInvitedOrgId(orgId);
        setIsFromInviteLink(!!router.query.isCopied || false);
    }, [orgId, router.query]);

    if (!orgId || isNaN(orgId)) return <></>;

    return <>{isDesktop ? <V3OrgJoinDesktop /> : <V3OrgJoinMobile />}</>;
});
