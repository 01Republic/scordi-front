import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {CreditCardDto} from '^models/CreditCard/type';
import {useCreditCards} from '^models/CreditCard/hook';
import {CreditCardProfileOption2} from '^models/CreditCard/components';
import {
    CardCreateMethod,
    CardCreateMethodModal,
    CardAutoCreateModal,
    CardManualCreateModal,
} from '^clients/private/_modals/credit-cards';
import {MonoSelectInput} from '^components/ui/inputs/MonoSelect/MonoSelectInput';
import {createSubscriptionFormData} from '../../atom';
import {InputSection} from '../InputSection';
import {PaymentMethodSelectModal} from './PaymentMethodSelectModal';

export const PaymentMethodSelectCreditCard = memo(function PaymentMethodSelectCreditCard() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const [isSelectModalOpened, setIsSelectModalOpened] = useState(false);
    const [isCardCreateMethodModalOpen, setIsCardCreateMethodModalOpen] = useState(false);
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);
    const [isCardManualCreateModalOpen, setIsCardManualCreateModalOpen] = useState(false);
    const {search, result, reload, isLoading} = useCreditCards();
    const selectedOption = result.items.find((o) => o.id === formData.creditCardId);

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = debounce((keyword?: string) => {
        return search({
            keyword,
            itemsPerPage: 0,
            order: {id: 'DESC'},
        });
    }, 500);

    const onChange = (creditCard?: CreditCardDto) => {
        setFormData((f) => ({
            ...f,
            creditCardId: creditCard?.id,
            bankAccountId: creditCard?.bankAccountId,
        }));
    };

    const selectModal = {
        show: () => {
            setIsSelectModalOpened(true);
            reload();
        },
        hide: () => {
            // if (isSelectModalOpened) return;
            setIsSelectModalOpened(false);
        },
    };

    return (
        <InputSection>
            <div className="form-control">
                <label className="label cursor-pointer p-0">
                    <MonoSelectInput
                        openModal={selectModal.show}
                        clearable
                        selectedOption={selectedOption}
                        getLabel={(card) => <CreditCardProfileOption2 item={card} />}
                        placeholder="카드 선택"
                        clearOption={() => onChange(undefined)}
                    />
                </label>
            </div>

            {/* 결제수단 선택 */}
            <PaymentMethodSelectModal
                isOpened={isSelectModalOpened}
                onClose={() => selectModal.hide()}
                isLoading={isLoading}
                reload={reload}
                entries={result.items}
                defaultValue={formData.creditCardId}
                onSelect={onChange}
                onCtaButtonClick={() => {
                    selectModal.hide();
                    setIsCardCreateMethodModalOpen(true);
                }}
            />

            {/* 결제수단 등록 > 등록 방법 선택 */}
            <CardCreateMethodModal
                isOpened={isCardCreateMethodModalOpen}
                onClose={() => setIsCardCreateMethodModalOpen(false)}
                onSelect={(createMethod) => {
                    switch (createMethod) {
                        case CardCreateMethod.Auto:
                            setIsCardManualCreateModalOpen(false);
                            return setIsCardAutoCreateModalOpen(true);
                        case CardCreateMethod.Manual:
                        default:
                            setIsCardAutoCreateModalOpen(false);
                            return setIsCardManualCreateModalOpen(true);
                    }
                }}
            />

            {/* 결제수단 등록 > 자동 등록 */}
            <CardAutoCreateModal
                isOpened={isCardAutoCreateModalOpen}
                onClose={() => {
                    setIsCardAutoCreateModalOpen(false);
                    selectModal.show();
                }}
                onCreate={() => {
                    setIsCardAutoCreateModalOpen(false);
                    selectModal.show();
                }}
            />

            {/* 결제수단 등록 > 수동 등록 */}
            <CardManualCreateModal
                isOpened={isCardManualCreateModalOpen}
                onClose={() => {
                    setIsCardManualCreateModalOpen(false);
                    selectModal.show();
                }}
                onCreate={() => {
                    setIsCardManualCreateModalOpen(false);
                    selectModal.show();
                }}
            />
        </InputSection>
    );
});
