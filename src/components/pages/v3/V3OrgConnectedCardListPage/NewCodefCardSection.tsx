import React, {memo, useEffect} from 'react';
import {useNewCodefCards} from '^models/CodefCard/hook';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {NewCodefCard} from '^v3/V3OrgConnectedCardListPage/NewCodefCard';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';

interface Props {
    codefAccount: CodefAccountDto;
    staticData: CardAccountsStaticData;
}

export const NewCodefCardSection = memo(function NewCodefCardSection(props: Props) {
    const {codefAccount, staticData} = props;
    const {isLoading, result, search} = useNewCodefCards(codefAccount.id);

    useEffect(() => {
        if (!codefAccount) return;
        search({
            where: {accountId: codefAccount.id},
            sync: true,
        });
    }, [codefAccount]);

    if (isLoading) return <>loading...</>;
    if (result.pagination.totalItemCount === 0) return <></>;

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-8">새로 발견한 카드</h3>

            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-4">
                {result.items.map((codefCard, i) => (
                    <NewCodefCard key={i} codefCard={codefCard} staticData={staticData} />
                ))}
            </div>
        </section>
    );
});
