import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {MdRefresh} from 'react-icons/md';
import {FaPlus} from 'react-icons/fa6';
import Tippy from '@tippyjs/react';
import {orgIdParamState} from '^atoms/common';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {LinkTo} from '^components/util/LinkTo';
import {useSubscriptionListOfCreditCard} from '^models/Subscription/hook';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {useCurrentCreditCard} from '../../atom';
import {CreditCardSubscriptionTableHeader} from './CreditCardSubscriptionTableHeader';
import {CreditCardSubscriptionTableRow} from './CreditCardSubscriptionTableRow';
import {CreditCardAddSubscriptionModal} from './CreditCardAddSubscriptionModal';

export const SubscriptionListOfCreditCardTabContent = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentCreditCard} = useCurrentCreditCard();
    const [isAddSubscriptionModalOpened, setAddSubscriptionModalOpened] = useState(false);
    const {isLoading, isEmptyResult, search, result, reload, movePage, changePageSize, orderBy} =
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
        <LinkTo href={OrgSubscriptionSelectPageRoute.path(orgId)} className="btn btn-scordi gap-2" loadingOnBtn>
            <FaPlus />
            <span>새 구독 등록</span>
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
                        onReady={onReady}
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => <CreditCardSubscriptionTableHeader orderBy={orderBy} />}
                        Row={({item}) => <CreditCardSubscriptionTableRow subscription={item} reload={reload} />}
                    />
                ) : (
                    <EmptyTable icon={'🔍'} message="등록된 구독이 없어요." Buttons={() => <AddSubscriptionButton />} />
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
        </section>
    );
});
SubscriptionListOfCreditCardTabContent.displayName = 'SubscriptionListOfCreditCardTabContent';
