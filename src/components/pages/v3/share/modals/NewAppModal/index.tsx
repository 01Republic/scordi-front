import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {newAppModal} from '^components/pages/v3/share/modals/NewAppModal/atom';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {newInvoiceAccountModal} from '^v3/share/modals/NewInvoiceAccountModal/atom';
import {useToast} from '^hooks/useToast';
import {NewInvoiceAccountModal} from 'src/components/pages/v3/share/modals/NewInvoiceAccountModal';
import {newFormForGeneralInfoModalAtom} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {NewSubscriptionModalManually} from '^v3/share/modals/NewSubscriptionModalManually';
import {MobileSection} from '../../sections/MobileSection';

export const NewAppModal = memo(() => {
    const {Modal, close, setIsShow} = useModal(newAppModal);
    const {open: newInvoiceAccountModalOpen, close: newInvoiceAccountModalClose} = useModal(newInvoiceAccountModal);
    const {open: newSubscriptionManuallyModalOpen} = useModal(newFormForGeneralInfoModalAtom);
    const {toast} = useToast();

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] flex flex-col">
                <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

                <MobileSection.Padding className="flex-1">
                    <div className="flex flex-col gap-20 h-full">
                        <div className="pt-5">
                            <h2 className="h1 leading-tight">어떤 방법으로 등록할까요?</h2>
                        </div>

                        <div className="flex-1 pt-16">
                            <div className="flex flex-col gap-4 sm:gap-2">
                                <button
                                    onClick={newInvoiceAccountModalOpen}
                                    className="btn btn-block btn-lg border border-gray-200"
                                >
                                    이메일로부터 여러개 한꺼번에 등록하기
                                </button>

                                <button
                                    onClick={() => toast.info('준비중입니다.')}
                                    className="btn btn-block btn-lg border border-gray-200 text-gray-400 hover:bg-gray-200 hover:border-gray-200"
                                >
                                    앱 로그인으로 자세한 구독 상태 연동하기
                                </button>

                                <button
                                    onClick={() => {
                                        newSubscriptionManuallyModalOpen();
                                        setIsShow(false);
                                    }}
                                    className="btn btn-block btn-md btn-link "
                                >
                                    그냥 직접 입력할래요
                                </button>
                            </div>
                        </div>
                    </div>
                </MobileSection.Padding>
            </Modal>
            <NewInvoiceAccountModal />
        </>
    );
});
