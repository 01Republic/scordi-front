import React, {memo, useEffect, useState} from 'react';
import {ListPageScopeButton} from '^clients/private/_layouts/_shared/ListPageScopeButton';
import {useCurrentCreditCard} from '../../atom';
import {useBillingHistoryListOfCreditCard} from '^models/BillingHistory/hook';
import {FindAllBillingHistoriesQueryDto} from '^models/BillingHistory/type';

interface BillingHistoryScopeHandlerProps {
    //
}

export const BillingHistoryScopeHandler = memo((props: BillingHistoryScopeHandlerProps) => {
    const {} = props;
    const {currentCreditCard} = useCurrentCreditCard();
    const {search, query} = useBillingHistoryListOfCreditCard();
    const [selected, setSelected] = useState(0);

    const getBillingHistories = async (where: FindAllBillingHistoriesQueryDto['where']) => {
        if (!currentCreditCard) return;

        search({
            relations: ['subscription'],
            where: {
                creditCardId: currentCreditCard.id,
                organizationId: currentCreditCard.organizationId,
                ...where,
            },
            order: {issuedAt: 'DESC'},
        });
    };

    if (!currentCreditCard) return <></>;

    return (
        <div className="flex items-center gap-2">
            <ListPageScopeButton
                text="전체"
                active={selected === 0}
                onClick={() => {
                    setSelected(0);
                    getBillingHistories({});
                }}
            />
            <ListPageScopeButton
                text="결제됨"
                active={selected === 1}
                onClick={() => {
                    setSelected(1);
                    getBillingHistories({
                        paidAt: {op: 'not', val: 'NULL'},
                    });
                }}
            />
            {/*<ListPageScopeButton*/}
            {/*    text="예정"*/}
            {/*    active={selected === 2}*/}
            {/*    onClick={() => {*/}
            {/*        setSelected(2);*/}
            {/*        getBillingHistories({paidAt: 'NULL'});*/}
            {/*    }}*/}
            {/*/>*/}
            <ListPageScopeButton
                text="실패"
                active={selected === 3}
                onClick={() => {
                    setSelected(3);
                    getBillingHistories({
                        paidAt: 'NULL',
                        issuedAt: {op: 'not', val: 'NULL'},
                    });
                }}
            />
        </div>
    );
});
BillingHistoryScopeHandler.displayName = 'BillingHistoryScopeHandler';
