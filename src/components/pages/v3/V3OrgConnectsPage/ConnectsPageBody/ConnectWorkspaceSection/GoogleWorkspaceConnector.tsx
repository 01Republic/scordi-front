import {memo} from 'react';
import {ConnectMethodCard} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectMethodCard';
import {Connectors, V3OrgConnectorDetailPageRoute} from '^pages/v3/orgs/[orgId]/connects/[connectorName]';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

export const GoogleWorkspaceConnector = memo(function GoogleWorkspaceConnector() {
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <ConnectMethodCard
            logo="https://fonts.gstatic.com/s/i/productlogos/admin_2020q4/v6/192px.svg"
            title="구글 워크스페이스"
            comment="관리자 연동"
            href={V3OrgConnectorDetailPageRoute.path(orgId, Connectors.googleWorkspace)}
        />
    );
});
