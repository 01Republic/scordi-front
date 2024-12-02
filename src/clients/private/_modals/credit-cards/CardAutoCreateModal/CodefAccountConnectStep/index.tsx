import {memo, useEffect, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {toast} from 'react-hot-toast';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useCreateCodefAccount} from '^models/CodefAccount/hooks/useCreateCodefAccount';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {FadeUp} from '^components/FadeUp';
import {CardAccountCheckLoginStep} from './CardAccountCheckLoginStep';
import {InputCardAccountFormDataStep} from './InputCardAccountFormDataStep';
import {debounce} from 'lodash';

interface CodefAccountConnectStepProps {
    onBack: () => any;
    cardCompany: CardAccountsStaticData;
    setAccount: (codefAccount: CodefAccountDto) => any;
}

enum AccountConnectStep {
    checkLogin,
    accountForm,
}

export const CodefAccountConnectStep = memo((props: CodefAccountConnectStepProps) => {
    const {onBack, cardCompany, setAccount} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const setCodefAccountId = useSetRecoilState(codefAccountIdParamState);
    const {checkExists, form, createAccount, isLoading, errorMessages} = useCreateCodefAccount();
    const [step, setStep] = useState(AccountConnectStep.checkLogin);

    const loginIfAccountExist = debounce(() => {
        checkExists(cardCompany.param, cardCompany.clientType, (existedAccount) => {
            if (existedAccount) {
                toast.success(`${existedAccount.company}에 로그인했어요`);
                setCodefAccountId(existedAccount.id);
                setAccount(existedAccount);
            } else {
                setCodefAccountId(NaN);
                setStep(AccountConnectStep.accountForm);
            }
        });
    }, 500);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        loginIfAccountExist();
    }, [orgId]);

    return (
        <>
            {step === AccountConnectStep.checkLogin && (
                <CardAccountCheckLoginStep cardCompany={cardCompany} onBack={onBack} />
            )}
            <FadeUp show={step === AccountConnectStep.accountForm} delay="deloy-[50ms]" className="h-full">
                <InputCardAccountFormDataStep
                    cardCompany={cardCompany}
                    form={form}
                    onBack={onBack}
                    onSubmit={(dto) => {
                        createAccount(orgId, cardCompany, dto, (createdAccount) => {
                            toast.success(`${createdAccount.company}에 안전하게 연결되었어요 :)`);
                            setCodefAccountId(createdAccount.id);
                            setAccount(createdAccount);
                        });
                    }}
                    isLoading={isLoading}
                    errorMessages={errorMessages}
                />
            </FadeUp>
        </>
    );
});
CodefAccountConnectStep.displayName = 'CodefAccountConnectStep';
