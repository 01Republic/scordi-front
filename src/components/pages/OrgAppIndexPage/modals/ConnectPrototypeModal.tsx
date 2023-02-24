import {memo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useRecoilState} from 'recoil';
import {getOrganizationListByCrawlerApi} from '^api/crawler';
import {connectPrototypeModalState, currentPrototypeState} from '^atoms/connectPrototypes.atom';
import {Modal, ModalActionWrapper} from '^components/Modal';
import {PreLoader} from '^components/PreLoader';
import {TextInput} from '^components/TextInput';
import {LoginDto, LoginWithVerify, OrgItemDto} from '^types/crawler';

export const ConnectPrototypeModal = memo(() => {
    const form = useForm<LoginWithVerify>();
    const [isConnectModalOpen, setIsConnectModalOpen] = useRecoilState(connectPrototypeModalState);
    const [currentPrototype] = useRecoilState(currentPrototypeState);
    const [isCodeNeeded, setIsCodeNeeded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [checkTeam, setCheckTeam] = useState<OrgItemDto>();

    if (currentPrototype === null) return <></>;
    const orgName = currentPrototype.name;

    const startConnectingProtoType = (params: LoginDto | LoginWithVerify) => {
        setIsLoading(true);
        getOrganizationListByCrawlerApi(currentPrototype.id, params)
            .then((res) => {
                console.log('통신성공', res.data);
                // setCheckTeam(res.data);
                // 🚨오류 : 'OrgItemDto[]' 형식의 인수는 'SetStateAction<OrgItemDto | undefined>' 형식의 매개 변수에 할당될 수 없습니다.
            })
            .catch((err) => {
                if (err.response.data.message.includes('인증코드')) {
                    setIsCodeNeeded(true);
                }
            })
            .finally(() => setIsLoading(false));
    };

    // 🚨문제 : 조직 선택을 state로 관리하다보니 조직 선택이 필요하지 않은 prototype에서도 LoginwithVerify form을 제출하는 것 같다.
    // 새로고침을 했을때는 문제가 없지만 notion / slack을 거치고 github를 클릭할 경우 오류 발생.
    return (
        <Modal type={'info'} isOpen={isConnectModalOpen} title={`Connect ${orgName}`}>
            {isLoading ? (
                <PreLoader />
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
