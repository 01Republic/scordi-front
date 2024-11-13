import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {yyyy_mm_dd} from '^utils/dateTime';
import {OrganizationDto} from '^models/Organization/type';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {SelectPlanModal} from '^clients/private/_modals/SelectPlanModal';
import {LinkTo} from '^components/util/LinkTo';
import {channelTalkEnv} from '^config/environments';

interface ExpiredPlanBlockModalProps {
    currentOrg: OrganizationDto;
}

export const ExpiredPlanBlockModal = memo((props: ExpiredPlanBlockModalProps) => {
    const {currentOrg} = props;
    const router = useRouter();
    const [isOpened, setIsOpened] = useState(false);
    const [isSelectPlanModalOpened, setIsSelectPlanModalOpened] = useState(false);

    // 이 조직의 현재 구독이 만료된 상태인지를 판단하고, 만약 만료된 상태라면 블락 모달을 활성화 시킵니다.
    const checkExpired = () => {
        const {currentScordiSubscription} = currentOrg;
        if (!currentScordiSubscription) return true;

        const {finishAt} = currentScordiSubscription;
        if (!finishAt) return true;

        const today = yyyy_mm_dd(new Date());
        const expirationDate = yyyy_mm_dd(finishAt);

        return expirationDate <= today;
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
        <AnimatedModal backdrop={{opacity: 0.5}} open={isOpened} onClose={() => 1}>
            <div className="relative mx-auto max-w-screen-sm w-full">
                <div className={'bg-white rounded-3xl p-12'}>
                    <div className="flex flex-col items-center justify-center mb-4">
                        <h1
                            className="mb-1 text-gradient-color"
                            style={{background: 'linear-gradient(to right, #5c5fee, #a5a6f5)'}}
                        >
                            SaaS 관리는 스코디
                        </h1>
                        <p className="mb-5 text-14 font-semibold text-gray-500">
                            똑똑한 팀이 선택한 소프트웨어 구독 관리 서비스 스코디의 무료 체험 기간이 끝났어요.
                        </p>
                        <br />
                        <img
                            src="/images/service/expired-plan-block-modal-rounded-image.png"
                            alt="orange"
                            className="w-full "
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full justify-center mt-10">
                        <button
                            className="btn btn-lg btn-block btn-scordi "
                            onClick={() => setIsSelectPlanModalOpened(true)}
                        >
                            구독하기
                        </button>
                        <LinkTo
                            href={channelTalkEnv.url}
                            target="_blank"
                            className="btn btn-block btn-lg"
                            displayLoading={false}
                        >
                            문의하기
                        </LinkTo>
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
