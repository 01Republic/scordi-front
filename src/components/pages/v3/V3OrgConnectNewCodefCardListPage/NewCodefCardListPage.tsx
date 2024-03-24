import React, {memo} from 'react';
import {NewCodefCardListPageHeader} from './NewCodefCardListPageHeader';
import {NewCodefCardSection} from './NewCodefCardSection';

export const NewCodefCardListPage = memo(() => {
    return (
        <div className="py-10 px-12">
            <NewCodefCardListPageHeader />

            <div className="">
                <NewCodefCardSection />
            </div>
        </div>
    );
});
NewCodefCardListPage.displayName = 'NewCodefCardListPage';
