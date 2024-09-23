import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import Tippy from '@tippyjs/react';
import {orgIdParamState} from '^atoms/common';
import {LinkTo} from '^components/util/LinkTo';
import {useBillingHistoryListOfCreditCard} from '^models/BillingHistory/hook';
import {ListTableContainer} from '^clients/private/_components/table/ListTable';
import {FaPlus} from 'react-icons/fa6';
import {MdRefresh} from 'react-icons/md';
import {useCurrentCreditCard} from '../../atom';
import {BillingHistoryScopeHandler} from './BillingHistoryScopeHandler';

export const BillingHistoryListOfCreditCardTabContent = memo(function BillingHistoryListOfCreditCardTabContent() {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentCreditCard} = useCurrentCreditCard();
    const {isLoading, isEmptyResult, search, result, reload, movePage, changePageSize, orderBy} =
        useBillingHistoryListOfCreditCard();

    const onReady = () => {
        if (!currentCreditCard) return;
        search({
            relations: ['subscription'],
            where: {creditCardId: currentCreditCard.id},
            order: {issuedAt: 'DESC'},
        });
    };

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
                    <BillingHistoryScopeHandler />

                    <div>
                        <div className="flex items-center gap-2">
                            <button
                                className="btn btn-sm bg-white border-gray-300 hover:bg-white hover:border-gray-300 gap-2"
                                // onClick={() => setAddSubscriptionModalOpened(true)}
                            >
                                <MdRefresh fontSize={14} />
                                <span>최신내역 불러오기</span>
                            </button>
                        </div>
                    </div>
                </div>
            </ListTableContainer>
        </section>
    );
});
