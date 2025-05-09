import React, {memo, useEffect, useState} from 'react';
import Tippy from '@tippyjs/react';
import {LinkTo} from '^components/util/LinkTo';
import {useSubscriptionListOfCreditCard} from '^models/Subscription/hook';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {useCurrentCodefCard, useCurrentCreditCard} from '../../atom';
import {CreditCardSubscriptionTableHeader} from './CreditCardSubscriptionTableHeader';
import {CreditCardSubscriptionTableRow} from './CreditCardSubscriptionTableRow';
import {CreditCardAddSubscriptionModal} from './CreditCardAddSubscriptionModal';
import {HelpCircle, Plus, RotateCw} from 'lucide-react';
import {BankDataFetchingIssueModal} from '^clients/private/_modals/BankDataFetchingIssueModal';

export const SubscriptionListOfCreditCardTabContent = memo(() => {
    const {currentCreditCard} = useCurrentCreditCard();
    const {isManuallyCreated} = useCurrentCodefCard();
    const [isAddSubscriptionModalOpened, setAddSubscriptionModalOpened] = useState(false);
    const [isNoSubscriptionFoundModalOpen, setIsNoSubscriptionFoundModalOpen] = useState(false);
    const {isLoading, isNotLoaded, isEmptyResult, search, result, reload, movePage, changePageSize, orderBy} =
        useSubscriptionListOfCreditCard();

    const onReady = () => {
        if (!currentCreditCard) return;
        search({
            relations: ['master'],
            where: {creditCardId: currentCreditCard.id},
            order: {nextComputedBillingDate: 'DESC', id: 'DESC'},
        });
    };

    const AddSubscriptionButton = () => (
        <LinkTo
            onClick={() => setAddSubscriptionModalOpened(true)}
            className="btn btn-scordi gap-2 no-animation btn-animation"
            loadingOnBtn
        >
            <Plus />
            <span>구독 연결</span>
        </LinkTo>
    );

    useEffect(() => {
        onReady();
    }, [currentCreditCard]);

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

                    <button
                        type="button"
                        onClick={() => setIsNoSubscriptionFoundModalOpen(true)}
                        className="flex items-center gap-2 cursor-pointer text-13 text-gray-500"
                    >
                        <HelpCircle className="size-4 fill-gray-500 text-white" />
                        <span>찾는 구독이 없나요?</span>
                    </button>
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
                        Header={() => <CreditCardSubscriptionTableHeader orderBy={orderBy} />}
                        Row={({item}) => <CreditCardSubscriptionTableRow subscription={item} reload={reload} />}
                    />
                )}
            </ListTableContainer>

            <CreditCardAddSubscriptionModal
                isOpened={isAddSubscriptionModalOpened}
                onClose={() => setAddSubscriptionModalOpened(false)}
                onCreate={() => {
                    setAddSubscriptionModalOpened(false);
                    reload();
                }}
                creditCardId={currentCreditCard.id}
            />
            <BankDataFetchingIssueModal
                isOpened={isNoSubscriptionFoundModalOpen}
                onClose={() => setIsNoSubscriptionFoundModalOpen(false)}
            />
        </section>
    );
});
SubscriptionListOfCreditCardTabContent.displayName = 'SubscriptionListOfCreditCardTabContent';
