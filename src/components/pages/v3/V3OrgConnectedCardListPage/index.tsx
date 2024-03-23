import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {ConnectedCodefCardListPage} from '^v3/V3OrgConnectedCardListPage/ConnectedCodefCardListPage';
import {
    CardListPageMode,
    cardListPageModeAtom,
    useCodefAccountPageSubject,
    useConnectedCardListPageData,
} from '^v3/V3OrgConnectedCardListPage/atom';
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
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const codefAccountId = useRecoilValue(codefAccountIdParamState);
    const {data: codefAccount, search} = useCodefAccountPageSubject();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!codefAccountId || isNaN(codefAccountId)) return;

        console.log('\t\tV3OrgConnectedCardListPage.useEffect.codefAccountId', codefAccountId);
        search(orgId, codefAccountId);
    }, [orgId, codefAccountId]);
    console.log('\t\tV3OrgConnectedCardListPage', router.isReady);
    console.log('\t\tV3OrgConnectedCardListPage.codefAccount', codefAccount);

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
    // const {codefAccount} = props;
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const codefAccountId = useRecoilValue(codefAccountIdParamState);
    const {data: codefAccount, connectMethod} = useCodefAccountPageSubject();
    const {search} = useConnectedCardListPageData();
    const [cardListPageMode, setPageMode] = useRecoilState(cardListPageModeAtom);

    console.log('\t\tCardListPage.codefAccount', codefAccount);
    useEffect(() => {
        const setLoading = () => setPageMode(CardListPageMode.IsLoading);
        if (!codefAccountId || isNaN(codefAccountId) || !codefAccount || codefAccountId != codefAccount.id) {
            setLoading();
            return;
        }
    }, [codefAccountId, codefAccount]);

    useEffect(() => {
        if (!codefAccountId || isNaN(codefAccountId)) return;
        if (cardListPageMode !== CardListPageMode.IsLoading) return;

        console.log('\t\tCardListPage.useEffect.codefAccount', codefAccount);
        search(codefAccountId).then((res) => {
            const cardCount = res?.pagination.totalItemCount || 0;
            if (!cardCount) {
                router.replace(V3OrgConnectNewCardListPageRoute.path(orgId, codefAccountId));
            } else {
                setPageMode(CardListPageMode.ConnectedCards);
            }
        });
        // fetchNewCodefCards(
        //     {
        //         where: {accountId: codefAccountId, isSleep: false},
        //         sync: true,
        //         connected: false,
        //     },
        //     false,
        //     // true,
        // );
        // fetchConnectedCodefCards(
        //     {
        //         relations: ['creditCard'],
        //         where: {accountId: codefAccountId},
        //         sync: false,
        //         connected: true,
        //     },
        //     false,
        //     // true,
        // ).then((res) => {
        //     const cardCount = res?.pagination.totalItemCount || 0;
        //     if (!cardCount) {
        //         router.replace(V3OrgConnectNewCardListPageRoute.path(orgId, codefAccountId));
        //     } else {
        //         setPageMode(CardListPageMode.ConnectedCards);
        //     }
        // });
        // fetchAccountSubscriptions({}, false);
    }, [codefAccountId, cardListPageMode]);

    if (!connectMethod) return <></>;

    if (cardListPageMode === CardListPageMode.ConnectedCards) {
        return <ConnectedCodefCardListPage />;
    } else {
        return <LoadingCodefCardListPage />;
    }
});
