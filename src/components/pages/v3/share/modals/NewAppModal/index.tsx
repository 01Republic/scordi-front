import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {newAppModal} from '^components/pages/v3/share/modals/NewAppModal/atom';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {newInvoiceAccountModal} from '^v3/V3OrgHomePage/NewInvoiceAccountModal/atom';
import {useToast} from '^hooks/useToast';
import {NewInvoiceAccountModal} from '^v3/V3OrgHomePage/NewInvoiceAccountModal';
import {newFormForGeneralInfoModalAtom} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {NewSubscriptionModalManually} from '^v3/share/modals/NewSubscriptionModalManually';

export const NewAppModal = memo(() => {
    const {Modal, close} = useModal(newAppModal);
    const {open: newInvoiceAccountModalOpen, close: newInvoiceAccountModalClose} = useModal(newInvoiceAccountModal);
    const {open: newSubscriptionManuallyModalOpen} = useModal(newFormForGeneralInfoModalAtom);
    const {toast} = useToast();

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
                <div className="px-5 flex flex-col justify-start gap-20">
                    <div className="py-5">
                        <br />
                        <br />
                        <p className="mb-4">새로운 앱 등록하기</p>
                        <h2 className="h1 leading-tight">
                            어떤 방법으로 <br /> 앱을 등록할까요?
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-2">
                        <button
                            onClick={newInvoiceAccountModalOpen}
                            className="btn btn-block btn-lg border border-gray-200"
                        >
                            이메일로부터 여러 앱 한꺼번에 등록하기
                        </button>
                        <button
                            onClick={() => toast.info('준비중입니다.')}
                            className="btn btn-block btn-lg border border-gray-200"
                        >
                            앱 로그인으로 자세한 앱 상태 조회하기
                        </button>
                        <button onClick={newSubscriptionManuallyModalOpen} className="btn btn-block btn-md btn-link ">
                            그냥 직접 입력할래요
                        </button>
                    </div>
                </div>
            </Modal>
            <NewInvoiceAccountModal />
            <NewSubscriptionModalManually />
        </>
    );
});
