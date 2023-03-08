import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ModalActionWrapper} from '^components/Modal';
import {ConnectModalStage, useConnectPrototypeModalState} from '^atoms/connectPrototypes.atom';
import {LoginWithOrgs} from '^types/crawler';
import Swal from 'sweetalert2';
import {getOrganizationByCrawlerApi} from '^api/crawler';
import {errorNotify} from '^utils/toast-notify';
import {PreLoaderSm} from '^components/PreLoaderSm';

export const SelectOrgStage = memo(() => {
    const {
        selectOrgForm,
        currentPrototype,
        setCurrentStage,
        isLoading,
        setIsLoading,
        userInfo,
        checkTeams,
        closeModal,
    } = useConnectPrototypeModalState();

    if (isLoading) return <PreLoaderSm />;
    if (currentPrototype === null) return <></>;

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
                    setCurrentStage(ConnectModalStage.SuccessfullySubmitted);
                })
                .catch(errorNotify)
                .finally(() => setIsLoading(false));
        }
    };

    return (
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
    );
});
