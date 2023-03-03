import {memo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {useRecoilState} from 'recoil';
import Swal from 'sweetalert2';
import {getOrganizationByCrawlerApi, getOrganizationListByCrawlerApi} from '^api/crawler';
import {connectPrototypeModalState, currentPrototypeState} from '^atoms/connectPrototypes.atom';
import {Modal, ModalActionWrapper} from '^components/Modal';
import {PreLoaderSm} from '^components/PreLoaderSm';
import {TextInput} from '^components/TextInput';
import {LoginDto, LoginWithOrgs, LoginWithVerify, OrgItemDto} from '^types/crawler';
import {errorNotify} from '^utils/toast-notify';

export const ConnectPrototypeModal = memo(() => {
    const loginForm = useForm<LoginDto | LoginWithVerify>();
    const selectOrgForm = useForm<LoginWithOrgs>();
    const [isConnectModalOpen, setIsConnectModalOpen] = useRecoilState(connectPrototypeModalState);
    const [currentPrototype] = useRecoilState(currentPrototypeState);
    const [isCodeNeeded, setIsCodeNeeded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<LoginDto | null>();
    const [checkTeams, setCheckTeams] = useState<OrgItemDto[]>([]);
    const [currentStage, setCurrentStage] = useState(1);

    if (currentPrototype === null) return <></>;
    const orgName = currentPrototype.name;

    const startConnectingProtoType = (params: LoginDto | LoginWithVerify) => {
        setIsLoading(true);
        setIsCodeNeeded(false);
        setUserInfo({
            email: params.email,
            password: params.password,
        });

        getOrganizationListByCrawlerApi(currentPrototype.id, params)
            .then((res) => {
                console.log('통신성공', res, checkTeams.length);
                setCheckTeams(res.data);
                setCurrentStage(2);
                loginForm.resetField('verificationCode');
            })
            .catch((err) => {
                if (err.response.data) {
                    const {code, message} = err.response.data;
                    if (code === 'DeviseVerificationError') {
                        setIsCodeNeeded(true);
                        toast.error(message);
                    }
                    if (code === 'AvailableOrgNotFoundError') {
                        toast.error(message);
                    }
                    console.log('에러!!!!!!', err);
                } else {
                    errorNotify(err);
                }
            })
            .finally(() => setIsLoading(false));
    };

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

    const closeModal = () => {
        loginForm.setValue('email', '');
        loginForm.setValue('password', '');
        loginForm.resetField('verificationCode');
        setIsConnectModalOpen(false);
        setIsCodeNeeded(false);
        setCurrentStage(1);
    };

    return (
        <Modal type={'info'} isOpen={isConnectModalOpen} title={`Connect ${orgName}`}>
            {isLoading ? (
                <PreLoaderSm />
            ) : currentStage === 1 ? (
                <form onSubmit={loginForm.handleSubmit(startConnectingProtoType)} className="pt-4">
                    <div className="flex items-center mb-4">
                        <TextInput
                            id="email"
                            label={`${orgName} ID`}
                            required
                            type="email"
                            {...loginForm.register('email')}
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <TextInput
                            id="password"
                            label={`${orgName} PW`}
                            type="password"
                            required
                            {...loginForm.register('password')}
                        />
                    </div>
                    {isCodeNeeded && (
                        <div className="flex mb-4">
                            <TextInput
                                id="verificationCode"
                                label={`${orgName} Verification Code`}
                                type="text"
                                required
                                placeholder="Check your email and get your megic code"
                                {...loginForm.register('verificationCode')}
                            />
                        </div>
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
