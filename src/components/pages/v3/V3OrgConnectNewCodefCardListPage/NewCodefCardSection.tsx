import React, {memo, useEffect} from 'react';
import {useNewCodefCards} from '^models/CodefCard/hook';
import {NewCodefCard} from './NewCodefCard';
import {codefAccountIdParamState} from '^atoms/common';
import {useCodefAccountPageSubject} from '^v3/V3OrgConnectedCardListPage/atom';

export const NewCodefCardSection = memo(function NewCodefCardSection() {
    const {connectMethod} = useCodefAccountPageSubject();
    const {result} = useNewCodefCards(codefAccountIdParamState);

    if (!connectMethod) return <></>;
    if (result.pagination.totalItemCount === 0) return <></>;

    return (
        <section>
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-4">
                {result.items.map((codefCard, i) => (
                    <NewCodefCard key={i} codefCard={codefCard} staticData={connectMethod} />
                ))}
            </div>
        </section>
    );
});
