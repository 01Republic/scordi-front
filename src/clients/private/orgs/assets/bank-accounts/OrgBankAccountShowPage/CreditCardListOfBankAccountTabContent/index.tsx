import React, {memo, useEffect, useState} from 'react';
import Tippy from '@tippyjs/react';
import {MdRefresh} from 'react-icons/md';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCurrentBankAccount} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountShowPage/atom';
import {CreditCardTableRowOfBankAccount} from './CreditCardTableRowOfBankAccount';
import {CreditCardTableHeaderOfBankAccount} from './CreditCardTableHeaderOfBankAccount';
import {LinkTo} from '^components/util/LinkTo';
import {FaPlus} from 'react-icons/fa6';
import {BankAccountAddSubscriptionModal} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountShowPage/SubscriptionListOfBankAccountTabContent/BankAccountAddSubscriptionModal';
import {BankAccountAddCreditCardModal} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountShowPage/CreditCardListOfBankAccountTabContent/BankAccountAddCreditCardModal';

export const CreditCardListOfBankAccountTabContent = memo(() => {
    const {currentBankAccount} = useCurrentBankAccount();
    const {isLoading, isEmptyResult, search, result, reload, movePage, changePageSize, orderBy} =
        useCreditCardListForListPage();
    const [isAddCreditCardModalOpened, setAddCreditCardModalOpened] = useState(false);

    // TODO: 자동연결 완성 시 구분
    const isManuallyCreated = true;

    const onReady = () => {
        if (!currentBankAccount) return;
        search({
            relations: ['holdingMember'],
            where: {bankAccountId: currentBankAccount.id},
            order: {id: 'DESC'},
        });
    };

    const AddCreditCardButton = () => (
        <LinkTo
            onClick={() => setAddCreditCardModalOpened(true)}
            className="btn btn-scordi gap-2 no-animation btn-animation"
            loadingOnBtn
        >
            <FaPlus />
            <span>카드 연결</span>
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
                            <b className="text-scordi">{totalItemCount.toLocaleString()}개</b>의 카드가 연결되어있어요
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
                                onClick={() => setAddCreditCardModalOpened(true)}
                            >
                                <FaPlus />
                                <span>카드 연결하기</span>
                            </button>
                        )}
                    </div>
                </div>

                {isEmptyResult ? (
                    <EmptyTable
                        message="연결된 카드가 없어요."
                        Buttons={isManuallyCreated ? AddCreditCardButton : undefined}
                    />
                ) : (
                    <ListTable
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => <CreditCardTableHeaderOfBankAccount orderBy={orderBy} />}
                        Row={({item}) => <CreditCardTableRowOfBankAccount creditCard={item} reload={reload} />}
                    />
                )}
            </ListTableContainer>

            <BankAccountAddCreditCardModal
                isOpened={isAddCreditCardModalOpened}
                onClose={() => setAddCreditCardModalOpened(false)}
                onCreate={() => {
                    setAddCreditCardModalOpened(false);
                    reload();
                }}
                bankAccountId={currentBankAccount.id}
            />
        </section>
    );
});
