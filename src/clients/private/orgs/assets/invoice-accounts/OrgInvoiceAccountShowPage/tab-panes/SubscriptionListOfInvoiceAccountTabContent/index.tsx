import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useCurrentInvoiceAccount} from '../../atom';
import {useSubscriptionListOfInvoiceAccount} from '^models/Subscription/hook';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import Tippy from '@tippyjs/react';
import {MdRefresh} from 'react-icons/md';
import {FaPlus} from 'react-icons/fa6';
import {LinkTo} from '^components/util/LinkTo';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {InvoiceAccountSubscriptionTableHeader} from './InvoiceAccountSubscriptionTableHeader';
import {InvoiceAccountSubscriptionTableRow} from './InvoiceAccountSubscriptionTableRow';
import {InvoiceAccountAddSubscriptionModal} from './InvoiceAccountAddSubscriptionModal';

export const SubscriptionListOfInvoiceAccountTabContent = memo(function SubscriptionListOfInvoiceAccountTabContent() {
    const {currentInvoiceAccount, reload: reloadCurrentInvoiceAccount} = useCurrentInvoiceAccount();
    const [isAddSubscriptionModalOpened, setAddSubscriptionModalOpened] = useState(false);
    const {isLoading, isEmptyResult, search, result, reload, movePage, changePageSize, orderBy} =
        useSubscriptionListOfInvoiceAccount();

    const onReady = () => {
        if (!currentInvoiceAccount) return;

        search({
            relations: ['master', 'invoiceAccounts'],
            where: {
                // @ts-ignore
                invoiceAccounts: {id: currentInvoiceAccount.id},
            },
            order: {nextComputedBillingDate: 'DESC', id: 'DESC'},
        });
    };

    const AddSubscriptionButton = () => (
        <LinkTo onClick={() => setAddSubscriptionModalOpened(true)} className="btn btn-scordi gap-2" loadingOnBtn>
            <FaPlus />
            <span>첫 번째 구독 연결하기</span>
        </LinkTo>
    );

    useEffect(() => {
        onReady();
    }, [currentInvoiceAccount]);

    if (!currentInvoiceAccount) return <></>;

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
                                <MdRefresh fontSize={14} />
                            </button>
                        </Tippy>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="btn btn-sm bg-white border-gray-300 hover:bg-white hover:border-gray-500 gap-2"
                            onClick={() => setAddSubscriptionModalOpened(true)}
                        >
                            <FaPlus />
                            <span>구독 연결하기</span>
                        </button>
                    </div>
                </div>

                {!isEmptyResult ? (
                    <ListTable
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => <InvoiceAccountSubscriptionTableHeader orderBy={orderBy} />}
                        Row={({item}) => <InvoiceAccountSubscriptionTableRow subscription={item} reload={refresh} />}
                    />
                ) : (
                    <EmptyTable
                        Icon={() => <>🔍</>}
                        message="연결된 구독이 없어요."
                        Buttons={() => <AddSubscriptionButton />}
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
