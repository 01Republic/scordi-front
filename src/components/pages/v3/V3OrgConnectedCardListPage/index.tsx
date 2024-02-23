import {memo} from 'react';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';
import {cardAccountsStaticData} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectCardAccountsSection/card-accounts-static-data';
import {LinkTo} from '^components/util/LinkTo';
import {FaArrowLeft} from 'react-icons/fa6';
import {ConnectedCardItem} from '^v3/V3OrgConnectedCardListPage/ConnectedCardItem';

export const V3OrgConnectedCardListPage = memo(function V3OrgConnectedCardListPage() {
    return (
        <V3MainLayout activeTabIndex={LNBIndex.Connects}>
            <CardListPage />
        </V3MainLayout>
    );
});

const CardListPage = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const connectMethodParam = router.query.connectMethod as string;
    const connectMethod = cardAccountsStaticData.find((data) => data.param === connectMethodParam);

    if (!connectMethod) return <></>;

    const {logo, connectMethodName: cardName, themeColor} = connectMethod;

    return (
        <div className="py-10 px-12">
            <header className="fixed top-[104px] mb-12">
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
                    <h1 className="text-3xl mb-4">
                        {cardName} 계정<span className="text-gray-400">에 포함된 카드에요</span> <br />{' '}
                        <span className="text-gray-400">어떤 카드를 연결할까요?</span>
                    </h1>

                    <ul className="list-disc pl-4 text-16">
                        <li>구독서비스를 찾기 위해 결제 정보가 꼭 필요해요.</li>
                        <li>연결하지 않은 카드는 조회하지 않아요.</li>
                        <li>지금 연결하지 않아도 언제든 연결 할 수 있어요.</li>
                    </ul>
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                    <button className={`btn btn-lg btn-block ${'btn-scordi'}`}>다른 것도 연결할게요</button>
                    <button className={`btn btn-lg btn-block`}>홈에서 확인할게요</button>
                </div>
            </header>

            <div className="grid sm:grid-cols-2">
                <section></section>
                <section className="sm:pt-36">
                    <div className="mb-14 w-full flex flex-col gap-4">
                        {[1, 2, 3, 4, 5].map((card, i) => {
                            return <ConnectedCardItem key={i} card={card} />;
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
});
