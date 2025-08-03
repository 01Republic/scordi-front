import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {LinkTo} from '^components/util/LinkTo';
import {useNewCodefCards} from '^models/CodefCard/hook';
import {V3OrgConnectedCardListPageRoute} from '^pages/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]/cards';
import {reloadingDataAtom, useCodefAccountPageSubject} from '^v3/V3OrgConnectedCardListPage/atom';
import {debounce} from 'lodash';
import {ArrowLeft} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {newCodefCardConnected} from './atom';

export const NewCodefCardListPageHeader = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const codefAccountId = useRecoilValue(codefAccountIdParamState);
    const {connectMethod} = useCodefAccountPageSubject();
    const {result} = useNewCodefCards(codefAccountIdParamState);
    const [connectedContainer, setNewCardConnected] = useRecoilState(newCodefCardConnected);
    const [reloading, setReloading] = useRecoilState(reloadingDataAtom);
    const {t} = useTranslation('common');

    const someCardConnected = Object.values(connectedContainer).some((v) => v === true);

    const redirectToCardsPage = debounce(() => {
        router.push(V3OrgConnectedCardListPageRoute.path(orgId, codefAccountId));
    });

    if (!connectMethod) return <></>;

    const {logo, displayName: cardName, themeColor} = connectMethod;

    return (
        <header className="">
            <div className="flex mb-12">
                <LinkTo
                    onClick={() => router.back()}
                    className={`flex items-center text-gray-500 hover:underline gap-2 ${
                        !reloading ? 'cursor-pointer' : 'cursor-wait opacity-30'
                    }`}
                >
                    <ArrowLeft /> {t('button.back')}
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
