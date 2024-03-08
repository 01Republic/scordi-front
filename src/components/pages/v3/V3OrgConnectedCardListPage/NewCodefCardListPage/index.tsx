import React, {memo} from 'react';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {NewCodefCardListPageHeader} from './NewCodefCardListPageHeader';
import {NewCodefCardSection} from './NewCodefCardSection';

interface NewCodefCardListPageProps {
    codefAccount: CodefAccountDto;
    staticData: CardAccountsStaticData;
}

export const NewCodefCardListPage = memo((props: NewCodefCardListPageProps) => {
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
