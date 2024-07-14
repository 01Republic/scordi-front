import React, {memo, useState} from 'react';
import {debounce} from 'lodash';
import {FaChevronLeft} from 'react-icons/fa6';
import {CardAccountsStaticData, cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {FadeUp} from '../../../_common/FadeUp';
import {CardCompanyItem} from '../_common/CardCompanyItem';
import {ConnectCodefSteps} from './ConnectCodefSteps';

interface CardAutoCreateModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
}

// 카드사 연결을 통한 자동등록의 스텝
enum Step {
    companySelect,
    setAccountForm,
    creating,
    success,
    failure,
}

const CardCompanies = cardAccountsStaticData;

export const CardAutoCreateModal = memo((props: CardAutoCreateModalProps) => {
    const {isOpened, onClose, onCreate} = props;
    const [step, setStep] = useState(Step.companySelect);
    const [cardCompany, setCardCompany] = useState<CardAccountsStaticData>();

    const setCompany = (cardCompanyData?: CardAccountsStaticData) => {
        setCardCompany(cardCompanyData);
        setStep(cardCompanyData ? Step.setAccountForm : Step.companySelect);
    };

    const onSubmit = debounce(() => {
        setCompany(undefined);
        onCreate();
    }, 500);

    return (
        <>
            <SlideUpModal
                open={isOpened}
                onClose={onClose}
                size="md"
                minHeight="min-h-screen sm:min-h-[90%]"
                maxHeight="max-h-screen sm:max-h-[90%]"
                modalClassName="rounded-none sm:rounded-t-box"
            >
                {step === Step.companySelect && (
                    <div>
                        <div>
                            <div className="mb-4">
                                <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={onClose} />
                            </div>
                            <p className="font-medium text-12 text-scordi mb-1">새로운 카드 등록하기</p>
                            <h3 className="font-bold text-xl leading-tight">
                                어느 카드사의 <br /> 카드를 등록할까요?
                            </h3>
                        </div>

                        <div className="py-4 flex flex-col">
                            {CardCompanies.map((cardCompanyData, i) => (
                                <CardCompanyItem
                                    key={i}
                                    cardCompanyData={cardCompanyData}
                                    onClick={() => setCompany(cardCompanyData)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {step !== Step.creating && (
                    <FadeUp show={step === Step.setAccountForm} delay="delay-[50ms]">
                        {cardCompany && (
                            <ConnectCodefSteps cardCompany={cardCompany} setCompany={setCompany} onSubmit={onSubmit} />
                        )}
                    </FadeUp>
                )}
            </SlideUpModal>
        </>
    );
});
CardAutoCreateModal.displayName = 'CardAutoCreateModal';
