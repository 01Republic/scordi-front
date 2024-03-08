import React, {memo, useState} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {FaArrowLeft, FaArrowRotateRight} from 'react-icons/fa6';
import {useRouter} from 'next/router';
import {useRecoilState, useRecoilValue} from 'recoil';
import {codefAccountAtom} from '^models/CodefAccount/atom';
import {CardAccountsStaticData, cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useConnectedCodefCards, useNewCodefCards, useSubscriptionsForAccount} from '^models/CodefCard/hook';
import {CardListPageMode, reloadingDataAtom} from '^v3/V3OrgConnectedCardListPage/atom';

interface Props {
    codefAccount: CodefAccountDto;
    staticData: CardAccountsStaticData;
}

export const ConnectedCardListPageHeader = memo((props: Props) => {
    const {codefAccount, staticData} = props;
    const router = useRouter();
    const [reloading, setReloading] = useRecoilState(reloadingDataAtom);
    const {result, reload: connectedCodefCardsReload} = useConnectedCodefCards(codefAccount.id);
    const {reload: newCodefCardsReload} = useNewCodefCards(codefAccount.id);
    const {result: pagedSubs, reload: reloadSubs1} = useSubscriptionsForAccount(codefAccount.id);

    const {logo, displayName: cardName, themeColor} = staticData;

    const reloadData = () => {
        setReloading(true);
        Promise.all([newCodefCardsReload(), connectedCodefCardsReload(), reloadSubs1()]).then(() => {
            setReloading(false);
        });
    };

    return (
        <header className="">
            <div className="flex mb-12">
                <LinkTo
                    onClick={() => router.back()}
                    className="flex items-center text-gray-500 hover:underline gap-2 cursor-pointer"
                >
                    <FaArrowLeft /> 뒤로가기
                </LinkTo>
            </div>

            <img src={logo} alt={cardName} className="avatar w-[48px] h-[48px] bg-white mb-4" />

            <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <h1 className="text-3xl">
                        {result.pagination.totalItemCount}개의 카드
                        <span className="text-gray-400">로부터</span> <br />
                        {pagedSubs.pagination.totalItemCount}개의 구독
                        <span className="text-gray-400">을 연결하고 있어요</span>
                    </h1>

                    <button
                        className={`btn btn-sm btn-ghost btn-circle ${reloading ? 'animate-spin' : ''}`}
                        onClick={() => !reloading && reloadData()}
                    >
                        <FaArrowRotateRight />
                    </button>
                </div>

                {/*<ul className="list-disc pl-4 text-16">*/}
                {/*    <li>구독서비스를 찾기 위해 결제 정보가 꼭 필요해요.</li>*/}
                {/*    <li>연결하지 않은 카드는 조회하지 않아요.</li>*/}
                {/*    <li>지금 연결하지 않아도 언제든 연결 할 수 있어요.</li>*/}
                {/*</ul>*/}
            </div>

            {/*<div className="w-full grid grid-cols-2 gap-4">*/}
            {/*    <button className={`btn btn-lg btn-block ${'btn-scordi'}`}>다른 것도 연결할게요</button>*/}
            {/*    <button className={`btn btn-lg btn-block`}>홈에서 확인할게요</button>*/}
            {/*</div>*/}
        </header>
    );
});
ConnectedCardListPageHeader.displayName = 'AccountCardListPageHeader';
