import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {CgSpinner} from 'react-icons/cg';
import {orgIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {connectDataSourcesModalState} from '^v3/share/modals/ConnectDataSoucresModal/atom';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {V3OrgConnectsPageRoute} from '^pages/v3/orgs/[orgId]/connects';

export const ConnectDataSourcesModal = memo(() => {
    const {Modal, setIsShow, close} = useModal(connectDataSourcesModalState);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const {currentOrg} = useCurrentOrg(orgId);

    useEffect(() => {
        // 구독이 없을때만 보여주기
        if (!currentOrg || currentOrg.subscriptionCount) return;

        setIsShow(true);
    }, [currentOrg]);

    const onClick = () => {
        setIsLoading(true);
        router.push(V3OrgConnectsPageRoute.path(orgId)).then(() => setIsShow(false));
    };

    return (
        <Modal className="p-0 max-w-none sm:max-w-[32rem] sm:min-h-[28rem]">
            <ModalTopbar topbarPosition="fixed" backBtnOnClick={close} />
            <MobileSection.Padding>
                <Container className="text-center">
                    <figure className="w-72 mx-auto">
                        <img alt="empty-subscription" src="/images/v3/empty-subscription-table.png" />
                    </figure>
                    <p className="font-semibold text-2xl mb-3">앗 등록된 구독이 없어요!</p>
                    <p>데이터를 연결해서 스코디를 사용해보세요</p>
                </Container>
            </MobileSection.Padding>

            <ModalLikeBottomBar>
                <button
                    onClick={() => !isLoading && onClick()}
                    className={`${
                        isLoading && 'btn-disabled !border !border-gray-300'
                    } btn btn-block btn-lg bg-scordi text-white mb-3`}
                >
                    {isLoading ? <CgSpinner size={28} className="animate-spin" /> : <>데이터 연결로 구독 불러오기</>}
                </button>
            </ModalLikeBottomBar>
        </Modal>
    );
});
