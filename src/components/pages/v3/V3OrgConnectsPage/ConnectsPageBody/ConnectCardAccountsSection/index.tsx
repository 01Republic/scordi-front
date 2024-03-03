import {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {MethodsSection} from '../MethodsSection';
import {ConnectMethodCard} from '../ConnectMethodCard';
import {orgIdParamState} from '^atoms/common';
import {V3OrgConnectedCardListPageRoute} from '^pages/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]/cards';
import {V3OrgConnectCardCreatePageRoute} from '^pages/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]/new';
import {cardAccountsStaticData} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectCardAccountsSection/card-accounts-static-data';
import {useCodefAccountsInConnector} from '^models/CodefAccount/hook';

export const ConnectCardAccountsSection = memo(function ConnectCardAccountsSection() {
    const orgId = useRecoilValue(orgIdParamState);
    const {
        result: {items},
        search,
    } = useCodefAccountsInConnector();

    useEffect(() => {
        search({itemsPerPage: 0});
    }, [orgId]);

    const codefAccounts = items;

    return (
        <MethodsSection id="card-accounts" title="카드" description="구독의 최종 결제내역을 불러올 수 있어요.">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {cardAccountsStaticData.map((connectMethod, i) => {
                    const codefAccount = codefAccounts.find((account) => {
                        return (
                            account.clientType === connectMethod.clientType &&
                            account.organization === connectMethod.param
                        );
                    });

                    const href = codefAccount
                        ? V3OrgConnectedCardListPageRoute.path(orgId, codefAccount.id)
                        : V3OrgConnectCardCreatePageRoute.path(orgId, connectMethod.param);

                    return (
                        <ConnectMethodCard
                            key={i}
                            logo={connectMethod.logo}
                            title={connectMethod.displayName}
                            href={href}
                            connected={!!codefAccount}
                        />
                    );
                })}
            </div>
        </MethodsSection>
    );
});
