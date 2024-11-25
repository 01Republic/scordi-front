import React, {memo, useState} from 'react';
import {debounce} from 'lodash';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {codefCardApi} from '^models/CodefCard/api';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {CodefCardCompanySelectStep} from './CodefCardCompanySelectStep';
import {CodefAccountConnectStep} from './CodefAccountConnectStep';
import {ConnectableCardListStep} from './ConnectableCardListStep';
import {FadeUp} from '^components/FadeUp';

interface CardAutoCreateModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
}

// 카드사 연결을 통한 자동등록의 스텝
enum Step {
    companySelect,
    accountConnect,
    cardSelect,
}

export const CardAutoCreateModal = memo((props: CardAutoCreateModalProps) => {
    const {isOpened, onClose, onCreate} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const [step, setStep] = useState(Step.companySelect);
    const [cardCompany, setCardCompany] = useState<CardAccountsStaticData>();
    const [codefAccount, setCodefAccount] = useState<CodefAccountDto>();

    const close = () => {
        setCompany(undefined);
        setCodefAccount(undefined);
        onClose();
    };

    const setCompany = (cardCompanyData?: CardAccountsStaticData) => {
        setCardCompany(cardCompanyData);
        // setStep(cardCompanyData ? Step.setAccountForm : Step.companySelect);
        setStep(cardCompanyData ? Step.accountConnect : Step.companySelect);
    };

    const setAccount = (codefAccount?: CodefAccountDto) => {
        setCodefAccount(codefAccount);
        codefAccount ? setStep(Step.cardSelect) : setCompany(undefined);
    };

    const onSubmit = debounce(async (checkedCards: CodefCardDto[]) => {
        if (!orgId || isNaN(orgId)) return;
        if (!checkedCards.length) return;

        await Promise.allSettled(checkedCards.map((codefCard) => codefCardApi.createCreditCard(orgId, codefCard.id)));
        toast.success('새 카드를 추가했어요 :)');

        setCompany(undefined);
        onCreate();
    }, 500);

    return (
        <SlideUpModal
            open={isOpened}
            onClose={close}
            size="md"
            minHeight="min-h-screen sm:min-h-[90%]"
            maxHeight="max-h-screen sm:max-h-[90%]"
            modalClassName="rounded-none sm:rounded-t-box"
        >
            <div className="absolute inset-0 p-6">
                {step === Step.companySelect && <CodefCardCompanySelectStep onBack={onClose} setCompany={setCompany} />}

                <FadeUp show={cardCompany && step === Step.accountConnect} delay="deloy-[50ms]" className="h-full">
                    {cardCompany && (
                        <CodefAccountConnectStep
                            onBack={() => setCompany(undefined)}
                            cardCompany={cardCompany}
                            setAccount={setAccount}
                        />
                    )}
                </FadeUp>

                <FadeUp
                    show={cardCompany && codefAccount && step === Step.cardSelect}
                    delay="deloy-[50ms]"
                    className="h-full"
                >
                    {cardCompany && codefAccount && (
                        <ConnectableCardListStep
                            onBack={() => setCompany(undefined)}
                            cardCompany={cardCompany}
                            codefAccount={codefAccount}
                            onSubmit={onSubmit}
                        />
                    )}
                </FadeUp>
            </div>
        </SlideUpModal>
    );
});
CardAutoCreateModal.displayName = 'CardAutoCreateModal';
