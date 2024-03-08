import React, {memo} from 'react';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {NewCodefCardFoundedBanner} from '^v3/V3OrgConnectedCardListPage/ConnectedCodefCardListPage/NewCodefCardFoundedBanner';
import {ConnectedCardListPageHeader} from './ConnectedCardListPageHeader';
import {ConnectedCodefCard} from './ConnectedCodefCard';
import {useConnectedCodefCards} from '^models/CodefCard/hook';
import {CodefCardListSection} from './CodefCardListSection';
import {SubscriptionListSection} from './SubscriptionListSection';

interface ConnectedCodefCardListPageProps {
    codefAccount: CodefAccountDto;
    staticData: CardAccountsStaticData;
}

export const ConnectedCodefCardListPage = memo((props: ConnectedCodefCardListPageProps) => {
    const {codefAccount, staticData} = props;
    const {result} = useConnectedCodefCards(codefAccount.id);

    return (
        <>
            <NewCodefCardFoundedBanner codefAccount={codefAccount} />

            <div className="py-10 px-12">
                <ConnectedCardListPageHeader codefAccount={codefAccount} staticData={staticData} />

                <div className="">
                    <section className="lg:grid grid-cols-5 gap-12">
                        <CodefCardListSection codefAccount={codefAccount} staticData={staticData} />
                        <SubscriptionListSection codefAccount={codefAccount} staticData={staticData} />
                    </section>
                </div>
            </div>
        </>
    );
});
ConnectedCodefCardListPage.displayName = 'ConnectedCodefCardListPage';
