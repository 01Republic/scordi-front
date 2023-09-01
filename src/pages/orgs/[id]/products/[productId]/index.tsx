import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useOnResize} from '^hooks/useOnResize';
import {OrgProtoDetailPageDesktop, OrgProtoDetailPageMobile} from '^components/pages/OrgProtoDetailPage';

export const OrgProtoDetailPageRoute = pathRoute({
    pathname: '/orgs/[id]/products/[productId]',
    path: (orgId: number, productId: number) => pathReplace(OrgProtoDetailPageRoute.pathname, {id: orgId, productId}),
});

export default function OrgProtoDetailPage() {
    const {isMobile} = useOnResize();

    return isMobile ? <OrgProtoDetailPageMobile /> : <OrgProtoDetailPageDesktop />;
}
