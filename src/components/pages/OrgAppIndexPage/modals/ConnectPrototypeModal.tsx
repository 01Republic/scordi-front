import {memo} from 'react';
import {ConnectModalStage, useConnectPrototypeModalState} from '^atoms/connectPrototypes.atom';
import {Modal} from '^components/Modal';
import {AuthFormStage} from './ConnectPrototypeModal/AuthFormStage';
import {SelectOrgStage} from '^components/pages/OrgAppIndexPage/modals/ConnectPrototypeModal/SelectOrgStage';
import {SuccessfullySubmitted} from '^components/pages/OrgAppIndexPage/modals/ConnectPrototypeModal/SuccessfullySubmitted';
import {IoIosCloseCircleOutline} from 'react-icons/io';

export const ConnectPrototypeModal = memo(() => {
    const {isConnectModalOpen, currentPrototype, currentStage, errorMessage, closeModal} =
        useConnectPrototypeModalState();

    if (currentPrototype === null) return <></>;
    const protoName = currentPrototype.name;

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
                        <IoIosCloseCircleOutline size={22} />
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
