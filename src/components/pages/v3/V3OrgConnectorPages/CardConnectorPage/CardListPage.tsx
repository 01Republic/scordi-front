import {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentCodefAccountAtom} from '^v3/V3OrgConnectorPages/CardConnectorPage/atom';
import {V3OrgConnectsPageRoute} from '^pages/v3/orgs/[orgId]/connects';
import {FaArrowLeft} from 'react-icons/fa6';
import {LinkTo} from '^components/util/LinkTo';
import {CardAccountsStaticData} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectCardAccountsSection/card-accounts-static-data';
import {useRouter} from 'next/router';
import {codefCardApi} from '^models/CodefCard/api';
import {orgIdParamState} from '^atoms/common';

export const CardListPage = memo(function CardListPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const [currentCodefAccount, setCurrentCodefAccount] = useRecoilState(currentCodefAccountAtom);
    const [isCardListLoading, setIsCardListLoading] = useState(true);
    const connectMethod = CardAccountsStaticData.findOne(router.query.connectMethod as string);

    useEffect(() => {
        if (!router.isReady) return;
        if (!currentCodefAccount) return;

        codefCardApi.index(orgId, currentCodefAccount.id);
    }, [router.isReady, currentCodefAccount]);

    if (!connectMethod) return <></>;

    const {logo, displayName: cardName} = connectMethod;

    const routerBack = () => {
        setCurrentCodefAccount(null);
    };

    return (
        <div className="py-10">
            <header className="mb-12 px-12">
                <div className="mb-12">
                    <LinkTo onClick={routerBack} className="flex items-center text-gray-500 hover:underline gap-2">
                        <FaArrowLeft /> 처음으로
                    </LinkTo>
                </div>

                <img src={logo} alt={cardName} className="avatar w-[48px] h-[48px] bg-white mb-4" />

                <h1>
                    {cardName} <span className="text-gray-400">로 부터</span> <br />{' '}
                    <span className="text-gray-400">구독 지출을 불러옵니다.</span>
                </h1>
            </header>
        </div>
    );
});
