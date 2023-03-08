import {memo} from 'react';
import Swal from 'sweetalert2';
import {getOrganizationByCrawlerApi} from '^api/crawler';
import {useConnectPrototypeModalState} from '^atoms/connectPrototypes.atom';
import {Modal, ModalActionWrapper} from '^components/Modal';
import {LoginWithOrgs} from '^types/crawler';
import {errorNotify} from '^utils/toast-notify';
import {AuthFormStage} from './ConnectPrototypeModal/AuthFormStage';

export const ConnectPrototypeModal = memo(() => {
    const {
        selectOrgForm,
        isConnectModalOpen,
        currentPrototype,
        currentStage,
        setCurrentStage,
        setIsLoading,
        userInfo,
        checkTeams,
        closeModal,
    } = useConnectPrototypeModalState();

    if (currentPrototype === null) return <></>;
    const orgName = currentPrototype.name;

    const submitOrg = (params: LoginWithOrgs) => {
        if (!params.organizationName) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You didn't select organization!",
            });
        } else {
            if (params === undefined) return;
            if (!userInfo) return;
            setIsLoading(true);
            const protoName = params.organizationName;

            getOrganizationByCrawlerApi(currentPrototype.id, protoName, userInfo)
                .then((res) => {
                    console.log(res);
                    setCurrentStage(3);
                })
                .catch(errorNotify)
                .finally(() => setIsLoading(false));
        }
    };

    return (
        <Modal type={'info'} isOpen={isConnectModalOpen} title={`Connect ${orgName}`}>
            {currentStage === 1 ? (
                <AuthFormStage />
            ) : currentStage === 2 ? (
                <form className="flex flex-col mb-4 gap-y-4" onSubmit={selectOrgForm.handleSubmit(submitOrg)}>
                    {typeof checkTeams === 'object' ? (
                        checkTeams.map((team) => (
                            <div key={team.name} className="flex flex-col gap-y-4">
                                <h4>Select your Organization</h4>
                                <label
                                    className="label cursor-pointer border border-indigo-300 rounded-xl shadow hover:shadow-lg p-3"
                                    htmlFor={team.name}
                                >
                                    <span className="label-text text-lg">{team.name}</span>
                                    <input
                                        id={team.name}
                                        value={team.name}
                                        type="radio"
                                        className="radio radio-primary"
                                        {...selectOrgForm.register('organizationName')}
                                    />
                                </label>
                            </div>
                        ))
                    ) : (
                        <h4>There's no organization to show</h4>
                    )}
                    <ModalActionWrapper>
                        <button type="button" className="btn" onClick={closeModal}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Next
                        </button>
                    </ModalActionWrapper>
                </form>
            ) : (
                <div className="flex flex-col mb-4 gap-y-4">
                    <h4>Successfully Submitted!</h4>
                    <p>Please wait untill connected.</p>
                    <button className="btn btn-primary" onClick={closeModal}>
                        ok
                    </button>
                </div>
            )}
        </Modal>
    );
});
