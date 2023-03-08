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
                        {/*<svg*/}
                        {/*    xmlns="http://www.w3.org/2000/svg"*/}
                        {/*    className="stroke-current flex-shrink-0 h-6 w-6"*/}
                        {/*    fill="none"*/}
                        {/*    viewBox="0 0 24 24"*/}
                        {/*>*/}
                        {/*    <path*/}
                        {/*        strokeLinecap="round"*/}
                        {/*        strokeLinejoin="round"*/}
                        {/*        strokeWidth="2"*/}
                        {/*        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"*/}
                        {/*    />*/}
                        {/*</svg>*/}
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
