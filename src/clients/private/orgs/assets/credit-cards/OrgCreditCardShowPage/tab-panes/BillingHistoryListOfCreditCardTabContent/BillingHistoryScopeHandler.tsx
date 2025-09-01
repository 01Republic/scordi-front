import React, {memo, useState} from 'react';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {FindAllBillingHistoriesQueryDto} from '^models/BillingHistory/type';

interface BillingHistoryScopeHandlerProps {
    query: FindAllBillingHistoriesQueryDto;
    search: (params: FindAllBillingHistoriesQueryDto) => any;
}

export const BillingHistoryScopeHandler = memo((props: BillingHistoryScopeHandlerProps) => {
    const {query, search} = props;

    const getBillingHistories = async (where: FindAllBillingHistoriesQueryDto['where']) => {
        search({
            where,
            order: {issuedAt: 'DESC'},
        });
    };

    return (
        <div className="flex items-center gap-2">
            <ListPage.ScopeButton
                text="전체"
                active={query.where?.paidAt === undefined}
                onClick={() => {
                    getBillingHistories({});
                }}
            />
            <ListPage.ScopeButton
                text="결제됨"
                active={typeof query.where?.paidAt === 'object'}
                onClick={() => {
                    getBillingHistories({
                        // issuedAt: {op: 'not', val: 'NULL'},
                        paidAt: {op: 'not', val: 'NULL'},
                    });
                }}
            />
            {/*<ListPage.ScopeButton*/}
            {/*    text="예정"*/}
            {/*    active={selected === 2}*/}
            {/*    onClick={() => {*/}
            {/*        setSelected(2);*/}
            {/*        getBillingHistories({paidAt: 'NULL'});*/}
            {/*    }}*/}
            {/*/>*/}
            <ListPage.ScopeButton
                text="실패"
                active={query.where?.paidAt === 'NULL'}
                onClick={() => {
                    getBillingHistories({
                        // issuedAt: {op: 'not', val: 'NULL'},
                        paidAt: 'NULL',
                    });
                }}
            />
        </div>
    );
});
BillingHistoryScopeHandler.displayName = 'BillingHistoryScopeHandler';
