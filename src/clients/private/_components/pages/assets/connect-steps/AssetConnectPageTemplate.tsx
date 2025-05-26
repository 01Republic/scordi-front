import React, {memo, createContext} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {AssetConnectMethodSelectStep} from './AssetConnectMethodSelectStep';
import {AssetConnectByCertificateStep} from './AssetConnectByCertificateStep';
import {AssetConnectByAccountStep} from './AssetConnectByAccountStep';
import {useCodefAccountsInConnectorV2} from '^models/CodefAccount/hook';
import {useOrgIdParam} from '^atoms/common';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

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

export const AssetConnectPageTemplate = memo((props: AssetConnectOption) => {
    const orgId = useOrgIdParam();
    const {codefAccounts, isFetchedAfterMount} = useCodefAccountsInConnectorV2(orgId);
    const hasCert = codefAccounts.some((account) => {
        return account.loginType === CodefLoginType.Certificate;
    });

    console.log({isFetchedAfterMount, hasCert});

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
            <FormProvider {...form}>
                <form>
                    {!loginType && <AssetConnectMethodSelectStep />}

                    {loginType === CodefLoginType.Certificate && <AssetConnectByCertificateStep />}

                    {loginType === CodefLoginType.IdAccount && <AssetConnectByAccountStep />}
                </form>
            </FormProvider>
        </AssetConnectOptionContext.Provider>
    );
});
