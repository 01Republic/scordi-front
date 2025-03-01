import React, {memo} from 'react';
import {atom, useRecoilState} from 'recoil';
import {FindAllBillingHistoriesQueryDto} from '^models/BillingHistory/type';
import {useBillingHistoryListOfBankAccount} from '^models/BillingHistory/hook';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {useCurrentBankAccount} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountShowPage/atom';

const selectedTabAtomOfBankAccount = atom({
    key: 'selectedTabAtomOfBankAccount',
    default: 0,
});

export const BillingHistoryScopeHandlerOfBankAccount = memo(function () {
    const {currentBankAccount} = useCurrentBankAccount();
    const {search} = useBillingHistoryListOfBankAccount();
    const [selected, setSelected] = useRecoilState(selectedTabAtomOfBankAccount);

    const getBillingHistories = (where: FindAllBillingHistoriesQueryDto['where']) => {
        if (!currentBankAccount) return;
        search({
            where: {
                bankAccountId: currentBankAccount.id,
                organizationId: currentBankAccount.organizationId,
                ...where,
            },
            order: {issuedAt: 'DESC'},
        });
    };

    if (!currentBankAccount) return <></>;

    return (
        <div className="flex items-center gap-2">
            <ListPage.ScopeButton
                text="전체"
                active={selected === 0}
                onClick={() => {
                    setSelected(0);
                    getBillingHistories({});
                }}
            />
            <ListPage.ScopeButton
                text="결제됨"
                active={selected === 1}
                onClick={() => {
                    setSelected(1);
                    getBillingHistories({
                        paidAt: {op: 'not', val: 'NULL'},
                    });
                }}
            />
            <ListPage.ScopeButton
                text="실패"
                active={selected === 2}
                onClick={() => {
                    setSelected(2);
                    getBillingHistories({
                        paidAt: 'NULL',
                    });
                }}
            />
        </div>
    );
});
