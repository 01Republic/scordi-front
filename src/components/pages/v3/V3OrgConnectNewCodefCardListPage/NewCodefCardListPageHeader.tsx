import React, {memo} from 'react';
import {FaArrowLeft} from 'react-icons/fa6';
import {useRouter} from 'next/router';
import {debounce} from 'lodash';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {LinkTo} from '^components/util/LinkTo';
import {V3OrgConnectedCardListPageRoute} from '^pages/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]/cards';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {useConnectedCodefCards, useNewCodefCards} from '^models/CodefCard/hook';
import {reloadingDataAtom} from '^v3/V3OrgConnectedCardListPage/atom';
import {newCodefCardConnected, CodefAccountProps} from './atom';

export const NewCodefCardListPageHeader = memo((props: CodefAccountProps) => {
    const {codefAccount, staticData} = props;
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const codefAccountId = useRecoilValue(codefAccountIdParamState);
    const {result, reload: newCodefCardsReload} = useNewCodefCards(codefAccount.id);
    const {reload: connectedCodefCardsReload} = useConnectedCodefCards(codefAccount.id);
    const [connectedContainer, setNewCardConnected] = useRecoilState(newCodefCardConnected);
    const [reloading, setReloading] = useRecoilState(reloadingDataAtom);

    const {logo, displayName: cardName, themeColor} = staticData;

    const someCardConnected = Object.values(connectedContainer).some((v) => v === true);

    const redirectToCardsPage = debounce(() => {
        router.push(V3OrgConnectedCardListPageRoute.path(orgId, codefAccountId));
        // setReloading(true);
        // Promise.all([connectedCodefCardsReload(), newCodefCardsReload()]).then(([connectedCards]) => {
        //     setNewCardConnected(false);
        //     setReloading(false);
        //     const cardCount = connectedCards?.pagination.totalItemCount || 0;
        //     if (cardCount) {
        //     } else {
        //         router.back();
        //     }
        // });
    });

    return (
        <header className="">
            <div className="flex mb-12">
                <LinkTo
                    onClick={() => router.back()}
                    className={`flex items-center text-gray-500 hover:underline gap-2 ${
                        !reloading ? 'cursor-pointer' : 'cursor-wait opacity-30'
                    }`}
                >
                    <FaArrowLeft /> 뒤로가기
                </LinkTo>
            </div>

            <img src={logo} alt={cardName} className="avatar w-[48px] h-[48px] bg-white mb-4" />

            <div className="mb-12 flex items-end justify-between">
                <h1 className="text-3xl mb-4">
                    {result.pagination.totalItemCount}개의 새로운 카드
                    <span className="text-gray-400">를 발견했어요!</span> <br />{' '}
                    <span className="text-gray-400">어떤 카드를 연결할까요?</span>
                </h1>

                <div>
                    <button
                        disabled={!someCardConnected}
                        className={`btn btn-lg btn-scordi ${
                            someCardConnected ? '' : '!bg-scordi !text-white opacity-30'
                        }`}
                        onClick={() => redirectToCardsPage()}
                    >
                        연결된 카드 확인하기
                    </button>
                </div>
            </div>
        </header>
    );
});
NewCodefCardListPageHeader.displayName = 'NewCodefCardListPageHeader';
