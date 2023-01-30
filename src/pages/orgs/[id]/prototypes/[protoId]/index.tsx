import React from 'react';
import {useRouter} from 'next/router';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {useOnResize} from '^hooks/useOnResize';
import {OrgProtoDetailPageDesktop, OrgProtoDetailPageMobile} from '^components/pages/OrgProtoDetailPage';

export const OrgProtoDetailPageRoute = pathRoute({
    pathname: '/orgs/[id]/prototypes/[protoId]',
    path: (orgId: number, protoId: number) => pathReplace(OrgProtoDetailPageRoute.pathname, {id: orgId, protoId}),
});

export default function OrgProtoDetailPage() {
    const {mobileView} = useOnResize();

    return mobileView ? <OrgProtoDetailPageMobile /> : <OrgProtoDetailPageDesktop />;
}
