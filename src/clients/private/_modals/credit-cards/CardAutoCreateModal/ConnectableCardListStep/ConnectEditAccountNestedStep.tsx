import React, {Dispatch, memo, SetStateAction} from 'react';
import {toast} from 'react-hot-toast';
import {useOrgIdParam} from '^atoms/common';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {
    CodefAccountFetchCardsResult,
    useCodefAccountFetchCardsResult,
    useCreateCodefAccount,
} from '^models/CodefAccount/hook';
import {InputCardAccountFormDataStep} from '../CodefAccountConnectStep/InputCardAccountFormDataStep';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {errorToast} from '^api/api';

interface ConnectEditAccountNestedStepProps {
    cardCompany: CardAccountsStaticData;
    codefAccount: CodefAccountDto;
    setCodefAccountFetchCardsResults: Dispatch<SetStateAction<CodefAccountFetchCardsResult[] | undefined>>;
    onBack: () => any;
    onNext?: () => any;
}

export const ConnectEditAccountNestedStep = memo((props: ConnectEditAccountNestedStepProps) => {
    const {cardCompany, codefAccount, setCodefAccountFetchCardsResults, onBack, onNext} = props;
    const orgId = useOrgIdParam();
    const {form, updateAccount, isLoading, errorMessages} = useCreateCodefAccount(orgId);
    const {fetch: fetchCardsQuery} = useCodefAccountFetchCardsResult();

    return (
        <InputCardAccountFormDataStep
            cardCompany={cardCompany}
            form={form}
            onBack={onBack}
            onSubmit={(dto) => {
                updateAccount(orgId, codefAccount.id, dto)
                    .then(async (res) => {
                        if (res.errorList.length) {
                            console.error('updateAccount', 'res.errorList', res.errorList);
                            return;
                        }

                        const result = await fetchCardsQuery(codefAccount);
                        toast.success(`${codefAccount.company}에 안전하게 로그인했어요.`);
                        setCodefAccountFetchCardsResults((results = []) => {
                            return results.map((r) => (r.codefAccount.id === codefAccount.id ? result : r));
                        });
                        onNext ? onNext() : onBack();
                    })
                    .catch(errorToast);
            }}
            isLoading={isLoading}
            errorMessages={errorMessages}
            caption={`${cardCompany.displayName} 계정 갱신하기`}
            ctaText="확인"
        />
    );
});
ConnectEditAccountNestedStep.displayName = 'ConnectEditAccountNestedStep';
