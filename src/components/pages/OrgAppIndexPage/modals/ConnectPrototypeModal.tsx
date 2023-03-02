import {memo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useRecoilState} from 'recoil';
import Swal from 'sweetalert2';
import {getOrganizationByCrawlerApi, getOrganizationListByCrawlerApi} from '^api/crawler';
import {connectPrototypeModalState, currentPrototypeState} from '^atoms/connectPrototypes.atom';
import {Modal, ModalActionWrapper} from '^components/Modal';
import {PreLoaderSm} from '^components/PreLoaderSm';
import {TextInput} from '^components/TextInput';
import {LoginDto, LoginWithOrgs, LoginWithVerify, OrgItemDto} from '^types/crawler';
import {errorNotify} from '^utils/toast-notify';

const teams = [
    {
        name: '북북2',
        image: 'string',
        profileUrl: 'string',
        billingPageUrl: 'string',
        membersPageUrl: 'string',
    },
    {
        name: '북',
        image: 'string',
        profileUrl: 'string',
        billingPageUrl: 'string',
        membersPageUrl: 'string',
    },
    {
        name: '북북',
        image: 'string',
        profileUrl: 'string',
        billingPageUrl: 'string',
        membersPageUrl: 'string',
    },
];

export const ConnectPrototypeModal = memo(() => {
    const form = useForm<LoginDto | LoginWithVerify | LoginWithOrgs>();
    const [isConnectModalOpen, setIsConnectModalOpen] = useRecoilState(connectPrototypeModalState);
    const [currentPrototype] = useRecoilState(currentPrototypeState);
    const [isCodeNeeded, setIsCodeNeeded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [checkTeam, setCheckTeam] = useState<OrgItemDto[]>([]);
    const [currentStage, setCurrentStage] = useState(1);

    if (currentPrototype === null) return <></>;
    const orgName = currentPrototype.name;

    const startConnectingProtoType = (params: LoginDto | LoginWithVerify) => {
        setIsLoading(true);
        setIsCodeNeeded(false);
        getOrganizationListByCrawlerApi(currentPrototype.id, params)
            .then((res) => {
                console.log('통신성공', res.data, checkTeam.length);
                setCheckTeam(teams);
                setCurrentStage(2);
                // res.data에 아무 값이 없음.
            })
            .catch((err) => {
                if (err.response.data.message.includes('인증코드')) {
                    setIsCodeNeeded(true);
                }
                console.log(err);
                // 잘못된 코드를 보내도 err발생하지 않음.
            })
            .finally(() => setIsLoading(false));
    };

    const submitOrg = (params: LoginWithOrgs) => {
        console.log('selectedName', params);
        if (!params.organizationName) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You didn't select organization!",
            });
        } else {
            if (params === undefined) return;
            setIsLoading(true);
            const parameters = params.verificationCode
                ? {email: params.email, password: params.password, verificationCode: params.verificationCode}
                : {email: params.email, password: params.password};
            getOrganizationByCrawlerApi(currentPrototype.id, params.organizationName[0], parameters)
                .then((res) => {
                    console.log(res);
                    setCurrentStage(3);
                })
                .catch((err) => errorNotify(err))
                .finally(() => setIsLoading(false));
        }
    };
    // 새로고침하지않으면 badrequest error 발생..

    return (
        <Modal type={'info'} isOpen={isConnectModalOpen} title={`Connect ${orgName}`}>
            {isLoading ? (
                <PreLoaderSm />
            ) : currentStage === 1 ? (
                <form onSubmit={form.handleSubmit(startConnectingProtoType)} className="pt-4">
                    <div className="flex items-center mb-4">
                        <TextInput
                            id="email"
                            label={`${orgName} ID`}
                            required
                            type="email"
                            {...form.register('email')}
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <TextInput
                            id="password"
                            label={`${orgName} PW`}
                            type="password"
                            required
                            {...form.register('password')}
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
                                {...form.register('verificationCode')}
                            />
                        </div>
                    )}
                    <ModalActionWrapper>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                form.setValue('email', '');
                                form.setValue('password', '');
                                setIsConnectModalOpen(false);
                                setIsCodeNeeded(false);
                            }}
                        >
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Next
                        </button>
                    </ModalActionWrapper>
                </form>
            ) : currentStage === 2 ? (
                <form className="flex flex-col mb-4 gap-y-4" onSubmit={form.handleSubmit(submitOrg)}>
                    <h4>Select your Organization</h4>
                    {checkTeam.map((team) => (
                        <label
                            key={team.name}
                            className="label cursor-pointer border border-indigo-300 rounded-xl shadow hover:shadow-lg p-3"
                            htmlFor={team.name}
                        >
                            <span className="label-text text-lg">{team.name}</span>
                            <input
                                id={team.name}
                                value={team.name}
                                type="radio"
                                className="radio radio-primary"
                                {...form.register('organizationName', {})}
                            />
                        </label>
                    ))}
                    <ModalActionWrapper>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                form.setValue('email', '');
                                form.setValue('password', '');
                                setCurrentStage(1);
                                setIsConnectModalOpen(false);
                                setIsCodeNeeded(false);
                            }}
                        >
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
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            form.setValue('email', '');
                            form.setValue('password', '');
                            setCurrentStage(1);
                            setIsConnectModalOpen(false);
                            setIsCodeNeeded(false);
                        }}
                    >
                        ok
                    </button>
                </div>
            )}
        </Modal>
    );
});
