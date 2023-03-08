import {atom, useRecoilState} from 'recoil';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {LoginDto, LoginWithOrgs, LoginWithVerify, OrgItemDto} from '^types/crawler';
import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';

// 연동 모달의 활성화 여부
export const connectPrototypeModalState = atom({
    key: 'connectPrototypeModalState',
    default: false,
});

// 연동 모달의 연동대상 SaaS 앱
export const currentPrototypeState = atom<ApplicationPrototypeDto | null>({
    key: 'currentPrototypeState',
    default: null,
});

// 연동 모달의 진행 단계
// 1 = AuthFormStage
// 2 = SelectOrgStage
// 3 = SuccessfullySubmitted
export enum ConnectModalStage {
    AuthFormStage = 1,
    SelectOrgStage = 2,
    SuccessfullySubmitted = 3,
}
export const connectModalStageState = atom<ConnectModalStage>({
    key: 'connectModalStageState',
    default: ConnectModalStage.AuthFormStage,
});

// 연동 모달의 로딩 상태
export const connectModalIsLoadingState = atom<boolean>({
    key: 'connectModalIsLoadingState',
    default: false,
});

// 연동 모달에 입력한 계정정보
export const connectModalAuthInfoState = atom<LoginDto | null>({
    key: 'connectModalAuthInfoState',
    default: null,
});

// 연동 모달로 불러온 연동가능한 조직 후보 목록
export const connectModalConnectableOrgListState = atom<OrgItemDto[]>({
    key: 'connectModalConnectableOrgListState',
    default: [],
});

// 연동 모달 내부의 여러 컴포넌트에서 공유할 필요가 있는 상태값을 한 번에 관리
export const useConnectPrototypeModalState = () => {
    const [isConnectModalOpen, setIsConnectModalOpen] = useRecoilState(connectPrototypeModalState);
    const [currentPrototype] = useRecoilState(currentPrototypeState);
    const [currentStage, setCurrentStage] = useRecoilState(connectModalStageState);
    const [isLoading, setIsLoading] = useRecoilState(connectModalIsLoadingState);
    const [userInfo, setUserInfo] = useRecoilState(connectModalAuthInfoState);
    const [isCodeNeeded, setIsCodeNeeded] = useState(false);
    const [checkTeams, setCheckTeams] = useRecoilState(connectModalConnectableOrgListState);
    const authForm = useForm<LoginDto | LoginWithVerify>();
    const selectOrgForm = useForm<LoginWithOrgs>();

    const closeModal = useCallback(() => {
        authForm.resetField('email');
        authForm.resetField('password');
        authForm.resetField('verificationCode');
        setIsConnectModalOpen(false);
        setIsCodeNeeded(false);
        setCurrentStage(ConnectModalStage.AuthFormStage);
    }, []);

    return {
        isConnectModalOpen,
        setIsConnectModalOpen,
        currentPrototype,
        currentStage,
        setCurrentStage,
        isLoading,
        setIsLoading,
        userInfo,
        setUserInfo,
        isCodeNeeded,
        setIsCodeNeeded,
        checkTeams,
        setCheckTeams,
        authForm,
        selectOrgForm,
        closeModal,
    };
};
