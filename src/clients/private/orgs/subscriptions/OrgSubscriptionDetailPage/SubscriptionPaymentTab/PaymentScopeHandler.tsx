import React, {memo, useState} from 'react';
import {ScopeButton} from '^clients/private/_components/rest-pages/ListPage/ScopeButton';
import {FindAllBillingHistoriesQueryDto} from '^models/BillingHistory/type';

interface Props {
    onSearch: (query: FindAllBillingHistoriesQueryDto) => any;
}

export const PaymentScopeHandler = memo(function (props: Props) {
    const {onSearch} = props;
    const [selected, setSelected] = useState<number>(0);

    const getBillingHistories = (where: FindAllBillingHistoriesQueryDto['where'] | null) => {
        onSearch({
            where: {
                ...where,
            },
            order: {paidAt: 'DESC'},
        });
    };

    return (
        <div className="flex items-center gap-2">
            <ScopeButton
                active={selected === 0}
                onClick={() => {
                    setSelected(0);
                    getBillingHistories(null);
                }}
            >
                전체
            </ScopeButton>
            <ScopeButton
                active={selected === 1}
                onClick={() => {
                    setSelected(1);
                    getBillingHistories({paidAt: {op: 'not', val: 'NULL'}});
                }}
            >
                결제됨
            </ScopeButton>
            <ScopeButton
                active={selected === 2}
                onClick={() => {
                    setSelected(2);
                    getBillingHistories({paidAt: 'NULL'});
                }}
            >
                실패
            </ScopeButton>
        </div>
    );
});
