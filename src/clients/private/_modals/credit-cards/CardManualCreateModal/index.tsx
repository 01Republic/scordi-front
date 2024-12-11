import React, {memo, useState} from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {plainToInstance} from 'class-transformer';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';
import {errorToast} from '^api/api';
import {FadeUp} from '^components/FadeUp';
import {delay} from '^components/util/delay';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefCustomerType} from '^models/CodefAccount/type/enums';
import {CreateCreditCardDto, UnSignedCreditCardFormData} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {createCreditCardDtoAtom} from '^v3/share/modals/NewCardModal/atom';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {CodefIsPersonalSelectStep} from '../CardAutoCreateModal/CodefIsPersonalSelectStep';
import {InputCardFormDataStep} from './InputCardFormDataStep';
import {CardCreatingStep} from './CardCreatingStep';
import {CardCompanySelectStep} from './CardCompanySelectStep';

interface CardManualCreateModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
}

// 카드사 연결이 없는 (직접)수동등록의 스텝
enum Step {
    isPersonalSelect,
    companySelect,
    setInfo,
    creating,
    // success,
    // failure,
}

export const CardManualCreateModal = memo((props: CardManualCreateModalProps) => {
    const {isOpened, onClose, onCreate} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const [step, setStep] = useState(Step.isPersonalSelect);
    const [codefClientType, setCodefClientType] = useState(CodefCustomerType.Personal);
    const [cardCompany, setCardCompany] = useState<CardAccountsStaticData>();
    const [createCreditCardDto, setCreateRequestFormData] = useRecoilState(createCreditCardDtoAtom);
    const resetFormData = useResetRecoilState(createCreditCardDtoAtom);

    const setFormData = (data: Partial<CreateCreditCardDto>) => {
        setCreateRequestFormData((f) => ({...f, ...data}));
    };

    const close = () => {
        setCodefClientType(CodefCustomerType.Personal);
        setCompany(undefined);
        resetFormData();
        onClose();
    };

    const setClientType = (codefClientType?: CodefCustomerType) => {
        const clientType = codefClientType || CodefCustomerType.Personal;
        setCodefClientType(clientType);
        setFormData({isPersonal: clientType === CodefCustomerType.Personal});
        setStep(codefClientType ? Step.companySelect : Step.isPersonalSelect);
    };

    const setCompany = (cardCompanyData?: CardAccountsStaticData) => {
        setCardCompany(cardCompanyData);
        setFormData({issuerCompany: cardCompanyData?.displayName});
        cardCompanyData ? setStep(Step.setInfo) : setClientType(undefined);
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
        creditCardApi
            .create(orgId, formData.toCreateDto())
            .then(() => delay(2000))
            .then(() => toast.success('카드를 추가했어요.'))
            .then(() => {
                setStep(Step.isPersonalSelect);
                resetFormData();
                onCreate();
            })
            .catch((e) => {
                setStep(Step.setInfo);
                errorToast(e);
            });
    }, 500);

    return (
        <>
            <SlideUpModal
                open={isOpened}
                onClose={close}
                size="md"
                minHeight="min-h-screen sm:min-h-[90%]"
                maxHeight="max-h-screen sm:max-h-[90%]"
                modalClassName="rounded-none sm:rounded-t-box"
            >
                <div className="absolute inset-0 p-6">
                    {/* 개인/법인 */}
                    {step === Step.isPersonalSelect && (
                        <CodefIsPersonalSelectStep
                            onBack={close}
                            defaultValue={codefClientType}
                            onChange={setClientType}
                        />
                    )}

                    {/* 카드사 선택 */}
                    <FadeUp
                        show={codefClientType && step === Step.companySelect}
                        delay="deloy-[50ms]"
                        className="h-full"
                    >
                        {codefClientType && (
                            <CardCompanySelectStep
                                codefClientType={codefClientType}
                                onBack={() => setCompany(undefined)}
                                setCompany={setCompany}
                            />
                        )}
                    </FadeUp>

                    {/* 폼 작성 */}
                    <FadeUp show={cardCompany && step === Step.setInfo} delay="delay-[50ms]">
                        {cardCompany && (
                            <InputCardFormDataStep
                                cardCompany={cardCompany}
                                onBack={() => {
                                    setCardCompany(undefined);
                                    setFormData({issuerCompany: undefined});
                                    setStep(Step.companySelect);
                                }}
                                onSubmit={onSubmit}
                            />
                        )}
                    </FadeUp>

                    {/* 저장중 */}
                    <FadeUp show={step === Step.creating} delay="delay-[50ms]">
                        <CardCreatingStep />
                    </FadeUp>
                </div>
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
