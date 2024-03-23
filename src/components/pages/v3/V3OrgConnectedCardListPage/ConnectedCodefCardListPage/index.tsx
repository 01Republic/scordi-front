import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {NewCodefCardFoundedBanner} from './NewCodefCardFoundedBanner';
import {ConnectedCardListPageHeader} from './ConnectedCardListPageHeader';
import {CodefCardListSection} from './CodefCardListSection';
import {AllSubscriptionListSection} from './AllSubscriptionListSection';
import {SubscriptionListSection} from './SubscriptionListSection';
import {selectedCodefCardAtom} from './atom';

export const ConnectedCodefCardListPage = memo(() => {
    const selectedCodefCard = useRecoilValue(selectedCodefCardAtom);

    return (
        <>
            <NewCodefCardFoundedBanner />

            <div className="py-10 px-12">
                <ConnectedCardListPageHeader />

                <div className="">
                    <section className="lg:grid grid-cols-5 gap-12">
                        <CodefCardListSection />
                        {selectedCodefCard ? <SubscriptionListSection /> : <AllSubscriptionListSection />}
                    </section>
                </div>
            </div>
        </>
    );
});
ConnectedCodefCardListPage.displayName = 'ConnectedCodefCardListPage';
