import React, {memo, useState} from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {plainToInstance} from 'class-transformer';
import {toast} from 'react-hot-toast';
import {FaChevronLeft} from 'react-icons/fa6';
import {errorNotify} from '^utils/toast-notify';
import {orgIdParamState} from '^atoms/common';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';
import {CardAccountsStaticData, cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {UnSignedCreditCardFormData} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {FadeUp} from '../../../_common/FadeUp';
import {CardCompanyItem} from '../_common/CardCompanyItem';
import {InputCardFormDataStep} from './InputCardFormDataStep';
import {CardCreatingStep} from './CardCreatingStep';

interface CardManualCreateModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
}

// 카드사 연결이 없는 (직접)수동등록의 스텝
enum Step {
    companySelect,
    setInfo,
    creating,
    // success,
    // failure,
}

const CardCompanies = cardAccountsStaticData;

export const CardManualCreateModal = memo((props: CardManualCreateModalProps) => {
    const {isOpened, onClose, onCreate} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const [step, setStep] = useState(Step.companySelect);
    const [cardCompany, setCardCompany] = useState<CardAccountsStaticData>();
    const [createCreditCardDto, setFormData] = useRecoilState(createCreditCardDtoAtom);
    const resetFormData = useResetRecoilState(createCreditCardDtoAtom);

    const setCompany = (cardCompanyData?: CardAccountsStaticData) => {
        setCardCompany(cardCompanyData);
        setFormData((f) => ({
            ...f,
            issuerCompany: cardCompanyData?.displayName,
        }));
        setStep(cardCompanyData ? Step.setInfo : Step.companySelect);
    };

    const onSubmit = debounce(() => {
        if (!orgId) return;
        const formData = plainToInstance(UnSignedCreditCardFormData, createCreditCardDto);

        if (!formData.name) {
            toast.error('카드 별칭을 입력해주세요');
            return;
        }

        if (!formData.number1 || !formData.number2 || !formData.number3 || !formData.number4) {
            toast.error('카드 번호를 입력해주세요');
            return;
        }

        setStep(Step.creating);
        const req = creditCardApi.create(orgId, formData.toCreateDto());

        setTimeout(() => {
            req.then(() => {
                toast.success('새 카드를 추가했어요 :)');
                setStep(Step.companySelect);
                resetFormData();
                onCreate();
            }).catch((e) => {
                setStep(Step.setInfo);
                errorNotify(e);
            });
        }, 2000);
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
                            <p className="font-medium text-12 text-scordi">카드 직접 추가하기</p>
                            <h3 className="font-bold text-xl">어떤 카드를 추가할까요?</h3>
                        </div>

                        <div className="py-4 flex flex-col">
                            {CardCompanies.map((cardCompanyData, i) => {
                                return (
                                    <CardCompanyItem
                                        key={i}
                                        cardCompanyData={cardCompanyData}
                                        onClick={() => setCompany(cardCompanyData)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {step !== Step.creating && (
                    <FadeUp show={step === Step.setInfo} delay="delay-[50ms]">
                        {cardCompany && (
                            <InputCardFormDataStep
                                cardCompany={cardCompany}
                                setCompany={setCompany}
                                onSubmit={onSubmit}
                            />
                        )}
                    </FadeUp>
                )}

                <FadeUp show={step === Step.creating} delay="delay-[50ms]">
                    <CardCreatingStep />
                </FadeUp>
            </SlideUpModal>

            {/* 이탈방지 백드롭 */}
            <AnimatedModal
                open={isOpened && step === Step.creating}
                onClose={() => toast('지금은 뒤로 갈 수 없어요')}
                backdrop={{opacity: 0}}
            >
                <div></div>
            </AnimatedModal>
        </>
    );
});
CardManualCreateModal.displayName = 'CardManualCreateModal';
