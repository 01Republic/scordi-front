import {memo} from 'react';
import {ConnectModalStage, useConnectPrototypeModalState} from '^atoms/connectProducts.atom';
import {Modal} from '^components/Modal';
import {AuthFormStage} from './ConnectPrototypeModal/AuthFormStage';
import {SelectOrgStage} from './ConnectPrototypeModal/SelectOrgStage';
import {SuccessfullySubmitted} from './ConnectPrototypeModal/SuccessfullySubmitted';
import {XCircle} from 'lucide-react';

export const ConnectPrototypeModal = memo(() => {
    const {isConnectModalOpen, currentProduct, currentStage, errorMessage, closeModal} =
        useConnectPrototypeModalState();

    if (currentProduct === null) return <></>;
    const protoName = currentProduct.nameEn;

    return (
        <Modal
            type={'info'}
            isOpen={isConnectModalOpen}
            title={`Connect ${protoName}`}
            closeButton={{
                isDisplayed: true,
                onClick: closeModal,
            }}
        >
            {errorMessage && (
                <div className="alert alert-error shadow-lg mt-5">
                    <div className="flex items-center gap-2">
                        <XCircle size={22} />
                        <p className="text-sm">
                            {protoName}: <span className="font-semibold">"Error! {errorMessage}"</span>
                        </p>
                    </div>
                </div>
            )}
            {currentStage === ConnectModalStage.AuthFormStage && <AuthFormStage />}
            {currentStage === ConnectModalStage.SelectOrgStage && <SelectOrgStage />}
            {currentStage === ConnectModalStage.SuccessfullySubmitted && <SuccessfullySubmitted />}
        </Modal>
    );
});
