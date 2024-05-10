import React, {memo, useEffect, useState} from 'react';
import {InputSection} from '../InputSection';
import {MonoSelect} from '^components/ui/inputs/MonoSelect';
import {CardCreateMethod, CardCreateMethodModal} from './CardCreateMethodModal';
import {CardAutoCreateModal} from './CardAutoCreateModal';
import {CardManualCreateModal} from './CardManualCreateModal';
import {useCreditCards} from '^models/CreditCard/hook';
import {debounce} from 'lodash';
import {CreditCardProfileOption2} from '^models/CreditCard/hook/components/CreditCardProfile';
import {useRecoilState} from 'recoil';
import {createSubscriptionFormData} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/atom';

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
                        minHeight="min-h-[90%]"
                        maxHeight="max-h-[90%]"
                        size="md"
                        OptionComponent={({option}) => {
                            return <CreditCardProfileOption2 item={option} />;
                        }}
                        defaultValue={formData.creditCardId}
                        onChange={(creditCard) => {
                            setFormData((f) => ({
                                ...f,
                                creditCardId: creditCard?.id,
                            }));
                        }}
                    >
                        <div className="p-4 w-full invisible">
                            <button className="btn btn-block" unselectable="on" />
                        </div>
                        <div className="p-4 w-full fixed left-0 right-0 bottom-0">
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
