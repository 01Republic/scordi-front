import {memo, useState} from 'react';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {useRouter} from 'next/router';
import {cardAccountsStaticData} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectCardAccountsSection/card-accounts-static-data';
import {FaArrowLeft} from 'react-icons/fa6';
import {LinkTo} from '^components/util/LinkTo';
import {V3OrgConnectsPageRoute} from '^pages/v3/orgs/[orgId]/connects';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {V3OrgConnectedCardListPageRoute} from '^pages/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]/cards';

export const CardConnectCreatePage = memo(() => (
    <V3MainLayout activeTabIndex={LNBIndex.Connects}>
        <CardConnectCreatePageContent />
    </V3MainLayout>
));

const CardConnectCreatePageContent = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
    const connectMethodParam = router.query.connectMethod as string;
    const connectMethod = cardAccountsStaticData.find((data) => data.param === connectMethodParam);

    if (!connectMethod) return <></>;

    const {logo, connectMethodName: cardName} = connectMethod;

    const onSubmit = () => {
        setIsClicked(true);
        setTimeout(() => {
            router.replace(V3OrgConnectedCardListPageRoute.path(orgId, connectMethod.param));
        }, 1000);
    };

    return (
        <div className="py-10">
            <header className="mb-12 px-12">
                <div className="mb-12">
                    <LinkTo
                        href={V3OrgConnectsPageRoute.path(orgId)}
                        className="flex items-center text-gray-500 hover:underline gap-2"
                    >
                        <FaArrowLeft /> 처음으로
                    </LinkTo>
                </div>

                <img src={logo} alt={cardName} className="avatar w-[48px] h-[48px] bg-white mb-4" />

                <h1>
                    {cardName} <span className="text-gray-400">로 부터</span> <br />{' '}
                    <span className="text-gray-400">구독 지출을 불러옵니다.</span>
                </h1>
            </header>

            <section className="px-12">
                <div className="mb-14 w-full max-w-md">
                    <div className="mb-8">
                        <label htmlFor="account-id" className="block mb-3 text-16">
                            관리자 아이디
                        </label>
                        <input
                            id="account-id"
                            type="text"
                            className="input w-full input-bordered"
                            disabled={isClicked}
                        />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="account-pw" className="block mb-3 text-16">
                            관리자 비밀번호
                        </label>
                        <input
                            id="account-pw"
                            type="password"
                            className="input w-full input-bordered"
                            disabled={isClicked}
                        />
                    </div>
                </div>

                <div className="max-w-md">
                    <button
                        onClick={onSubmit}
                        className={`btn btn-lg min-w-[200px] ${isClicked ? 'loading bg-gray-200' : 'btn-scordi'}`}
                    >
                        {isClicked ? '' : '불러오기'}
                    </button>
                </div>
            </section>
        </div>
    );
});
