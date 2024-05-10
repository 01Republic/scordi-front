import React, {memo, useEffect, useState} from 'react';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {CardAccountsStaticData, cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa6';
import {FadeUp} from '../../../_common/FadeUp';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';
import {inputTextToCardNumberFormat} from '^utils/input-helper';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {plainToInstance} from 'class-transformer';
import {UnSignedCreditCardFormData} from '^models/CreditCard/type';
import {toast} from 'react-hot-toast';
import {creditCardApi} from '^models/CreditCard/api';
import {errorNotify} from '^utils/toast-notify';
import {InputCardFormDataStep} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/CardManualCreateModal/InputCardFormDataStep';
import {CardCreatingStep} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/CardManualCreateModal/CardCreatingStep';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {useAlert} from '^hooks/useAlert';

interface CardManualCreateModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
}

enum Step {
    companySelect,
    setInfo,
    creating,
    success,
    failure,
}

const CardCompanies = cardAccountsStaticData;

export const CardManualCreateModal = memo((props: CardManualCreateModalProps) => {
    const {isOpened, onClose, onCreate} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const [step, setStep] = useState(Step.companySelect);
    const [cardCompany, setCardCompany] = useState<CardAccountsStaticData>();
    const [createCreditCardDto, setFormData] = useRecoilState(createCreditCardDtoAtom);

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
                setStep(Step.companySelect);
                toast.success('새 카드를 추가했어요 :)');
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
                minHeight="min-h-full"
                modalClassName="rounded-none"
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
                onClose={() => toast('실행 도중에 중단 할 수 없어요')}
                backdrop={{opacity: 0}}
            >
                <div></div>
            </AnimatedModal>
        </>
    );
});
CardManualCreateModal.displayName = 'CardManualCreateModal';

interface CardCompanyItemProps {
    cardCompanyData: CardAccountsStaticData;
    onClick: () => any;
}

export const CardCompanyItem = memo((props: CardCompanyItemProps) => {
    const {cardCompanyData, onClick} = props;
    const {logo, displayName} = cardCompanyData;

    return (
        <div
            className="flex items-center -mx-3 px-3 py-2 rounded-btn cursor-pointer group hover:bg-scordi-50 transition-all"
            onClick={onClick}
        >
            <div>
                <img src={logo} alt="" className="avatar w-[28px] h-[28px]" />
            </div>
            <div className="flex-auto px-3">
                <p className="text-14">{displayName}</p>
            </div>
            <div>
                <FaChevronRight className="text-gray-400 group-hover:text-black transition-all" />
            </div>
        </div>
    );
});
CardCompanyItem.displayName = 'CardCompanyItem';
