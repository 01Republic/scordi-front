import React, {memo, createContext, useState} from 'react';
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
import {AssetConnectByAccountStep} from './AssetConnectByAccountStep';
import {SelectAssetsStep} from './AssetConnectByCertificateFlow/steps/SelectAssetsStep';
import {ConnectAssetsStep} from './AssetConnectByCertificateFlow/steps/ConnectAssetsStep';
import {useRouter} from 'next/router';
import {OrgMainPageRoute} from '^pages/orgs/[id]';

export enum EntryPath {
    Asset = 'asset',
    Subscription = 'subscription',
}

interface AssetConnectOption {
    entryPath: EntryPath;
    ConnectMethodAltActionButton?: () => JSX.Element;
    onSuccessfullyCreateByCertificate?: (codefBanks?: CodefBankAccountDto[], codefCards?: CodefCardDto[]) => any;
    onSuccessfullyCreatedByAccount?: (codefCards?: CodefCardDto[]) => any;
}

export const AssetConnectOptionContext = createContext<AssetConnectOption>({
    entryPath: EntryPath.Subscription,
    onSuccessfullyCreateByCertificate: console.log,
    onSuccessfullyCreatedByAccount: console.log,
});

enum AssetConnectStep {
    AccountCreateStep,
    SelectAssetsStep,
    ConnectAssetsStep,
}

export const AssetConnectPageTemplate = memo((props: AssetConnectOption) => {
    const router = useRouter();
    const orgId = useOrgIdParam();
    useCodefAccountsInConnectorV2(orgId);
    const [step, setStep] = useState(AssetConnectStep.AccountCreateStep);
    const [ignorePreCheck, setIgnorePreCheck] = useState(false);
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

    const loginType = form.watch('loginType');

    return (
        <AssetConnectOptionContext.Provider value={props}>
            {step === AssetConnectStep.AccountCreateStep && (
                <FormProvider {...form}>
                    <form>
                        {!loginType && <AssetConnectMethodSelectStep />}

                        {loginType === CodefLoginType.Certificate && (
                            <AssetConnectByCertificateFlow
                                ignorePreCheck={ignorePreCheck}
                                onBack={() => {
                                    form.reset({loginType: undefined});
                                    setIgnorePreCheck(false);
                                    setIsAfterAccountCreated(false);
                                }}
                                onFinish={(codefAccounts, failedCompanies, afterAccountCreated) => {
                                    setCodefAccounts(codefAccounts);
                                    setFailedCompanies(failedCompanies);
                                    setIsAfterAccountCreated(afterAccountCreated);
                                    setStep(AssetConnectStep.SelectAssetsStep);
                                }}
                            />
                        )}

                        {loginType === CodefLoginType.IdAccount && <AssetConnectByAccountStep />}
                    </form>
                </FormProvider>
            )}

            {/* 자산 선택p : 자산 연동이 완료된 자산 목록을 보여주고 스코디 자산으로 연동할 자산을 선택 */}
            {step === AssetConnectStep.SelectAssetsStep && (
                <SelectAssetsStep
                    isAfterAccountCreated={isAfterAccountCreated}
                    codefAccounts={codefAccounts || []}
                    failedCompanies={failedCompanies}
                    onBack={() => {
                        if (isAfterAccountCreated) {
                            setIgnorePreCheck(true);
                        } else {
                            form.reset({loginType: undefined});
                            setIgnorePreCheck(false);
                        }
                        setIsAfterAccountCreated(false);
                        setStep(AssetConnectStep.AccountCreateStep);
                    }}
                    onMove={() => {
                        setIgnorePreCheck(true);
                        setStep(AssetConnectStep.AccountCreateStep);
                    }}
                    onNext={(codefBanks, codefCards, disabled) => {
                        if (disabled) return router.push(OrgMainPageRoute.path(orgId));

                        setSelectedCodefAssets([...codefBanks, ...codefCards]);
                        setStep(AssetConnectStep.ConnectAssetsStep);
                    }}
                    disabledCTAButtonText="홈으로"
                />
            )}

            {/* 자산 연동중p : 스코디 자산으로 선택한 목록들을 연동 및 sync 요청 후 성공 시 성공페이지로 넘김 */}
            {step === AssetConnectStep.ConnectAssetsStep && (
                <ConnectAssetsStep
                    codefAssets={selectedCodefAssets || []}
                    onNext={(results) => {
                        console.log('results', results);
                        alert(results.length + ' assets are connected');
                    }}
                />
            )}
        </AssetConnectOptionContext.Provider>
    );
});
