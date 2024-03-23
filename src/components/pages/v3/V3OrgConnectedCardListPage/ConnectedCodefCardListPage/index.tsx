import React, {memo} from 'react';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {NewCodefCardFoundedBanner} from '^v3/V3OrgConnectedCardListPage/ConnectedCodefCardListPage/NewCodefCardFoundedBanner';
import {ConnectedCardListPageHeader} from './ConnectedCardListPageHeader';
import {ConnectedCodefCard} from './ConnectedCodefCard';
import {useConnectedCodefCards} from '^models/CodefCard/hook';
import {CodefCardListSection} from './CodefCardListSection';
import {SubscriptionListSection} from './SubscriptionListSection';

export const ConnectedCodefCardListPage = memo(() => {
    return (
        <>
            <NewCodefCardFoundedBanner />

            <div className="py-10 px-12">
                <ConnectedCardListPageHeader />

                <div className="">
                    <section className="lg:grid grid-cols-5 gap-12">
                        <CodefCardListSection />
                        <SubscriptionListSection />
                    </section>
                </div>
            </div>
        </>
    );
});
ConnectedCodefCardListPage.displayName = 'ConnectedCodefCardListPage';
