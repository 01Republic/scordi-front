import {atom, useRecoilState} from 'recoil';
import {ProductDto} from '^models/Product/type';
import {LoginDto, LoginWithOrgs, LoginWithVerify, WorkspaceItemDto} from '^types/crawler';
import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {errorNotify} from '^utils/toast-notify';
import {AxiosError} from 'axios';
import {AccountDto} from '^types/account.type';
import {crawlerApiV2} from '^api/crawler/crawler.api.v2';
import {errorToast} from '^api/api';
import {toast} from 'react-toastify';
import {ConnectResultDto, ConnectResultResponseDto} from '^types/crawler/connect-result-response.dto';
import {workspaceApi, workspaceMemberApi} from '^api/workspace.api';
import {subscriptionApi} from '^models/Subscription/api';
import {billingHistoryApi} from '^api/billing.api';

// 연동 모달의 활성화 여부
export const connectProductModalState = atom({
    key: 'connectProductModalState',
    default: false,
});

// 연동 모달의 연동대상 SaaS 앱
export const currentProductState = atom<ProductDto | null>({
    key: 'currentProductState',
    default: null,
});

// 연동 모달의 진행 단계
// 1 = AuthFormStage
// 2 = SelectOrgStage
// 3 = SuccessfullySubmitted
export enum ConnectModalStage {
    AuthFormStage = 1,
    SelectOrgStage = 2,
    AllFetched = 3,
    SuccessfullySubmitted = 4,
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

// 연동 모달의 에러메세지
export const connectModalErrorMessage = atom({
    key: 'connectModalErrorMessage',
    default: '',
});

// // 연동 모달에 입력한 계정정보
export const connectModalAuthInfoState = atom<LoginDto | null>({
    key: 'connectModalAuthInfoState',
    default: null,
});

// 연동 모달로 불러온 연동가능한 조직 후보 목록
export const connectModalConnectableOrgListState = atom<WorkspaceItemDto[]>({
    key: 'connectModalConnectableOrgListState',
    default: [],
});

export const createdApplicationIdState = atom<number>({
    key: 'createdApplicationId',
    default: 0,
});

// V2
export const syncAccountAtom = atom({
    key: `syncAccount`,
    default: {} as AccountDto,
});

export const workspaceListAtom = atom({
    key: `workspaceList`,
    default: [] as WorkspaceItemDto[],
});

// 연동 모달 내부의 여러 컴포넌트에서 공유할 필요가 있는 상태값을 한 번에 관리
export const useConnectPrototypeModalState = () => {
    const [isConnectModalOpen, setIsConnectModalOpen] = useRecoilState(connectProductModalState);
    const [currentProduct] = useRecoilState(currentProductState);
    const [currentStage, setCurrentStage] = useRecoilState(connectModalStageState);
    const [isLoading, setIsLoading] = useRecoilState(connectModalIsLoadingState);
    const [errorMessage, setErrorMessage] = useRecoilState(connectModalErrorMessage);
    const [authInfo, setAuthInfo] = useRecoilState(connectModalAuthInfoState);
    const [isCodeNeeded, setIsCodeNeeded] = useState(false);
    const [checkTeams, setCheckTeams] = useRecoilState(connectModalConnectableOrgListState);
    const [createdApplicationId, setCreatedApplicationId] = useRecoilState(createdApplicationIdState);
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

    const connectApiCatchHandler = useCallback((err: AxiosError<any>) => {
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
        setErrorMessage(err?.response?.data?.message);
        errorNotify(err);
    }, []);

    useEffect(() => {
        if (isLoading) setErrorMessage('');
    }, [isLoading]);

    // V2
    const [syncAccount, setSyncAccount] = useRecoilState(syncAccountAtom);
    const [workspaces, setWorkspaces] = useRecoilState(workspaceListAtom);
    const [result, setResult] = useState<ConnectResultDto | null>(null);

    const login = (loginQuery: LoginDto) => {
        if (!currentProduct) return null;

        setIsLoading(true);

        crawlerApiV2
            .getWorkspaces(currentProduct.id, loginQuery)
            .then((res) => {
                const {data, isSuccess, account} = res.data;
                if (isSuccess && account) {
                    setSyncAccount(account);
                    setWorkspaces(data);
                    setCurrentStage(ConnectModalStage.SelectOrgStage);

                    return data;
                } else {
                    toast.error(`Server failed.\nPlease request to admin.`);
                }
            })
            .catch(connectApiCatchHandler)
            .finally(() => setIsLoading(false));
    };

    const loginWithVerifyCode = (loginQuery: LoginDto, verificationCode: string) => {
        if (!currentProduct) return null;

        setIsLoading(true);

        crawlerApiV2
            .deviseVerification(currentProduct.id, loginQuery, verificationCode)
            .then((res) => {
                const {data, isSuccess, account} = res.data;
                if (isSuccess && account) {
                    setSyncAccount(account);
                    setWorkspaces(data);
                    setCurrentStage(ConnectModalStage.SelectOrgStage);

                    return data;
                } else {
                    toast.error(`Server failed.\nPlease request to admin.`);
                }
            })
            .catch(connectApiCatchHandler)
            .finally(() => setIsLoading(false));
    };

    const getAll = (key: string) => {
        if (!currentProduct) return null;

        setIsLoading(true);

        crawlerApiV2
            .getAll(currentProduct.id, syncAccount.id, key)
            .then((res) => {
                const {data, isSuccess, failed} = res.data;
                if (isSuccess) {
                    if (failed && failed.length > 0) {
                        // 실패한 요청에 대한 대응
                    }
                    setCurrentStage(ConnectModalStage.AllFetched);
                    setResult(data);

                    return data;
                } else {
                    toast.error(`Server failed.\nPlease request to admin.`);
                }
            })
            .catch(connectApiCatchHandler)
            .finally(() => setIsLoading(false));
    };

    const connect = () => {
        if (!currentProduct) return;
        if (!result) return;

        setIsLoading(true);

        const {profile, billingInfo, billingHistories, members} = result;

        crawlerApiV2.connect(currentProduct.id, syncAccount.id, profile.slug, result).then((res) => {
            console.log(res.data);
            return res.data;
        });
    };

    return {
        isConnectModalOpen,
        setIsConnectModalOpen,
        currentProduct,
        currentStage,
        setCurrentStage,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
        authInfo,
        setAuthInfo,
        isCodeNeeded,
        setIsCodeNeeded,
        checkTeams,
        setCheckTeams,
        createdApplicationId,
        setCreatedApplicationId,
        authForm,
        selectOrgForm,
        closeModal,
        connectApiCatchHandler,
        // v2
        login,
        loginWithVerifyCode,
        getAll,
        connect,
    };
};
