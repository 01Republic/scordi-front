import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {FaArrowLeft} from 'react-icons/fa6';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {codefAccountAtom} from '^models/CodefAccount/atom';
import {cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';

export const AccountCardListPageHeader = memo(() => {
    const router = useRouter();
    const codefAccount = useRecoilValue(codefAccountAtom);
    const connectMethod = cardAccountsStaticData.find((data) => data.param === codefAccount?.organization);

    if (!connectMethod) return <></>;

    const {logo, displayName: cardName, themeColor} = connectMethod;

    return (
        <header className="border-b">
            <div className="mb-12">
                <LinkTo
                    onClick={() => router.back()}
                    className="flex items-center text-gray-500 hover:underline gap-2 cursor-pointer"
                >
                    <FaArrowLeft /> 뒤로가기
                </LinkTo>
            </div>

            <img src={logo} alt={cardName} className="avatar w-[48px] h-[48px] bg-white mb-4" />

            <div className="mb-12">
                {/*<h1>*/}
                {/*    {cardName} <span className="text-gray-400">로 부터</span> <br />{' '}*/}
                {/*    <span className="text-gray-400">구독 지출을 불러옵니다.</span>*/}
                {/*</h1>*/}
                <h1 className="text-3xl mb-4">
                    {cardName} 계정<span className="text-gray-400">에 포함된 카드에요</span> <br />{' '}
                    <span className="text-gray-400">어떤 카드를 연결할까요?</span>
                </h1>

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
AccountCardListPageHeader.displayName = 'AccountCardListPageHeader';
