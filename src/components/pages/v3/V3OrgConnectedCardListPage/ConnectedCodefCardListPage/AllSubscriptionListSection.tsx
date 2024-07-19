import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {FcFinePrint} from 'react-icons/fc';
import {useSubscriptionsForCodefAccount, useSubscriptionsForCard} from '^models/CodefCard/hook';
import {selectedCodefCardAtom} from './atom';
import {codefAccountIdParamState} from '^atoms/common';
import {SubscriptionItem} from './SubscriptionItem';
import {CgSpinner} from 'react-icons/cg';

/** 계정으로 조회된 구독 Section */
export const AllSubscriptionListSection = memo(() => {
    // const codefAccountId = useRecoilValue(codefAccountIdParamState);
    // const selectedCodefCard = useRecoilValue(selectedCodefCardAtom);
    // const {isLoading, result, search} = useSubscriptionsForCard(codefAccountIdParamState);
    const {isLoading, result} = useSubscriptionsForCodefAccount(codefAccountIdParamState);

    const {items, pagination} = result;

    return (
        <div className="col-span-3 mb-8">
            <h3
                onClick={() => console.log(result)}
                className="flex items-center gap-2 py-6 sticky top-[64px] z-[1] bg-layout-background -mx-4 px-4"
            >
                <FcFinePrint size={30} />{' '}
                <span>카드로 조회된 구독 {pagination.totalItemCount ? `(${pagination.totalItemCount})` : ''}</span>
            </h3>

            <div className="card card-body px-3 py-2 card-bordered bg-white gap-0">
                {isLoading ? (
                    <div className="px-3 py-2 font-semibold flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin">
                                <CgSpinner size={30} />
                            </div>
                        </div>
                    </div>
                ) : pagination.totalItemCount ? (
                    <>
                        <div className="border-b-2 px-3 py-2 grid grid-cols-7 font-semibold">
                            <div className="col-span-2"></div>
                            <div className="text-13 flex items-center justify-start">카드</div>
                            <div className="text-13 flex items-center justify-start">결제주기</div>
                            <div className="text-13 flex items-center justify-end">최신 결제금액</div>
                            <div className="text-13 flex items-center justify-end">마지막 결제일</div>
                            <div></div>
                        </div>
                        {items.map((subscription, i) => (
                            <SubscriptionItem data={subscription} key={i} />
                        ))}
                    </>
                ) : (
                    <div className="px-3 py-2 font-semibold flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-14 mb-2">조회된 구독이 없어요</p>
                            {/*<p className="text-14 mb-4">(백그라운드 연동이 진행되고 있어요)</p>*/}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});
