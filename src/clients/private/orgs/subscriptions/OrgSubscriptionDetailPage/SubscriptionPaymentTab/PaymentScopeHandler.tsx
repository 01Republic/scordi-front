import React, {memo, useState} from 'react';
import {ScopeButton} from '^clients/private/_components/rest-pages/ListPage/ScopeButton';
import {useAppBillingHistoriesInSubscriptionDetail} from '^models/BillingHistory/hook';
import {FindAllBillingHistoriesQueryDto} from '^models/BillingHistory/type';

export const PaymentScopeHandler = memo(function InviteStatusScopeHandler() {
    const [selected, setSelected] = useState<number>(0);
    const {search} = useAppBillingHistoriesInSubscriptionDetail();

    const getBillingHistories = (where: FindAllBillingHistoriesQueryDto['where'] | null) => {
        search({
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
