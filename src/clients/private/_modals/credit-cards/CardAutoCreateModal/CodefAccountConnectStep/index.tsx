import {memo, useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import {useOrgIdParam} from '^atoms/common';
import {FadeUp} from '^components/FadeUp';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {useCreateCodefAccount} from '^models/CodefAccount/hooks/useCreateCodefAccount';
import {
    CodefAccountFetchCardsResult,
    useCodefAccountFetchCardsResult,
    useCodefAccountsAlreadyIs2,
} from '^models/CodefAccount/hook';
import {allFulfilled} from '^utils/array';
import {CardAccountCheckLoginStep} from './CardAccountCheckLoginStep';
import {InputCardAccountFormDataStep} from './InputCardAccountFormDataStep';

interface CodefAccountConnectStepProps {
    onBack: () => any;
    cardCompany: CardAccountsStaticData;
    setAccountFetchCardsResults: (codefAccountFetchCardsResults?: CodefAccountFetchCardsResult[]) => any;
}

enum AccountConnectStep {
    checkLogin,
    accountForm,
}

/**
 * 코드에프 / 카드사 로그인으로 카드 등록하기 > 카드사 로그인 단계
 * 코드에프를 통해 카드를 신규등록할때 사용합니다.
 */
export const CodefAccountConnectStep = memo((props: CodefAccountConnectStepProps) => {
    const {onBack, cardCompany, setAccountFetchCardsResults} = props;
    const orgId = useOrgIdParam();
    const {searchByCompany: checkExists} = useCodefAccountsAlreadyIs2(orgId);
    const {form, createAccount, isLoading, errorMessages} = useCreateCodefAccount(orgId);
    const [step, setStep] = useState(AccountConnectStep.checkLogin);
    const {fetch: fetchCardsQuery} = useCodefAccountFetchCardsResult();

    const loginIfAccountExist = async () => {
        try {
            // 계정이 존재하는지 확인하고,
            const result = await checkExists(cardCompany);

            // 조회된 계정이 없으면,
            if (result.pagination.totalItemCount === 0) {
                // 로그인 폼으로 이동.
                setStep(AccountConnectStep.accountForm);
                return;
            }

            // 조회된 계정이 있으면,
            // 정상적으로 이용가능한 상태인지 검증을 진행하고,
            const queries = result.items.map(fetchCardsQuery);
            const results = await allFulfilled(queries);
            setAccountFetchCardsResults(results);
        } catch {
            setStep(AccountConnectStep.accountForm);
        }
    };

    useEffect(() => {
        loginIfAccountExist();
    }, []);

    return (
        <>
            {step === AccountConnectStep.checkLogin && (
                <CardAccountCheckLoginStep cardCompany={cardCompany} onBack={onBack} />
            )}
            <FadeUp show={step === AccountConnectStep.accountForm} className="h-full">
                <InputCardAccountFormDataStep
                    cardCompany={cardCompany}
                    form={form}
                    onBack={onBack}
                    onSubmit={(dto) => {
                        createAccount(orgId, cardCompany, dto, async (createdAccount) => {
                            const result = await fetchCardsQuery(createdAccount);
                            toast.success(`${createdAccount.company}에 안전하게 로그인했어요.`);
                            setAccountFetchCardsResults([result]);
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
