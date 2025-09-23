import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {OrganizationDto} from '^models/Organization/type';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {SelectPlanModal} from '^clients/private/_modals/SelectPlanModal';
import {LinkTo} from '^components/util/LinkTo';
import {ChannelTalk_Url} from '^config/constants';
import {BlockModalTopButtons} from './BlockModalTopButtons';

interface ExpiredPlanBlockModalProps {
    currentOrg: OrganizationDto;
}

// 현재 플랜 만료 모달
export const ExpiredPlanBlockModal = memo((props: ExpiredPlanBlockModalProps) => {
    const {currentOrg} = props;
    const router = useRouter();
    const [isOpened, setIsOpened] = useState(false);
    const [isSelectPlanModalOpened, setIsSelectPlanModalOpened] = useState(false);

    // 이 조직의 현재 구독이 만료된 상태인지를 판단하고, 만약 만료된 상태라면 블락 모달을 활성화 시킵니다.
    const checkExpired = () => {
        const {currentScordiSubscription} = currentOrg;
        if (!currentScordiSubscription) return true;

        return currentScordiSubscription.isFinished;
    };

    useEffect(() => {
        if (!router.isReady) return;
        setIsOpened(checkExpired());
    }, [router.isReady]);

    const reloadResources = async () => {
        router.reload();
        toast.success('구독등록이 완료되었습니다.');
    };

    return (
        <AnimatedModal backdrop={{opacity: 0.5, className: 'backdrop-blur-sm'}} open={isOpened} onClose={() => 1}>
            <div className="relative mx-auto max-w-screen-sm w-full">
                <div className={'bg-white rounded-3xl p-12 shadow-xl'}>
                    <BlockModalTopButtons />
                    <div className="flex flex-col items-center justify-center mb-4">
                        <h1
                            className="mb-1 text-gradient-color"
                            style={{background: 'linear-gradient(to right, #5c5fee, #a5a6f5)'}}
                        >
                            SaaS 관리는 스코디
                        </h1>
                        <p className="mb-5 text-14 font-semibold text-gray-500">무료 체험 기간이 끝났어요.</p>
                        <br />
                        <img
                            src="/images/service/expired-plan-block-modal-rounded-image.png"
                            alt="orange"
                            className="w-full "
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full justify-center mt-10">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 grid grid-cols-1 items-center gap-2">
                                {/*<button*/}
                                {/*    className="btn btn-lg btn-block btn-scordi "*/}
                                {/*    onClick={() => setIsSelectPlanModalOpened(true)}*/}
                                {/*>*/}
                                {/*    구독하기*/}
                                {/*</button>*/}
                                {/*<LinkTo*/}
                                {/*    href={ChannelTalk_Url}*/}
                                {/*    target="_blank"*/}
                                {/*    className="btn btn-block btn-lg"*/}
                                {/*    displayLoading={false}*/}
                                {/*>*/}
                                {/*    문의하기*/}
                                {/*</LinkTo>*/}
                                <LinkTo
                                    href={ChannelTalk_Url}
                                    target="_blank"
                                    className="btn btn-block btn-lg btn-scordi"
                                    displayLoading={false}
                                >
                                    문의하기
                                </LinkTo>
                            </div>
                        </div>
                    </div>
                    <SelectPlanModal
                        orgId={currentOrg.id}
                        isOpened={isSelectPlanModalOpened}
                        onClose={() => setIsSelectPlanModalOpened(false)}
                        onSuccess={() => reloadResources()}
                    />
                </div>
            </div>
        </AnimatedModal>
    );
});
ExpiredPlanBlockModal.displayName = 'ExpiredPlanBlockModal';
