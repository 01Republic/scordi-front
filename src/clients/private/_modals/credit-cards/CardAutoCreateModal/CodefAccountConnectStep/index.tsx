import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {toast} from 'react-hot-toast';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useCreateCodefAccount} from '^models/CodefAccount/hooks/useCreateCodefAccount';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {FadeUp} from '^components/FadeUp';
import {CardAccountCheckLoginStep} from './CardAccountCheckLoginStep';
import {InputCardAccountFormDataStep} from './InputCardAccountFormDataStep';

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
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const setCodefAccountId = useSetRecoilState(codefAccountIdParamState);
    const {checkExists, form, createAccount, isLoading, errorMessages} = useCreateCodefAccount();
    const [step, setStep] = useState(AccountConnectStep.checkLogin);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!router.isReady) return;
        checkExists(cardCompany.param, (existedAccount) => {
            if (existedAccount) {
                toast.success(`${existedAccount.company}에 로그인했어요`);
                setCodefAccountId(existedAccount.id);
                setAccount(existedAccount);
            } else {
                setStep(AccountConnectStep.accountForm);
            }
        });
    }, [router.isReady, orgId]);

    return (
        <>
            {step === AccountConnectStep.checkLogin && (
                <CardAccountCheckLoginStep cardCompany={cardCompany} onBack={onBack} />
            )}
            {step === AccountConnectStep.accountForm && (
                <FadeUp show delay="deloy-[50ms]" className="h-full">
                    <InputCardAccountFormDataStep
                        cardCompany={cardCompany}
                        form={form}
                        onBack={onBack}
                        onSubmit={(dto) => {
                            createAccount(orgId, cardCompany, dto, (createdAccount) => {
                                toast.success(`${createdAccount.company}에 안전하게 연결되었어요 :)`);
                                setAccount(createdAccount);
                            });
                        }}
                        isLoading={isLoading}
                        errorMessages={errorMessages}
                    />
                </FadeUp>
            )}
        </>
    );
});
CodefAccountConnectStep.displayName = 'CodefAccountConnectStep';
