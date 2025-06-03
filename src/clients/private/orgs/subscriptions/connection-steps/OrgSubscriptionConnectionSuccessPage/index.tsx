import {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {AssetConnectSuccessPageTemplate} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {connectedAssetsAtom} from '../atom';

export const OrgSubscriptionConnectionSuccessPage = memo(function OrgSubscriptionConnectionSuccessPage() {
    const router = useRouter();
    const orgId = useOrgIdParam();

    const connectedAssets = useRecoilValue(connectedAssetsAtom);

    return (
        <AssetConnectSuccessPageTemplate
            assets={connectedAssets}
            onNext={() => router.push(OrgSubscriptionListPageRoute.path(orgId))}
        />
    );
});
