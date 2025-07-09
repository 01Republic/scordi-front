import React, {memo, useState} from 'react';
import {Plus, RotateCw} from 'lucide-react';
import Tippy from '@tippyjs/react';
import {useCurrentInvoiceAccount} from '../../atom';
import {useSubscriptionListOfInvoiceAccount} from '^models/InvoiceAccount/hook';
import {LinkTo} from '^components/util/LinkTo';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {InvoiceAccountSubscriptionTableHeader} from './InvoiceAccountSubscriptionTableHeader';
import {InvoiceAccountSubscriptionTableRow} from './InvoiceAccountSubscriptionTableRow';
import {InvoiceAccountAddSubscriptionModal} from './InvoiceAccountAddSubscriptionModal';

export const SubscriptionListOfInvoiceAccountTabContent = memo(function SubscriptionListOfInvoiceAccountTabContent() {
    const {currentInvoiceAccount, reload: reloadCurrentInvoiceAccount} = useCurrentInvoiceAccount();
    const [isAddSubscriptionModalOpened, setAddSubscriptionModalOpened] = useState(false);
    const {isLoading, isEmptyResult, search, result, reload, movePage, changePageSize, orderBy} =
        useSubscriptionListOfInvoiceAccount(currentInvoiceAccount, {
            relations: ['master', 'invoiceAccounts', 'creditCard'],
            where: {
                // @ts-ignore
                invoiceAccounts: {id: currentInvoiceAccount?.id},
            },
            order: {nextComputedBillingDate: 'DESC', id: 'DESC'},
        });

    if (!currentInvoiceAccount) return <></>;

    const AddSubscriptionButton = () => (
        <LinkTo onClick={() => setAddSubscriptionModalOpened(true)} className="btn btn-scordi gap-2" loadingOnBtn>
            <Plus />
            <span>구독 연결</span>
        </LinkTo>
    );

    const refresh = () => Promise.allSettled([reload(), reloadCurrentInvoiceAccount()]);
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
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-18">
                            <b className="text-scordi">{totalItemCount.toLocaleString()}개</b>의 구독이 연결되어있어요
                        </h3>

                        <Tippy className="!text-10" content="목록 새로고침">
                            <button
                                className={`btn btn-xs btn-circle ${isLoading ? 'animate-spin' : ''}`}
                                onClick={() => reload()}
                            >
                                <RotateCw fontSize={14} />
                            </button>
                        </Tippy>
                    </div>

                    <div className="flex items-center gap-2">
                        {currentInvoiceAccount.isManuallyCreated && (
                            <button
                                className="btn btn-sm bg-white border-gray-300 hover:bg-white hover:border-gray-500 gap-2"
                                onClick={() => setAddSubscriptionModalOpened(true)}
                            >
                                <Plus />
                                <span>구독 연결하기</span>
                            </button>
                        )}
                    </div>
                </div>

                {isEmptyResult ? (
                    <EmptyTable
                        message="연결된 구독이 없어요."
                        Buttons={currentInvoiceAccount.isManuallyCreated ? AddSubscriptionButton : undefined}
                    />
                ) : (
                    <ListTable
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => <InvoiceAccountSubscriptionTableHeader orderBy={orderBy} />}
                        Row={({item}) => <InvoiceAccountSubscriptionTableRow subscription={item} reload={refresh} />}
                    />
                )}
            </ListTableContainer>

            <InvoiceAccountAddSubscriptionModal
                isOpened={isAddSubscriptionModalOpened}
                onClose={() => setAddSubscriptionModalOpened(false)}
                onCreate={async () => {
                    setAddSubscriptionModalOpened(false);
                    await refresh();
                }}
                invoiceAccountId={currentInvoiceAccount.id}
            />
        </section>
    );
});
