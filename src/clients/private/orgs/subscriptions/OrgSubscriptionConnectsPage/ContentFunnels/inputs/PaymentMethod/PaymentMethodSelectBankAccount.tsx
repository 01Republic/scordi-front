import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {CardAutoCreateModal} from '^clients/private/_modals/credit-cards';
import {MonoSelectInput} from '^components/ui/inputs/MonoSelect/MonoSelectInput';
import {createSubscriptionFormData} from '../../atom';
import {InputSection} from '../InputSection';
import {useBankAccountListForListPage} from '^models/BankAccount/hook';
import {BankAccountSelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/BankAccountSelectModal';
import {BankAccountDto} from '^models/BankAccount/type';
import {BankAccountProfileOption2} from '^models/BankAccount/components';
import {
    BankCreateMethod,
    BankCreateMethodModal,
} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountListPage/AddBankAccountModal/BankCreateMethodModal';
import {BankManualCreateModal} from '^clients/private/_modals/bank-accounts/BankManualCreateModal';

interface PaymentMethodSelectBankAccountProps {
    readonly?: boolean;
}

export const PaymentMethodSelectBankAccount = memo(function PaymentMethodSelectBankAccount(
    props: PaymentMethodSelectBankAccountProps,
) {
    const {readonly = false} = props;
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const [isSelectModalOpened, setIsSelectModalOpened] = useState(false);
    const [isBankAccountCreateMethodModalOpen, setIsBankAccountCreateMethodModalOpen] = useState(false);
    const [isBankAccountAutoCreateModalOpen, setIsBankAccountAutoCreateModalOpen] = useState(false);
    const [isBankAccountManualCreateModalOpen, setIsBankAccountManualCreateModalOpen] = useState(false);
    const {search, result, reload, isLoading} = useBankAccountListForListPage();
    const selectedOption = result.items.find((o) => o.id === formData.bankAccountId);

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

    const onChange = (bankAccount?: BankAccountDto) => {
        setFormData((f) => ({
            ...f,
            bankAccountId: bankAccount?.id,
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
                        selectedOption={selectedOption}
                        getLabel={(bankAccount) => <BankAccountProfileOption2 item={bankAccount} />}
                        placeholder={readonly ? '카드 선택 시 자동 추가됩니다' : '계좌 선택'}
                        clearOption={() => onChange(undefined)}
                        readonly={readonly}
                    />
                </label>
            </div>

            {/* 결제수단 선택 */}
            <BankAccountSelectModal
                isOpened={isSelectModalOpened}
                onClose={() => selectModal.hide()}
                isLoading={isLoading}
                reload={reload}
                entries={result.items}
                defaultValue={formData.bankAccountId}
                onSelect={onChange}
                onCtaButtonClick={() => setIsBankAccountCreateMethodModalOpen(true)}
            />

            {/* 결제수단 등록 > 등록 방법 선택 */}
            <BankCreateMethodModal
                isOpened={isBankAccountCreateMethodModalOpen}
                onClose={() => setIsBankAccountCreateMethodModalOpen(false)}
                onSelect={(createMethod) => {
                    switch (createMethod) {
                        case BankCreateMethod.Auto:
                            setIsBankAccountManualCreateModalOpen(false);
                            return setIsBankAccountAutoCreateModalOpen(true);
                        case BankCreateMethod.Manual:
                        default:
                            setIsBankAccountAutoCreateModalOpen(false);
                            return setIsBankAccountManualCreateModalOpen(true);
                    }
                }}
            />

            {/* 결제수단 등록 > 자동 등록 */}
            <CardAutoCreateModal
                isOpened={isBankAccountAutoCreateModalOpen}
                onClose={() => {
                    setIsBankAccountAutoCreateModalOpen(false);
                    selectModal.show();
                }}
                onCreate={() => {
                    setIsBankAccountAutoCreateModalOpen(false);
                    selectModal.show();
                }}
            />

            {/* 결제수단 등록 > 수동 등록 */}
            <BankManualCreateModal
                isOpened={isBankAccountManualCreateModalOpen}
                onClose={() => {
                    setIsBankAccountManualCreateModalOpen(false);
                    selectModal.show();
                }}
                onCreate={() => {
                    setIsBankAccountManualCreateModalOpen(false);
                    selectModal.show();
                }}
            />
        </InputSection>
    );
});
