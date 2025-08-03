import {codefAccountIdParamState} from '^atoms/common';
import {LinkTo} from '^components/util/LinkTo';
import {useConnectedCodefCards, useSubscriptionsForCodefAccount} from '^models/CodefCard/hook';
import {useCodefAccountPageSubject} from '^v3/V3OrgConnectedCardListPage/atom';
import {ArrowLeft} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo} from 'react';

export const ConnectedCardListPageHeader = memo(() => {
    const {connectMethod} = useCodefAccountPageSubject();
    const router = useRouter();
    const {result} = useConnectedCodefCards(codefAccountIdParamState);
    const {result: pagedSubs} = useSubscriptionsForCodefAccount(codefAccountIdParamState);
    const {t} = useTranslation('common');

    if (!connectMethod) return <></>;

    const {logo, displayName: cardName, themeColor} = connectMethod;

    return (
        <header className="">
            <div className="flex mb-12">
                <LinkTo
                    onClick={() => router.back()}
                    className="flex items-center text-gray-500 hover:underline gap-2 cursor-pointer"
                >
                    <ArrowLeft /> {t('button.back')}
                </LinkTo>
            </div>

            <img src={logo} alt={cardName} className="avatar w-[48px] h-[48px] bg-white mb-4" />

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <h1 className="text-3xl">
                        {result.pagination.totalItemCount}개의 카드
                        <span className="text-gray-400">로부터</span> <br />
                        {pagedSubs.pagination.totalItemCount}개의 구독
                        <span className="text-gray-400">을 연결하고 있어요</span>
                    </h1>

                    {/*<button*/}
                    {/*    className={`btn btn-sm btn-ghost btn-circle ${reloading ? 'animate-spin' : ''}`}*/}
                    {/*    onClick={() => !reloading && reloadData()}*/}
                    {/*>*/}
                    {/*    <RotateCw />*/}
                    {/*</button>*/}
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
