import {memo} from 'react';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {LoadingCodefCardListPageHeader} from './LoadingCodefCardListPageHeader';

interface LoadingCodefCardListPageProps {
    codefAccount: CodefAccountDto;
    staticData: CardAccountsStaticData;
}

export const LoadingCodefCardListPage = memo((props: LoadingCodefCardListPageProps) => {
    const {codefAccount, staticData} = props;

    return (
        <div className="py-10 px-12">
            <LoadingCodefCardListPageHeader codefAccount={codefAccount} staticData={staticData} />

            <div>
                <section className="flex items-center justify-center">
                    <div>loading...</div>
                </section>
            </div>
        </div>
    );
});
LoadingCodefCardListPage.displayName = 'LoadingCodefCardListPage';
