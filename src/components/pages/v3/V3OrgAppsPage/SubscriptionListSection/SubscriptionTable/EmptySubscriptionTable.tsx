import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {CgSpinner} from 'react-icons/cg';
import {orgIdParamState} from '^atoms/common';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {useModal} from '^v3/share/modals';
import {newFormForGeneralInfoModalAtom} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {V30ConnectsPageRoute} from '^pages/v3/orgs/[orgId]/connects';

export const EmptySubscriptionTableInDashBoard = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const [isLoading, setIsLoading] = useState(false);
    const {open: openNewSubscriptionModal} = useModal(newFormForGeneralInfoModalAtom);
    const router = useRouter();

    const onClick = () => {
        setIsLoading(true);
        router.push(V30ConnectsPageRoute.path(orgId));
    };

    return (
        <section className="w-full rounded-b-box py-16 text-gray-500">
            <Container className="text-center flex flex-col">
                <p className="font-semibold text-xl mb-3">앗 등록된 구독이 없어요!</p>
                <p className="mb-5">지금 바로 구독을 등록해보세요 :)</p>
                <div className="flex items-center justify-center gap-8 pr-4">
                    <button
                        onClick={() => !isLoading && onClick()}
                        className={`${isLoading && 'btn-disabled !border !border-gray-300'} btn bg-scordi text-white`}
                    >
                        {isLoading ? <CgSpinner size={28} className="animate-spin" /> : <>데이터 연결로 불러오기</>}
                    </button>

                    <span className="text-sm">or</span>
                    <button onClick={openNewSubscriptionModal} className="btn btn-link !pl-0">
                        그냥 직접 입력할래요
                    </button>
                </div>
            </Container>
        </section>
    );
});

export const EmptySubscriptionTableInSubscriptionPage = memo(() => {
    return (
        <section className="w-full rounded-b-box py-16 text-gray-500">
            <Container className="text-center flex flex-col">
                <figure className="w-72 mx-auto">
                    <img alt="empty-subscription" src="/images/v3/empty-subscription-table.png" />
                </figure>
                <p className="font-semibold text-xl mb-3">앗 등록된 구독이 없어요!</p>
                <p className="mb-5">지금 바로 구독을 등록해보세요 :)</p>
            </Container>
        </section>
    );
});
