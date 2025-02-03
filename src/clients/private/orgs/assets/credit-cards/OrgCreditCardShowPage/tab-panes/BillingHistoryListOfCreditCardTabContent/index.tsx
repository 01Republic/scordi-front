import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import Tippy from '@tippyjs/react';
import {orgIdParamState} from '^atoms/common';
import {useBillingHistoryListOfCreditCard} from '^models/BillingHistory/hook';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCurrentCreditCard} from '../../atom';
import {BillingHistoryTableControl} from './BillingHistoryTableControl';
import {BillingHistoryTableHeaderOfCreditCard} from './BillingHistoryTableHeaderOfCreditCard';
import {BillingHistoryRowOfCreditCard} from './BillingHistoryRowOfCreditCard';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {SubscriptionDto} from '^models/Subscription/types';
import {confirm2, confirmed} from '^components/util/dialog';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {billingHistoryApi} from '^models/BillingHistory/api';

export const BillingHistoryListOfCreditCardTabContent = memo(function BillingHistoryListOfCreditCardTabContent() {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentCreditCard} = useCurrentCreditCard();
    const {isLoading, isEmptyResult, isNotLoaded, search, result, reload, movePage, changePageSize, orderBy} =
        useBillingHistoryListOfCreditCard();

    const onReady = () => {
        if (!currentCreditCard) return;
        search({
            relations: ['subscription'],
            where: {
                creditCardId: currentCreditCard.id,
                organizationId: orgId,
            },
            order: {issuedAt: 'DESC'},
        });
    };

    useEffect(() => {
        onReady();
    }, [currentCreditCard]);

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
            .then(() => toast.success('결제내역을 삭제했어요.'))
            .then(() => reload())
            .catch(errorToast);
    };

    if (!currentCreditCard) return <></>;

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
                <BillingHistoryTableControl />
                {isEmptyResult ? (
                    <EmptyTable message="결제된 내역이 없어요." />
                ) : (
                    <ListTable
                        items={result.items}
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
