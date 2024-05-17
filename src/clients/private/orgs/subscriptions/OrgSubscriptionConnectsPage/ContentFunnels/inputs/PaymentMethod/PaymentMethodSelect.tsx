import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {useCreditCards} from '^models/CreditCard/hook';
import {CreditCardProfileOption2} from '^models/CreditCard/hook/components/CreditCardProfile';
import {MonoSelect} from '^components/ui/inputs/MonoSelect';
import {createSubscriptionFormData} from '../../atom';
import {InputSection} from '../InputSection';
import {CardCreateMethod, CardCreateMethodModal} from './CardCreateMethodModal';
import {CardAutoCreateModal} from './CardAutoCreateModal';
import {CardManualCreateModal} from './CardManualCreateModal';

export const PaymentMethodSelect = memo(function PaymentMethodSelect() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const [isCardCreateMethodModalOpen, setIsCardCreateMethodModalOpen] = useState(false);
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);
    const [isCardManualCreateModalOpen, setIsCardManualCreateModalOpen] = useState(false);
    const {search, result, reload, isLoading} = useCreditCards();

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

    return (
        <InputSection>
            <div className="form-control">
                <label className="label cursor-pointer p-0">
                    <MonoSelect
                        placeholder="카드 또는 출금계좌"
                        modalTitle="결제 수단 설정"
                        options={result.items}
                        isLoading={isLoading}
                        clearable
                        getLabel={(card) => <CreditCardProfileOption2 item={card} />}
                        getValue={(card) => card.id}
                        size="md"
                        // minHeight="min-h-[552px]"
                        // maxHeight="max-h-[552px]"
                        minHeight="min-h-[var(--modal-height)]"
                        maxHeight="max-h-[var(--modal-height)]"
                        modalClassName="rounded-none sm:rounded-t-box [--modal-height:100vh] sm:[--modal-height:90vh]"
                        scrollBoxHeight="calc(var(--modal-height) - 1.5rem - 28px - 1rem - 80px + 1rem)"
                        OptionComponent={({option}) => <CreditCardProfileOption2 item={option} />}
                        defaultValue={formData.creditCardId}
                        onChange={(creditCard) => {
                            setFormData((f) => ({
                                ...f,
                                creditCardId: creditCard?.id,
                            }));
                        }}
                    >
                        <div
                            className="p-4 w-full fixed left-0 right-0 bottom-0"
                            style={{
                                background: 'linear-gradient(0, white 0, white 80%, transparent)',
                            }}
                        >
                            <button
                                className="btn btn-block btn-scordi"
                                onClick={() => setIsCardCreateMethodModalOpen(true)}
                            >
                                새로운 카드 추가하기
                            </button>
                        </div>
                    </MonoSelect>
                </label>
            </div>

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
