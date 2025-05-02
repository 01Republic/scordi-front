import React, {Dispatch, memo, SetStateAction} from 'react';
import {toast} from 'react-hot-toast';
import {useOrgIdParam} from '^atoms/common';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {
    useCreateCodefAccount,
    useCodefAccountFetchCardsResult,
    CodefAccountFetchCardsResult,
} from '^models/CodefAccount/hook';
import {InputCardAccountFormDataStep} from '../CodefAccountConnectStep/InputCardAccountFormDataStep';

interface ConnectNewAccountNestedStepProps {
    cardCompany: CardAccountsStaticData;
    setCodefAccountFetchCardsResults: Dispatch<SetStateAction<CodefAccountFetchCardsResult[] | undefined>>;
    onBack: () => any;
}

export const ConnectNewAccountNestedStep = memo((props: ConnectNewAccountNestedStepProps) => {
    const {cardCompany, setCodefAccountFetchCardsResults, onBack} = props;
    const orgId = useOrgIdParam();
    const {form, createAccount, isLoading, errorMessages} = useCreateCodefAccount(orgId);
    const {fetch: fetchCardsQuery} = useCodefAccountFetchCardsResult();

    return (
        <InputCardAccountFormDataStep
            cardCompany={cardCompany}
            form={form}
            onBack={onBack}
            onSubmit={(dto) => {
                createAccount(orgId, cardCompany, dto, async (createdAccount) => {
                    const result = await fetchCardsQuery(createdAccount);
                    toast.success(`${createdAccount.company}에 안전하게 로그인했어요.`);
                    setCodefAccountFetchCardsResults((results = []) => [result, ...results]);
                    onBack();
                });
            }}
            isLoading={isLoading}
            errorMessages={errorMessages}
        />
    );
});
ConnectNewAccountNestedStep.displayName = 'ConnectNewAccountNestedStep';
