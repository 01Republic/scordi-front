import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {AssetConnectSuccessPageTemplate} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {connectedAssetsAtom} from '../atom';
import {OrgSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/subscriptions/connection';

export const OrgSubscriptionConnectionSuccessPage = memo(function OrgSubscriptionConnectionSuccessPage() {
    const router = useRouter();
    const orgId = useOrgIdParam();

    const connectedAssets = useRecoilValue(connectedAssetsAtom);

    return (
        <AssetConnectSuccessPageTemplate
            assets={connectedAssets}
            onNext={() => router.replace(OrgSubscriptionListPageRoute.path(orgId))}
            moveFirst={() => router.push(OrgSubscriptionConnectionPageRoute.path(orgId))}
        />
    );
});
