import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {toast} from 'react-hot-toast';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {useCreateCodefAccount} from '^models/CodefAccount/hooks/useCreateCodefAccount';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {InputCardAccountFormDataStep} from './CodefAccountConnectStep/InputCardAccountFormDataStep';
import {FadeUp} from '^components/FadeUp';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {codefCardApi} from '^models/CodefCard/api';
import {ConnectableCardListStep} from './ConnectableCardListStep';

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
    const {checkExists, form, createAccount, isLoading, errorMessages} = useCreateCodefAccount(orgId);

    const setAccount = (codefAccount?: CodefAccountDto) => {
        setCodefAccount(codefAccount);
        codefAccount && setCodefAccountId(codefAccount.id);
    };

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!router.isReady) return;
        checkExists(cardCompany.param, cardCompany.clientType, (existedAccount) => {
            setIsPreChecked(true);
            if (existedAccount) {
                toast.success(`${existedAccount.company}에 로그인했어요`);
            }
            setAccount(existedAccount);
        });
    }, [router.isReady, orgId]);

    const createCards = async (checkedCards: CodefCardDto[]) => {
        if (!orgId || isNaN(orgId)) return;
        if (!checkedCards.length) return;

        await Promise.allSettled(checkedCards.map((codefCard) => codefCardApi.createCreditCard(orgId, codefCard.id)));
        toast.success('새 카드를 추가했어요 :)');
        onSubmit();
    };

    // if (!isPreChecked) return <></>;

    return (
        <>
            {!codefAccount && (
                <InputCardAccountFormDataStep
                    cardCompany={cardCompany}
                    form={form}
                    onBack={() => setCompany(undefined)}
                    onSubmit={(dto) => {
                        createAccount(orgId, cardCompany, dto, (createdAccount) => {
                            toast.success(`${createdAccount.company}에 안전하게 연결되었어요 :)`);
                            setAccount(createdAccount);
                        });
                    }}
                    isLoading={!isPreChecked || isLoading}
                    errorMessages={errorMessages}
                />
            )}

            <FadeUp show={!!codefAccount} delay="delay-[50ms]">
                {codefAccount && (
                    <ConnectableCardListStep
                        cardCompany={cardCompany}
                        codefAccount={codefAccount}
                        onBack={() => setCompany(undefined)}
                        onSubmit={createCards}
                    />
                )}
            </FadeUp>
        </>
    );
});
