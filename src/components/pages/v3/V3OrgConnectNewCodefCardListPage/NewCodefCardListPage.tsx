import React, {memo} from 'react';
import {CodefAccountProps} from './atom';
import {NewCodefCardListPageHeader} from './NewCodefCardListPageHeader';
import {NewCodefCardSection} from './NewCodefCardSection';

export const NewCodefCardListPage = memo((props: CodefAccountProps) => {
    const {codefAccount, staticData} = props;

    return (
        <div className="py-10 px-12">
            <NewCodefCardListPageHeader codefAccount={codefAccount} staticData={staticData} />

            <div className="">
                <NewCodefCardSection codefAccount={codefAccount} staticData={staticData} />
            </div>
        </div>
    );
});
NewCodefCardListPage.displayName = 'NewCodefCardListPage';
