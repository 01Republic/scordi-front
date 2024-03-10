import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {codefAccountApi} from '^models/CodefAccount/api';
import {codefAccountAtom} from '^models/CodefAccount/atom';
import {cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {useConnectedCodefCards, useNewCodefCards, useSubscriptionsForAccount} from '^models/CodefCard/hook';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {ConnectedCodefCardListPage} from '^v3/V3OrgConnectedCardListPage/ConnectedCodefCardListPage';
import {CardListPageMode, cardListPageModeAtom} from '^v3/V3OrgConnectedCardListPage/atom';
import {
    BillingHistoryDetailModalInAppShow,
    NewBillingHistoryModalInAppShow,
    SubscriptionDetailModal,
} from '^v3/V3OrgAppsPage/_localModals';
import {TeamMemberShowModal} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';
import {AccountListModal} from '^v3/share/modals/AccountListModal';
import {InvoiceAccountSelectModal} from '^v3/share/modals/InvoiceAccountSelectModal';
import {LoadingCodefCardListPage} from '^v3/V3OrgConnectedCardListPage/LoadingCodefCardListPage';
import {useRouter} from 'next/router';
import {V3OrgConnectNewCardListPageRoute} from '^pages/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]/cards/new';

export const V3OrgConnectedCardListPage = memo(function V3OrgConnectedCardListPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const codefAccountId = useRecoilValue(codefAccountIdParamState);
    const [codefAccount, setCodefAccount] = useRecoilState(codefAccountAtom);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!codefAccountId || isNaN(codefAccountId)) return;

        codefAccountApi.show(orgId, codefAccountId).then((res) => setCodefAccount(res.data));
    }, [orgId, codefAccountId]);

    return (
        <V3MainLayout
            activeTabIndex={LNBIndex.Connects}
            modals={[
                SubscriptionDetailModal,
                BillingHistoryDetailModalInAppShow,
                NewBillingHistoryModalInAppShow,
                TeamMemberShowModal,
                AccountListModal,
                InvoiceAccountSelectModal,
            ]}
        >
            {codefAccount && <CardListPage codefAccount={codefAccount} />}
        </V3MainLayout>
    );
});

interface Props {
    codefAccount: CodefAccountDto;
}
const CardListPage = memo((props: Props) => {
    const {codefAccount} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const codefAccountId = useRecoilValue(codefAccountIdParamState);
    const router = useRouter();
    const connectMethod = cardAccountsStaticData.find((data) => data.param === codefAccount?.organization);
    const newCodefCards = useNewCodefCards(codefAccount.id);
    const connectedCodefCards = useConnectedCodefCards(codefAccount.id);
    const subscriptionsForAccount = useSubscriptionsForAccount(codefAccount.id);
    const [cardListPageMode, setPageMode] = useRecoilState(cardListPageModeAtom);

    useEffect(() => {
        if (!codefAccount) return;
        if (cardListPageMode !== CardListPageMode.IsLoading) return;
        newCodefCards.search({
            where: {accountId: codefAccount.id},
            sync: true,
            connected: false,
        });
        connectedCodefCards
            .search(
                {
                    relations: ['creditCard'],
                    where: {accountId: codefAccount.id},
                    sync: false,
                    connected: true,
                },
                false,
                true,
            )
            .then((res) => {
                const cardCount = res?.pagination.totalItemCount || 0;
                if (!cardCount) {
                    router.replace(V3OrgConnectNewCardListPageRoute.path(orgId, codefAccountId));
                }
            });
        subscriptionsForAccount.search({});
    }, [codefAccount, cardListPageMode]);

    if (!connectMethod) return <></>;

    if (cardListPageMode === CardListPageMode.ConnectedCards) {
        return <ConnectedCodefCardListPage codefAccount={codefAccount} staticData={connectMethod} />;
    } else {
        return <LoadingCodefCardListPage codefAccount={codefAccount} staticData={connectMethod} />;
    }
});
