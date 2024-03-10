import React, {memo, useEffect} from 'react';
import {useNewCodefCards} from '^models/CodefCard/hook';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {NewCodefCard} from './NewCodefCard';

interface Props {
    codefAccount: CodefAccountDto;
    staticData: CardAccountsStaticData;
}

export const NewCodefCardSection = memo(function NewCodefCardSection(props: Props) {
    const {codefAccount, staticData} = props;
    const {result} = useNewCodefCards(codefAccount.id);

    if (result.pagination.totalItemCount === 0) return <></>;

    return (
        <section>
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-4">
                {result.items.map((codefCard, i) => (
                    <NewCodefCard key={i} codefCard={codefCard} staticData={staticData} />
                ))}
            </div>
        </section>
    );
});
