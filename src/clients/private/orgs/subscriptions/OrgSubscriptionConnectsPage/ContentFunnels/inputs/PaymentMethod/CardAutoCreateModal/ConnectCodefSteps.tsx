import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {toast} from 'react-hot-toast';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {useCreateCodefAccount} from '^models/CodefAccount/hooks/useCreateCodefAccount';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {InputCardAccountFormDataStep} from './InputCardAccountFormDataStep';
import {FadeUp} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/_common/FadeUp';
import {ConnectableCardListStep} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/CardAutoCreateModal/ConnectableCardListStep';

interface ConnectCodefStepsProps {
    cardCompany: CardAccountsStaticData;
    setCompany: (cardCompanyData?: CardAccountsStaticData) => any;
    onSubmit: () => any;
}

export const ConnectCodefSteps = memo((props: ConnectCodefStepsProps) => {
    const {cardCompany, setCompany, onSubmit} = props;
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [isPreChecked, setIsPreChecked] = useState(false);
    const [codefAccount, setCodefAccount] = useState<CodefAccountDto>();
    const setCodefAccountId = useSetRecoilState(codefAccountIdParamState);
    const {checkExists, form, createAccount, isLoading, errorMessages} = useCreateCodefAccount();

    const setAccount = (codefAccount?: CodefAccountDto) => {
        setCodefAccount(codefAccount);
        codefAccount && setCodefAccountId(codefAccount.id);
    };

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!router.isReady) return;
        checkExists(cardCompany.param, (existedAccount) => {
            setIsPreChecked(true);
            if (existedAccount) {
                toast.success(`${existedAccount.company}에 로그인했어요`);
            }
            setAccount(existedAccount);
        });
    }, [router.isReady, orgId]);

    if (!isPreChecked) return <></>;

    return (
        <>
            {!codefAccount && (
                <InputCardAccountFormDataStep
                    cardCompany={cardCompany}
                    setCompany={setCompany}
                    form={form}
                    onSubmit={(dto) => {
                        createAccount(orgId, cardCompany, dto, (createdAccount) => {
                            toast.success(`${createdAccount.company}에 안전하게 연결되었어요 :)`);
                            setAccount(createdAccount);
                        });
                    }}
                    isLoading={isLoading}
                    errorMessages={errorMessages}
                />
            )}

            <FadeUp show={!!codefAccount} delay="delay-[50ms]">
                {codefAccount && (
                    <ConnectableCardListStep
                        cardCompany={cardCompany}
                        setCompany={setCompany}
                        codefAccount={codefAccount}
                        onSubmit={onSubmit}
                    />
                )}
            </FadeUp>
        </>
    );
});
ConnectCodefSteps.displayName = 'ConnectCodefSteps';
