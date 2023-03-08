import {memo} from 'react';
import {ConnectModalStage, useConnectPrototypeModalState} from '^atoms/connectPrototypes.atom';
import {Modal} from '^components/Modal';
import {AuthFormStage} from './ConnectPrototypeModal/AuthFormStage';
import {SelectOrgStage} from '^components/pages/OrgAppIndexPage/modals/ConnectPrototypeModal/SelectOrgStage';
import {SuccessfullySubmitted} from '^components/pages/OrgAppIndexPage/modals/ConnectPrototypeModal/SuccessfullySubmitted';

export const ConnectPrototypeModal = memo(() => {
    const {isConnectModalOpen, currentPrototype, currentStage} = useConnectPrototypeModalState();

    if (currentPrototype === null) return <></>;
    const orgName = currentPrototype.name;

    return (
        <Modal type={'info'} isOpen={isConnectModalOpen} title={`Connect ${orgName}`}>
            {currentStage === ConnectModalStage.AuthFormStage && <AuthFormStage />}
            {currentStage === ConnectModalStage.SelectOrgStage && <SelectOrgStage />}
            {currentStage === ConnectModalStage.SuccessfullySubmitted && <SuccessfullySubmitted />}
        </Modal>
    );
});
