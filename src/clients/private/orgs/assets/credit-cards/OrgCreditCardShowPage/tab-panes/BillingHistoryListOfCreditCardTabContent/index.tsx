import React, {memo, useEffect} from 'react';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useBillingHistoryListOfCreditCard2} from '^models/BillingHistory/hook';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCurrentCreditCard} from '../../atom';
import {BillingHistoryTableControl} from './BillingHistoryTableControl';
import {BillingHistoryTableHeaderOfCreditCard} from './BillingHistoryTableHeaderOfCreditCard';
import {BillingHistoryRowOfCreditCard} from './BillingHistoryRowOfCreditCard';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {confirm2, confirmed} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {billingHistoryApi} from '^models/BillingHistory/api';

interface BillingHistoryListOfCreditCardTabContentProps {
    excelUploadModalClose: () => void;
}

export const BillingHistoryListOfCreditCardTabContent = memo(function BillingHistoryListOfCreditCardTabContent(
    props: BillingHistoryListOfCreditCardTabContentProps,
) {
    const {excelUploadModalClose} = props;
    const organizationId = useOrgIdParam();
    const creditCardId = useIdParam('creditCardId');
    const {currentCreditCard} = useCurrentCreditCard();
    const queryResult = useBillingHistoryListOfCreditCard2(organizationId, creditCardId, {
        relations: ['subscription'],
        order: {issuedAt: 'DESC'},
    });
    const {
        query,
        isFetching: isLoading,
        isEmptyResult,
        data,
        search,
        refetch: reload,
        movePage,
        changePageSize,
        orderBy,
    } = queryResult;

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

    if (!currentCreditCard) return <></>;

    const {totalItemCount} = data.pagination;

    return (
        <section className="py-4">
            <ListTableContainer
                pagination={data.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                hideTopPaginator
                hideBottomPaginator={totalItemCount === 0}
            >
                <BillingHistoryTableControl
                    creditCard={currentCreditCard}
                    excelUploadModalClose={excelUploadModalClose}
                    query={query}
                    data={data}
                    search={search}
                    isLoading={isLoading}
                    refetch={reload}
                />

                {isEmptyResult ? (
                    <EmptyTable message="결제된 내역이 없어요." />
                ) : (
                    <ListTable
                        items={data.items}
                        isLoading={isLoading}
                        Header={() => <BillingHistoryTableHeaderOfCreditCard orderBy={orderBy} />}
                        Row={({item}) => (
                            <BillingHistoryRowOfCreditCard item={item} onSaved={() => reload()} onDelete={onDelete} />
                        )}
                    />
                )}
            </ListTableContainer>
        </section>
    );
});
