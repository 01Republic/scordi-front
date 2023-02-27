import {memo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useRecoilState} from 'recoil';
import {getOrganizationListByCrawlerApi} from '^api/crawler';
import {connectPrototypeModalState, currentPrototypeState} from '^atoms/connectPrototypes.atom';
import {Modal, ModalActionWrapper} from '^components/Modal';
import {PreLoaderSm} from '^components/PreLoaderSm';
import {TextInput} from '^components/TextInput';
import {LoginDto, LoginWithVerify, OrgItemDto} from '^types/crawler';

export const ConnectPrototypeModal = memo(() => {
    const form = useForm<LoginDto | LoginWithVerify>();
    const [isConnectModalOpen, setIsConnectModalOpen] = useRecoilState(connectPrototypeModalState);
    const [currentPrototype] = useRecoilState(currentPrototypeState);
    const [isCodeNeeded, setIsCodeNeeded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [checkTeam, setCheckTeam] = useState<OrgItemDto[]>([]);

    if (currentPrototype === null) return <></>;
    const orgName = currentPrototype.name;

    const startConnectingProtoType = (params: LoginDto | LoginWithVerify) => {
        setIsLoading(true);
        setIsCodeNeeded(false);
        getOrganizationListByCrawlerApi(currentPrototype.id, params)
            .then((res) => {
                console.log('통신성공', res.data, checkTeam.length);
                setCheckTeam(res.data);
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

    return (
        <Modal type={'info'} isOpen={isConnectModalOpen} title={`Connect ${orgName}`}>
            {isLoading ? (
                <PreLoaderSm />
            ) : (
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
                    {/* {checkTeam.length > 0 && (
                        <div className="flex mb-4">
                            {checkTeam.map((team) => {
                                <input id={team.name} type="checkbox" className="" {...form.register()} />;
                            })}
                        </div>
                    )} */}
                    <ModalActionWrapper>
                        <button type="submit" className="btn">
                            Submit
                        </button>
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
                    </ModalActionWrapper>
                </form>
            )}
        </Modal>
    );
});
