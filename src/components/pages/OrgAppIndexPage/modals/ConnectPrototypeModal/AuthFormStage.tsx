import {Dispatch, memo, SetStateAction, useState} from 'react';
import {TextInput} from '^components/TextInput';
import {ModalActionWrapper} from '^components/Modal';
import {useForm, UseFormReturn} from 'react-hook-form';
import {LoginDto, LoginWithVerify} from '^types/crawler';
import {useRecoilState} from 'recoil';
import {
    connectModalAuthInfoState,
    connectModalConnectableOrgListState,
    connectModalIsLoadingState,
    connectModalStageState,
    connectPrototypeModalState,
    currentPrototypeState,
    useConnectPrototypeModalState,
} from '^atoms/connectPrototypes.atom';
import {getOrganizationListByCrawlerApi} from '^api/crawler';
import {errorNotify} from '^utils/toast-notify';
import {PreLoaderSm} from '^components/PreLoaderSm';

export const AuthFormStage = memo(() => {
    const {
        authForm,
        currentPrototype,
        setCurrentStage,
        isLoading,
        setIsLoading,
        setUserInfo,
        isCodeNeeded,
        setIsCodeNeeded,
        setCheckTeams,
        closeModal,
    } = useConnectPrototypeModalState();

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
                console.log('통신성공', res);
                setCheckTeams(res.data);
                setCurrentStage(2);
                authForm.resetField('verificationCode');
            })
            .catch((err) => {
                switch (err?.response?.data?.code) {
                    case 'DeviseVerificationError':
                        setIsCodeNeeded(true);
                        break;
                    case 'AvailableOrgNotFoundError':
                        break;
                    default:
                        break;
                }
                console.log('에러!!!!!!', err);
                errorNotify(err);
            })
            .finally(() => setIsLoading(false));
    };

    if (isLoading) return <PreLoaderSm />;

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
