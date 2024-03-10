import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {FaArrowLeft} from 'react-icons/fa6';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {codefAccountAtom} from '^models/CodefAccount/atom';
import {CardAccountsStaticData, cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CardListPageMode, cardListPageModeAtom, reloadingDataAtom} from '^v3/V3OrgConnectedCardListPage/atom';
import {useConnectedCodefCards, useNewCodefCards} from '^models/CodefCard/hook';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {newCodefCardConnected} from '^v3/V3OrgConnectedCardListPage/NewCodefCardListPage/atom';
import {debounce} from 'lodash';
import {useRouter} from 'next/router';

interface Props {
    codefAccount: CodefAccountDto;
    staticData: CardAccountsStaticData;
}

export const NewCodefCardListPageHeader = memo((props: Props) => {
    const {codefAccount, staticData} = props;
    const router = useRouter();
    const setCardListPageMode = useSetRecoilState(cardListPageModeAtom);
    const {result, reload: newCodefCardsReload} = useNewCodefCards(codefAccount.id);
    const {reload: connectedCodefCardsReload} = useConnectedCodefCards(codefAccount.id);
    const [newCardConnected, setNewCardConnected] = useRecoilState(newCodefCardConnected);
    const [reloading, setReloading] = useRecoilState(reloadingDataAtom);

    const {logo, displayName: cardName, themeColor} = staticData;

    const redirectToCardsPage = debounce(() => {
        setReloading(true);
        Promise.all([connectedCodefCardsReload(), newCodefCardsReload()]).then(([connectedCards]) => {
            setNewCardConnected(false);
            setReloading(false);
            const cardCount = connectedCards?.pagination.totalItemCount || 0;
            if (cardCount) {
                setCardListPageMode(CardListPageMode.ConnectedCards);
            } else {
                router.back();
                setCardListPageMode(CardListPageMode.IsLoading);
            }
        });
    });

    return (
        <header className="">
            <div className="flex mb-12">
                <LinkTo
                    onClick={() => !reloading && redirectToCardsPage()}
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
                        disabled={!newCardConnected}
                        className={`btn btn-lg btn-scordi ${
                            newCardConnected ? '' : '!bg-scordi !text-white opacity-30'
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
