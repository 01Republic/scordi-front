import {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {allFulfilled} from '^utils/array';
import {errorToast} from '^api/api';
import {SubscriptionDto} from '^models/Subscription/types';
import {subscriptionApi} from '^models/Subscription/api';
import {subscriptionConnectedCodefBanksAtom, subscriptionConnectedCodefCardsAtom} from '^models/CodefCard/atom';
import {ConnectionSubscriptionList} from '^_components/pages/assets/connect-steps/AssetConnectSuccessPageTemplate/ConnectionSubscriptionList';

export const OrgSubscriptionConnectionSuccessPage = memo(function OrgSubscriptionConnectionSuccessPage() {
    const syncCodefCards = useRecoilValue(subscriptionConnectedCodefCardsAtom);
    const syncCodefBanks = useRecoilValue(subscriptionConnectedCodefBanksAtom);

    const onSync = async (): Promise<SubscriptionDto[]> => {
        const bankRes = await allFulfilled(
            syncCodefBanks.map((codefBank) =>
                subscriptionApi.index({
                    relations: ['master'],
                    where: {bankAccountId: codefBank.bankAccountId},
                    order: {nextComputedBillingDate: 'DESC', id: 'DESC'},
                }),
            ),
        );

        const cardRes = await allFulfilled(
            syncCodefCards.map((codefCard) =>
                subscriptionApi.index({
                    relations: ['master'],
                    where: {creditCardId: codefCard.creditCardId},
                    order: {nextComputedBillingDate: 'DESC', id: 'DESC'},
                }),
            ),
        );

        return [...bankRes, ...cardRes].flatMap((res) => res.data.items);
    };

    return <ConnectionSubscriptionList onSync={onSync} />;
});
