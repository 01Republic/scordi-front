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
import {NewCodefCardListPage} from '^v3/V3OrgConnectedCardListPage/NewCodefCardListPage';
import {codefCardApi} from '^models/CodefCard/api';

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
        <V3MainLayout activeTabIndex={LNBIndex.Connects}>
            {codefAccount && <CardListPage codefAccount={codefAccount} />}
        </V3MainLayout>
    );
});

interface Props {
    codefAccount: CodefAccountDto;
}
const CardListPage = memo((props: Props) => {
    const {codefAccount} = props;
    const connectMethod = cardAccountsStaticData.find((data) => data.param === codefAccount?.organization);
    const newCodefCards = useNewCodefCards(codefAccount.id);
    const connectedCodefCards = useConnectedCodefCards(codefAccount.id);
    const cardListPageMode = useRecoilValue(cardListPageModeAtom);
    const subscriptionsForAccount = useSubscriptionsForAccount(codefAccount.id);

    useEffect(() => {
        if (!codefAccount) return;
        newCodefCards.search({
            where: {accountId: codefAccount.id},
            sync: true,
            connected: false,
        });
        connectedCodefCards.search({
            relations: ['creditCard'],
            where: {accountId: codefAccount.id},
            sync: false,
            connected: true,
        });
        subscriptionsForAccount.search({});
    }, [codefAccount]);

    if (!connectMethod) return <></>;

    if (cardListPageMode === CardListPageMode.NewCards) {
        return <NewCodefCardListPage codefAccount={codefAccount} staticData={connectMethod} />;
    } else {
        return <ConnectedCodefCardListPage codefAccount={codefAccount} staticData={connectMethod} />;
    }
});
