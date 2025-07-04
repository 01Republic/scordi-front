import React, {createContext, memo, ReactNode, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useOrgIdParam} from '^atoms/common';
import {useCodefAccountsInConnectorV2} from '^models/CodefAccount/hook';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefApiAccountItemDto} from '^models/CodefAccount/type/CodefApiAccountItemDto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {AssetConnectMethodSelectStep} from './AssetConnectMethodSelectStep';
import {AssetConnectByCertificateFlow} from './AssetConnectByCertificateFlow';
import {AssetConnectByAccountFlow} from './AssetConnectByAccountFlow';
import {SelectAssetsStep} from './AssetConnectByCertificateFlow/steps/SelectAssetsStep';
import {ConnectAssetsStep} from './AssetConnectByCertificateFlow/steps/ConnectAssetsStep';
import {useRouter} from 'next/router';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountDto} from '^models/BankAccount/type';
import {useUnmount} from '^hooks/useUnmount';

export enum ConnectAssetsStepStrategy {
    CreateScordiAssets = 'createScordiAssets',
    SyncSubscriptions = 'syncSubscriptions',
}

interface AssetConnectOption {
    ConnectMethodAltActionButton?: () => JSX.Element;
    onSuccess?: (connectedAssets: (CreditCardDto | BankAccountDto)[]) => any;
    /** 방법선택 페이지 설정 */
    assetConnectMethodSelectStep?: {
        title?: ReactNode;
        subTitle?: ReactNode;
    };
    /** 자산선택 페이지 설정 */
    selectAssetsStep?: {
        title?: ReactNode;
        subTitle?: ReactNode;
        nextButtonText?: ReactNode;
    };
    /** 연동중 페이지 설정 */
    connectAssetsStep: {
        strategy: ConnectAssetsStepStrategy;
    };
}

export const AssetConnectOptionContext = createContext<AssetConnectOption>({
    // onSuccess: console.log,
    // onSuccessfullyCreateByCertificate: console.log,
    // onSuccessfullyCreatedByAccount: console.log,
    connectAssetsStep: {strategy: ConnectAssetsStepStrategy.SyncSubscriptions},
});

enum AssetConnectStep {
    AccountCreateStep,
    SelectAssetsStep,
    ConnectAssetsStep,
}

/**
 * 자산 동기화 Flow
 * ---
 */
export const AssetConnectPageTemplate = memo((props: AssetConnectOption) => {
    const {onSuccess, selectAssetsStep, connectAssetsStep} = props;
    const router = useRouter();
    const orgId = useOrgIdParam();
    useCodefAccountsInConnectorV2(orgId);
    const [step, setStep] = useState(AssetConnectStep.AccountCreateStep);
    const [isAppendable, setIsAppendable] = useState(false);
    const [codefAccounts, setCodefAccounts] = useState<CodefAccountDto[]>();
    const [failedCompanies, setFailedCompanies] = useState<CodefApiAccountItemDto[]>();
    const [isAfterAccountCreated, setIsAfterAccountCreated] = useState(false);
    const [selectedCodefAssets, setSelectedCodefAssets] = useState<(CodefCardDto | CodefBankAccountDto)[]>();

    const form = useForm<CreateAccountRequestDto>({
        mode: 'all',
        defaultValues: {
            clientType: CodefCustomerType.Business,
            isAgreeForPrivacyPolicyTerm: false,
            isAgreeForServiceUsageTerm: false,
        },
    });

    useUnmount(() => {
        // 초기화
        form.reset({
            loginType: undefined,
            clientType: CodefCustomerType.Business,
            isAgreeForPrivacyPolicyTerm: false,
            isAgreeForServiceUsageTerm: false,
        });
        setIsAppendable(false);
        setIsAfterAccountCreated(false);
        setStep(AssetConnectStep.AccountCreateStep);
        setSelectedCodefAssets(undefined);
    }, []);

    const loginType = form.watch('loginType');

    return (
        <AssetConnectOptionContext.Provider value={props}>
            {step === AssetConnectStep.AccountCreateStep && (
                <FormProvider {...form}>
                    <div>
                        {/* 연동방법 선택 (소위, 약관동의 페이지) */}
                        {!loginType && <AssetConnectMethodSelectStep />}

                        {/* 공동인증서로 자산 불러오기 Flow */}
                        {loginType === CodefLoginType.Certificate && (
                            <AssetConnectByCertificateFlow
                                isAppendable={isAppendable}
                                onBack={() => {
                                    if (isAppendable) {
                                        setStep(AssetConnectStep.SelectAssetsStep);
                                        setIsAppendable(false);
                                    } else {
                                        form.reset({loginType: undefined});
                                    }
                                }}
                                onFinish={(codefAccounts, failedCompanies, afterAccountCreated) => {
                                    setCodefAccounts(codefAccounts);
                                    setFailedCompanies(failedCompanies);
                                    setIsAfterAccountCreated(afterAccountCreated);
                                    setStep(AssetConnectStep.SelectAssetsStep);
                                }}
                            />
                        )}

                        {/* 홈페이지계정으로 자산 불러오기 Flow */}
                        {loginType === CodefLoginType.IdAccount && (
                            <AssetConnectByAccountFlow
                                isAppendable={isAppendable}
                                onBack={() => {
                                    if (isAppendable) {
                                        setStep(AssetConnectStep.SelectAssetsStep);
                                        setIsAppendable(false);
                                    } else {
                                        form.reset({loginType: undefined});
                                    }
                                }}
                                onFinish={(codefAccounts, failedCompanies, afterAccountCreated) => {
                                    setCodefAccounts(codefAccounts);
                                    setFailedCompanies(failedCompanies);
                                    setIsAfterAccountCreated(afterAccountCreated);
                                    setStep(AssetConnectStep.SelectAssetsStep);
                                }}
                            />
                        )}
                    </div>
                </FormProvider>
            )}

            {/* 자산 선택p : 자산 연동이 완료된 자산 목록을 보여주고 스코디 자산으로 연동할 자산을 선택 */}
            {step === AssetConnectStep.SelectAssetsStep && (
                <SelectAssetsStep
                    {...selectAssetsStep}
                    isAfterAccountCreated={isAfterAccountCreated}
                    codefAccounts={codefAccounts || []}
                    failedCompanies={failedCompanies}
                    // 뒤로가기 버튼 클릭시 동작을 정의
                    onBack={() => {
                        // 공동인증서로 조회한 경우 => 등록방법 선택p 로 이동. (그렇지않으면 기관 선택p 로 이동.)
                        if (form.getValues('loginType') === CodefLoginType.Certificate) {
                            form.reset({loginType: undefined});
                        }
                        setIsAfterAccountCreated(false);
                        setStep(AssetConnectStep.AccountCreateStep);
                    }}
                    // 처음으로
                    onReset={() => {
                        form.reset({loginType: undefined});
                        setIsAfterAccountCreated(false);
                        setStep(AssetConnectStep.AccountCreateStep);
                    }}
                    onMove={() => {
                        setIsAppendable(true);
                        setStep(AssetConnectStep.AccountCreateStep);
                    }}
                    onNext={(codefBanks, codefCards, disabled, allConnected) => {
                        if (disabled || allConnected) return router.push(OrgMainPageRoute.path(orgId));

                        setSelectedCodefAssets([...codefBanks, ...codefCards]);
                        setStep(AssetConnectStep.ConnectAssetsStep);
                    }}
                />
            )}

            {/* 자산 연동중p : 스코디 자산으로 선택한 목록들을 연동 및 sync 요청 후 성공 시 성공페이지로 넘김 */}
            {step === AssetConnectStep.ConnectAssetsStep && (
                <ConnectAssetsStep
                    {...connectAssetsStep}
                    codefAssets={selectedCodefAssets || []}
                    onNext={(results) => {
                        onSuccess && onSuccess(results);
                    }}
                />
            )}
        </AssetConnectOptionContext.Provider>
    );
});
