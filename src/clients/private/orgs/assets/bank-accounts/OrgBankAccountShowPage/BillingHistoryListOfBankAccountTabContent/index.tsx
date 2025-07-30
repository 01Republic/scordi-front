import React, {memo, useEffect} from 'react';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useOrgIdParam} from '^atoms/common';
import {confirm2, confirmed} from '^components/util/dialog';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {useBillingHistoryListOfBankAccount} from '^models/BillingHistory/hook';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCurrentBankAccount} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountShowPage/atom';

import {BillingHistoryTableHeaderOfBankAccount} from './BillingHistoryTableHeaderOfBankAccount';
import {BillingHistoryRowOfBankAccount} from './BillingHistoryRowOfBankAccount';
import {BillingHistoryTableControl} from './BillingHistoryTableControl';

export const BillingHistoryListOfBankAccountTabContent = memo(function BillingHistoryListOfBankAccountTabContent() {
    const orgId = useOrgIdParam();
    const {currentBankAccount} = useCurrentBankAccount();
    const {isLoading, isEmptyResult, search, result, reload, movePage, changePageSize, orderBy} =
        useBillingHistoryListOfBankAccount();

    const onReady = () => {
        if (!currentBankAccount) return;
        search({
            where: {
                bankAccountId: currentBankAccount.id,
                organizationId: orgId,
            },
            order: {issuedAt: 'DESC'},
        });
    };

    useEffect(() => {
        onReady();
    }, [currentBankAccount]);

    const onDelete = (id: number) => {
        const deleteConfirm = () => {
            return confirm2(
                '결제내역을 삭제할까요?',
                <div className="text-16">
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                    그래도 삭제하시겠어요?
                </div>,
                'warning',
            );
        };

        confirmed(deleteConfirm(), '삭제 취소')
            .then(() => billingHistoryApi.destroy(id))
            .then(() => reload())
            .then(() => toast.success('결제내역을 삭제했어요.'))
            .catch(errorToast);
    };

    if (!currentBankAccount) return <></>;

    const {totalItemCount} = result.pagination;

    return (
        <section className="py-4">
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                hideTopPaginator
                hideBottomPaginator={totalItemCount === 0}
            >
                <BillingHistoryTableControl bankAccount={currentBankAccount} />
                {isEmptyResult ? (
                    <EmptyTable message="결제된 내역이 없어요." />
                ) : (
                    <ListTable
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => <BillingHistoryTableHeaderOfBankAccount orderBy={orderBy} />}
                        Row={({item}) => (
                            <BillingHistoryRowOfBankAccount item={item} onSaved={() => reload()} onDelete={onDelete} />
                        )}
                    />
                )}
            </ListTableContainer>
        </section>
    );
});
