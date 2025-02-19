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
    // 함수가 주어지면, 병합 가능한 모드로 연결 모달을 실행합니다.
    onMergeSubmit?: (codefCard: CodefCardDto) => any;
}

export const ConnectCodefModal = memo((props: ConnectCodefModalProps) => {
    const {isOpened, onClose, creditCard, onSubmit, onMergeSubmit} = props;
    const [step, setStep] = useState(Step.companySelect);
    const [cardCompany, setCardCompany] = useState(creditCard.company);
    const [isSelectCompanyModalOpened, setIsSelectCompanyModalOpened] = useState(false);
    const [isSelectCardModalOpened, setIsSelectCardModalOpened] = useState(false);

    const close = () => {
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
                onClose={close}
                title={<>카드사를 선택해주세요.</>}
                desc=""
                isPersonal={creditCard.isPersonal}
                onSelect={(company) => {
                    setCardCompany(company);
                    setIsSelectCompanyModalOpened(false);
                    setIsSelectCardModalOpened(true);
                }}
            />

            {cardCompany && (
                <ConnectCodefAccountModal
                    isOpened={isSelectCardModalOpened}
                    onClose={close}
                    cardCompany={cardCompany}
                    onSubmit={onSubmit}
                    onMergeSubmit={onMergeSubmit}
                />
            )}
        </>
    );
});
ConnectCodefModal.displayName = 'ConnectCodefModal';
