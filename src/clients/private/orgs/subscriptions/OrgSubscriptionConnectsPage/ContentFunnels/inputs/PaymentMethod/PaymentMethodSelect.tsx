import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {useCreditCards} from '^models/CreditCard/hook';
import {CreditCardProfileOption2} from '^models/CreditCard/hook/components/CreditCardProfile';
import {createSubscriptionFormData} from '../../atom';
import {InputSection} from '../InputSection';
import {CardCreateMethod, CardCreateMethodModal} from './CardCreateMethodModal';
import {CardAutoCreateModal} from './CardAutoCreateModal';
import {CardManualCreateModal} from './CardManualCreateModal';
import {CreditCardDto} from '^models/CreditCard/type';
import {MonoSelectInput} from '^components/ui/inputs/MonoSelect/MonoSelectInput';
import {PaymentMethodSelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/PaymentMethodSelectModal';

export const PaymentMethodSelect = memo(function PaymentMethodSelect() {
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
        }));
    };

    const selectModal = {
        show: () => {
            setIsSelectModalOpened(true);
            reload();
        },
        hide: () => setIsSelectModalOpened(false),
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
                        placeholder="카드 또는 출금계좌"
                        clearOption={() => onChange(undefined)}
                    />
                </label>
            </div>

            <PaymentMethodSelectModal
                isOpened={isSelectModalOpened}
                onClose={() => selectModal.hide()}
                isLoading={isLoading}
                reload={reload}
                entries={result.items}
                defaultValue={formData.creditCardId}
                onSelect={onChange}
                onCtaButtonClick={() => setIsCardCreateMethodModalOpen(true)}
            />

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

            <CardAutoCreateModal
                isOpened={isCardAutoCreateModalOpen}
                onClose={() => setIsCardAutoCreateModalOpen(false)}
                onCreate={() => {
                    setIsCardAutoCreateModalOpen(false);
                    reload();
                }}
            />
            <CardManualCreateModal
                isOpened={isCardManualCreateModalOpen}
                onClose={() => setIsCardManualCreateModalOpen(false)}
                onCreate={() => {
                    setIsCardManualCreateModalOpen(false);
                    reload();
                }}
            />
        </InputSection>
    );
});
