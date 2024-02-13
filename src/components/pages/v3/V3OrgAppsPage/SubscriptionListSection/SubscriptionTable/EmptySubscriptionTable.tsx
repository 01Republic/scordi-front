import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {CgSpinner} from 'react-icons/cg';
import {orgIdParamState} from '^atoms/common';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {useModal} from '^v3/share/modals';
import {newFormForGeneralInfoModalAtom} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {V30ConnectsPageRoute} from '^pages/v3/orgs/[orgId]/connects';

export const EmptySubscriptionTable = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const [isLoading, setIsLoading] = useState(false);
    const {open: openNewSubscriptionModal} = useModal(newFormForGeneralInfoModalAtom);
    const router = useRouter();

    const onClick = () => {
        setIsLoading(true);
        router.push(V30ConnectsPageRoute.path(orgId));
    };

    return (
        <section className="w-full rounded-b-box py-5 bg-neutral-content/10 text-gray-500">
            <Container className="text-center flex flex-col gap-5">
                <figure className="w-72 mx-auto">
                    <img alt="empty-subscription" src="/images/v3/empty-subscription-table.png" />
                </figure>
                <p className="font-semibold text-2xl mb-3">앗 등록된 구독이 없어요!</p>
                <p>구독을 어떤 방법으로 등록하시겠어요?</p>
                <div className="flex flex-col text-center ">
                    <button
                        onClick={() => !isLoading && onClick()}
                        className={`${
                            isLoading && 'btn-disabled !border !border-gray-300'
                        } btn btn-block btn-lg bg-scordi text-white mb-3`}
                    >
                        {isLoading ? <CgSpinner size={28} className="animate-spin" /> : <>데이터 연결로 불러오기</>}
                    </button>

                    <span className="text-sm">or</span>
                    <button onClick={openNewSubscriptionModal} className="btn btn-block btn-md btn-link">
                        그냥 직접 입력할래요
                    </button>
                </div>
            </Container>
        </section>
    );
});
