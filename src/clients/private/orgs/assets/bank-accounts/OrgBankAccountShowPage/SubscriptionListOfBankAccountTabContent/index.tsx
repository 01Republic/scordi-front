import React, {memo, useEffect, useState} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {FaPlus} from 'react-icons/fa6';
import Tippy from '@tippyjs/react';
import {MdRefresh} from 'react-icons/md';
import {useSubscriptionListOfBankAccount} from '^models/Subscription/hook';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCurrentCodefCard} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/atom';
import {useCurrentBankAccount} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountShowPage/atom';
import {BankAccountAddSubscriptionModal} from './BankAccountAddSubscriptionModal';
import {SubscriptionTableRowOfBankAccount} from './SubscriptionTableRowOfBankAccount';
import {SubscriptionTableHeaderOfBankAccount} from './SubscriptionTableHeaderOfBankAccount';

export const SubscriptionListOfBankAccountTabContent = memo(() => {
    const {currentBankAccount} = useCurrentBankAccount();
    const {isManuallyCreated} = useCurrentCodefCard();
    const [isAddSubscriptionModalOpened, setAddSubscriptionModalOpened] = useState(false);
    const {isLoading, isEmptyResult, search, result, reload, movePage, changePageSize, orderBy} =
        useSubscriptionListOfBankAccount();

    const onReady = () => {
        if (!currentBankAccount) return;
        search({
            relations: ['master'],
            where: {bankAccountId: currentBankAccount.id},
            order: {nextComputedBillingDate: 'DESC', id: 'DESC'},
        });
    };

    const AddSubscriptionButton = () => (
        <LinkTo
            onClick={() => setAddSubscriptionModalOpened(true)}
            className="btn btn-scordi gap-2 no-animation btn-animation"
            loadingOnBtn
        >
            <FaPlus />
            <span>구독 연결</span>
        </LinkTo>
    );

    useEffect(() => {
        onReady();
    }, [currentBankAccount]);

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
                        {isManuallyCreated && (
                            <button
                                className="btn btn-sm bg-white border-gray-300 hover:bg-white hover:border-gray-500 gap-2 no-animation btn-animation"
                                onClick={() => setAddSubscriptionModalOpened(true)}
                            >
                                <FaPlus />
                                <span>구독 연결하기</span>
                            </button>
                        )}
                    </div>
                </div>

                {isEmptyResult ? (
                    <EmptyTable
                        message="연결된 구독이 없어요."
                        Buttons={isManuallyCreated ? AddSubscriptionButton : undefined}
                    />
                ) : (
                    <ListTable
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => <SubscriptionTableHeaderOfBankAccount orderBy={orderBy} />}
                        Row={({item}) => <SubscriptionTableRowOfBankAccount subscription={item} reload={reload} />}
                    />
                )}
            </ListTableContainer>

            <BankAccountAddSubscriptionModal
                isOpened={isAddSubscriptionModalOpened}
                onClose={() => setAddSubscriptionModalOpened(false)}
                onCreate={() => {
                    setAddSubscriptionModalOpened(false);
                    reload();
                }}
                bankAccountId={currentBankAccount.id}
            />
        </section>
    );
});
