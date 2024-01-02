import React, {memo} from 'react';
import {
    memoAtom,
    newFormForFinishModalAtom,
    newFormForMemoModalAtom,
} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useRecoilValue} from 'recoil';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {CheckCircle} from '^components/react-icons/check-circle';
import {AddBillingHistoryModalBtn} from '^v3/share/modals/BillingHistoryDetailModal/AddBillingHistoryModal/share/AddBillingHistoryModalBtn';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useNewSubscriptionModal} from '^v3/share/modals/NewSubscriptionModalManually/NewSubscriptionModalGroup/hook';

export const FormForFinishModal = memo(() => {
    const {Modal, close} = useModal(newFormForFinishModalAtom);
    const {open: openMemoModal} = useModal(newFormForMemoModalAtom);
    const memo = useRecoilValue(memoAtom);
    const {closeModalGroup} = useNewSubscriptionModal();

    const onClick = () => {
        // 모달 그룹 닫기
        closeModalGroup();
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="새로운 구독 추가" backBtnOnClick={close} topbarPosition="sticky" />
            <MobileSection.Padding>
                <div className="py-28 flex flex-col">
                    <Container size="sm" className="flex justify-center mb-4">
                        <CheckCircle className="w-[60px]" color="#5E5FEE" />
                    </Container>

                    <Container size="lg" className="mb-10">
                        <div className="text-center">
                            <h3 className="font-bold text-3xl mb-4">결제 내역 등록이 완료되었어요!</h3>
                        </div>
                    </Container>

                    <Container className="flex flex-col items-center">
                        <button onClick={openMemoModal} className="btn btn-sm text-scordi mb-3 w-fit px-3">
                            {memo ? memo : '메모 남기기'}
                        </button>
                    </Container>
                </div>
            </MobileSection.Padding>

            <ModalLikeBottomBar className="left-0">
                <AddBillingHistoryModalBtn onClick={onClick} text="닫기" />
            </ModalLikeBottomBar>
        </Modal>
    );
});
