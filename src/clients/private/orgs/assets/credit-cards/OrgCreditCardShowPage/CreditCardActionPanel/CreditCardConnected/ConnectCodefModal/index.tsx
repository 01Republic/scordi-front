import React, {memo, useEffect, useState} from 'react';
import {CreditCardDto} from '^models/CreditCard/type';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {CardCompanySelectModal} from '../../../CardCompanySelectModal';
import {ConnectCodefAccountModal} from './ConnectCodefAccountModal';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

// 카드사 연결을 통한 자동등록의 스텝
enum Step {
    companySelect,
    setAccountForm,
    creating,
    success,
    failure,
}

interface ConnectCodefModalProps extends ModalProps {
    creditCard: CreditCardDto;
    onSubmit: (codefCard: CodefCardDto) => any;
}

export const ConnectCodefModal = memo((props: ConnectCodefModalProps) => {
    const {isOpened, onClose, creditCard, onSubmit} = props;
    const [step, setStep] = useState(Step.companySelect);
    const [cardCompany, setCardCompany] = useState(creditCard.company);
    const [isSelectCompanyModalOpened, setIsSelectCompanyModalOpened] = useState(false);
    const [isSelectCardModalOpened, setIsSelectCardModalOpened] = useState(false);

    const closeModals = () => {
        onClose();
    };

    useEffect(() => {
        if (isOpened) {
            if (!creditCard.company) {
                setCardCompany(undefined);
                setIsSelectCompanyModalOpened(true);
            } else {
                setCardCompany(creditCard.company);
                setIsSelectCardModalOpened(true);
            }
        } else {
            setIsSelectCardModalOpened(false);
            setIsSelectCompanyModalOpened(false);
        }
    }, [isOpened, creditCard]);

    return (
        <>
            <CardCompanySelectModal
                isOpened={isSelectCompanyModalOpened}
                onClose={closeModals}
                title={
                    <>
                        어느 카드사의 <br /> 카드로 설정할까요?
                    </>
                }
                desc="혹시 지금 설정하기 어렵다면 다음에 해도 괜찮아요"
                onSelect={(company) => {
                    setCardCompany(company);
                    setIsSelectCompanyModalOpened(false);
                    setIsSelectCardModalOpened(true);
                }}
            />

            {cardCompany && (
                <ConnectCodefAccountModal
                    isOpened={isSelectCardModalOpened}
                    onClose={closeModals}
                    cardCompany={cardCompany}
                    onSubmit={onSubmit}
                />
            )}
        </>
    );
});
ConnectCodefModal.displayName = 'ConnectCodefModal';
