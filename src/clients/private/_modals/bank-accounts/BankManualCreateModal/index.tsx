import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {FadeUp} from '^components/FadeUp';
import {delay} from '^components/util/delay';
import {orgIdParamState} from '^atoms/common';
import {CodefCustomerType} from '^models/CodefAccount/type/enums';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {InputBankFormDataStep} from './InputBankFormDataStep';
import {BankCreatingStep} from './BankCreatingStep';
import {BankCompanySelectStep} from './BankCompanySelectStep';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {bankAccountApi} from '^models/BankAccount/api';
import {createBankAccountDtoAtom} from '^v3/share/modals/NewBankAccountModal/atom';
import {BankAccountKind, CreateBankAccountRequestDto} from '^models/BankAccount/type';
import {CodefBankIsPersonalSelectStep} from '^clients/private/_modals/bank-accounts/BankManualCreateModal/CodefBankIsPersonalSelectStep';

interface BankManualCreateModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
}

// (직접)수동등록의 스텝
enum Step {
    isPersonalSelect,
    companySelect,
    setInfo,
    creating,
}

export const BankManualCreateModal = memo((props: BankManualCreateModalProps) => {
    const {isOpened, onClose, onCreate} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const [step, setStep] = useState(Step.isPersonalSelect);
    const [codefClientType, setCodefClientType] = useState(CodefCustomerType.Personal);
    const [bankCompany, setBankCompany] = useState<BankAccountsStaticData>();
    const [createBankAccountFormData, setCreateRequestFormData] = useRecoilState(createBankAccountDtoAtom);
    const resetFormData = useResetRecoilState(createBankAccountDtoAtom);

    const setFormData = (data: Partial<CreateBankAccountRequestDto>) => {
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

    const setCompany = (bankCompanyData?: BankAccountsStaticData) => {
        setBankCompany(bankCompanyData);
        setFormData({bank: bankCompanyData?.param});
        bankCompanyData ? setStep(Step.setInfo) : setClientType(undefined);
    };

    const onSubmit = debounce(() => {
        if (!orgId) return;

        if (!createBankAccountFormData.name) {
            toast.error('계좌 별칭을 입력해주세요');
            return;
        }

        if (!createBankAccountFormData.number) {
            setFormData({number: ''});
        }

        setStep(Step.creating);
        bankAccountApi
            .create(orgId, createBankAccountFormData)
            .then(() => delay(2000))
            .then(() => toast.success('계좌를 추가했어요.'))
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

    useEffect(() => {
        setFormData({kind: BankAccountKind.DEPOSIT_TRUST});
        setFormData({number: ''});
    }, []);

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
                        <CodefBankIsPersonalSelectStep
                            onBack={close}
                            defaultValue={codefClientType}
                            onChange={setClientType}
                        />
                    )}

                    {/* 은행사 선택 */}
                    <FadeUp
                        show={codefClientType && step === Step.companySelect}
                        delay="deloy-[50ms]"
                        className="h-full"
                    >
                        {codefClientType && (
                            <BankCompanySelectStep
                                codefClientType={codefClientType}
                                onBack={() => setCompany(undefined)}
                                setCompany={setCompany}
                            />
                        )}
                    </FadeUp>

                    {/* 폼 작성 */}
                    <FadeUp show={bankCompany && step === Step.setInfo} delay="delay-[50ms]">
                        {bankCompany && (
                            <InputBankFormDataStep
                                bankCompany={bankCompany}
                                onBack={() => {
                                    setBankCompany(undefined);
                                    setFormData({bank: undefined});
                                    setStep(Step.companySelect);
                                }}
                                onSubmit={onSubmit}
                            />
                        )}
                    </FadeUp>

                    {/* 저장중 */}
                    <FadeUp show={step === Step.creating} delay="delay-[50ms]">
                        <BankCreatingStep />
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
BankManualCreateModal.displayName = 'BankManualCreateModal';
