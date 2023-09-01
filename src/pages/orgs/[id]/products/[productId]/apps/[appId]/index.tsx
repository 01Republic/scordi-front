import React from 'react';
import {useOnResize} from '^hooks/useOnResize';
import {OrgProtoDetailPageMobile} from '^components/pages/OrgProtoDetailPage';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {OrgAppShowPageDesktop} from '^components/pages/OrgAppShowPage';

export const ApplicationDetailPageRoute = pathRoute({
    pathname: '/orgs/[id]/products/[productId]/apps/[appId]',
    path: (orgId: number, productId: number, subId: number) =>
        pathReplace(ApplicationDetailPageRoute.pathname, {id: orgId, productId, subId}),
});

export default function ApplicationDetailPage() {
    const {isMobile} = useOnResize();

    //TODO : ApplicationDetailPageMobile  생성 후 컴포넌트 import해야됨
    return isMobile ? <OrgProtoDetailPageMobile /> : <OrgAppShowPageDesktop />;
}
