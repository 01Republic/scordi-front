import React, {memo, useEffect, useState} from 'react';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {LinkTo} from '^components/util/LinkTo';
import {FaArrowLeft} from 'react-icons/fa6';
import {useRouter} from 'next/router';

interface Props {
    codefAccount: CodefAccountDto;
    staticData: CardAccountsStaticData;
}

export const LoadingCodefCardListPageHeader = memo(function LoadingCodefCardListPageHeader(props: Props) {
    const {codefAccount, staticData} = props;
    const router = useRouter();
    const [loadingCount, setLoadingCount] = useState(0);

    const {logo, displayName: cardName, themeColor} = staticData;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLoadingCount((i) => i + 1);
        }, 750);

        return () => {
            clearInterval(intervalId);
        };
    }, [router.isReady]);

    return (
        <header>
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
                <div className="mb-4">
                    <h1 className="text-3xl">
                        {cardName} 계정<span className="text-gray-400">에서</span> <br />
                        <span className="text-gray-400">카드를 불러오고 있어요</span>
                        {Array.from(Array((loadingCount % 4) + 1)).map((_, i) => (
                            <span key={i} className="text-gray-400">
                                .
                            </span>
                        ))}
                    </h1>
                </div>
            </div>
        </header>
    );
});
