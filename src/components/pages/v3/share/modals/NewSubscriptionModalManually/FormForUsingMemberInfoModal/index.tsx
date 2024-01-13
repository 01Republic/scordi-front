import React, {memo} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {FormControl} from '^components/util/form-control';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {newFormForUsingMemberInfoModalAtom} from '../atom';
import {MasterSelectSection} from './MasterSelectSection';
import {NextButton} from './NextButton';
import {ModalTitle} from '^v3/share/modals/ModalTitle';

export const FormForUsingMemberInfoModal = memo(function FormForUsingMemberInfoModal() {
    const {Modal, close} = useModal(newFormForUsingMemberInfoModalAtom);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="새로운 구독 추가" backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.Padding>
                <div>
                    <ModalTitle title={`구독을 관리하는 \n 담당자를 선택해주세요`} />

                    <div className="w-full flex flex-col gap-4">
                        <FormControl topLeftLabel="누가 담당하고 있나요?">
                            <MasterSelectSection />
                        </FormControl>
                    </div>
                </div>
            </MobileSection.Padding>

            <ModalLikeBottomBar>
                <NextButton />
            </ModalLikeBottomBar>
        </Modal>
    );
});
