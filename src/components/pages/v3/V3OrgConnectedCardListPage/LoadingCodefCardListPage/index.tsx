import {memo} from 'react';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {LoadingCodefCardListPageHeader} from './LoadingCodefCardListPageHeader';
import {useCodefAccountPageSubject} from '^v3/V3OrgConnectedCardListPage/atom';

export const LoadingCodefCardListPage = memo(() => {
    return (
        <div className="py-10 px-12">
            <LoadingCodefCardListPageHeader />

            <div>
                <section className="flex items-center justify-center">
                    <div>loading...</div>
                </section>
            </div>
        </div>
    );
});
LoadingCodefCardListPage.displayName = 'LoadingCodefCardListPage';
