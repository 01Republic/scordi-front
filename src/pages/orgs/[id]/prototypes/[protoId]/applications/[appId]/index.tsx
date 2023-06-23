import React from 'react';
import {useOnResize} from '^hooks/useOnResize';
import {OrgProtoDetailPageMobile} from '^components/pages/OrgProtoDetailPage';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {OrgAppShowPageDesktop} from '^components/pages/OrgAppShowPage';

export const ApplicationDetailPageRoute = pathRoute({
    pathname: '/orgs/[id]/prototypes/[protoId]/applications/[appId]',
    path: (orgId: number, protoId: number, appId: number) =>
        pathReplace(ApplicationDetailPageRoute.pathname, {id: orgId, protoId, appId}),
});

export default function ApplicationDetailPage() {
    const {mobileView} = useOnResize();

    //TODO : ApplicationDetailPageMobile  생성 후 컴포넌트 import해야됨
    return mobileView ? <OrgProtoDetailPageMobile /> : <OrgAppShowPageDesktop />;
}
