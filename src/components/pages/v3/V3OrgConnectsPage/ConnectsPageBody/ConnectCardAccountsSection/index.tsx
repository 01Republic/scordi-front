import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {MethodsSection} from '../MethodsSection';
import {ConnectMethodCard} from '../ConnectMethodCard';
import {V3OrgConnectCardCreatePageRoute} from '^pages/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]/new';
import {V3OrgConnectDetailPageRoute} from '^pages/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]';
import {orgIdParamState} from '^atoms/common';
import {cardAccountsStaticData} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectCardAccountsSection/card-accounts-static-data';

export const ConnectCardAccountsSection = memo(function ConnectCardAccountsSection() {
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <MethodsSection id="card-accounts" title="카드" description="구독의 최종 결제내역을 불러올 수 있어요.">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {cardAccountsStaticData.map((connectMethod, i) => {
                    const detailPath = V3OrgConnectDetailPageRoute.path(orgId, connectMethod.param);
                    const createPath = V3OrgConnectCardCreatePageRoute.path(orgId, connectMethod.param);

                    return (
                        <ConnectMethodCard
                            key={i}
                            logo={connectMethod.logo}
                            title={connectMethod.displayName}
                            href={createPath}
                        />
                    );
                })}
            </div>
        </MethodsSection>
    );
});
