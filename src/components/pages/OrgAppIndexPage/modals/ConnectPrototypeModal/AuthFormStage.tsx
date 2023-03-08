import {memo, useEffect} from 'react';
import {TextInput} from '^components/TextInput';
import {ModalActionWrapper} from '^components/Modal';
import {LoginDto, LoginWithVerify} from '^types/crawler';
import {ConnectModalStage, useConnectPrototypeModalState} from '^atoms/connectPrototypes.atom';
import {getOrganizationListByCrawlerApi} from '^api/crawler';
import {PreLoaderSm} from '^components/PreLoaderSm';

export const AuthFormStage = memo(() => {
    const {
        authForm,
        currentPrototype,
        setCurrentStage,
        isLoading,
        setIsLoading,
        isCodeNeeded,
        setIsCodeNeeded,
        setCheckTeams,
        closeModal,
        connectApiCatchHandler,
    } = useConnectPrototypeModalState();

    // 이 단계가 로딩시 초기화
    useEffect(() => {
        setIsLoading(false);
        setIsCodeNeeded(false);
    }, []);

    if (isLoading) return <PreLoaderSm />;
    if (currentPrototype === null) return <></>;
    const orgName = currentPrototype.name;

    const startConnectingProtoType = (params: LoginDto | LoginWithVerify) => {
        setIsLoading(true);

        getOrganizationListByCrawlerApi(currentPrototype.id, params)
            .then((res) => {
                console.log('통신성공', res);
                setCheckTeams(res.data);
                setCurrentStage(ConnectModalStage.SelectOrgStage);
            })
            .catch(connectApiCatchHandler)
            .finally(() => setIsLoading(false));
    };

    return (
        <form onSubmit={authForm.handleSubmit(startConnectingProtoType)} className="pt-4">
            <div className="flex items-center mb-4">
                <TextInput id="email" label={`${orgName} ID`} required type="email" {...authForm.register('email')} />
            </div>
            <div className="flex items-center mb-4">
                <TextInput
                    id="password"
                    label={`${orgName} PW`}
                    type="password"
                    required
                    {...authForm.register('password')}
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
                        {...authForm.register('verificationCode')}
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
    );
});
