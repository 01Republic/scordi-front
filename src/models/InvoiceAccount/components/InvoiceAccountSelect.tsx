import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import React, {memo, useEffect, useState} from 'react';
import {useInvoiceAccountListInSelectModal} from '^models/InvoiceAccount/hook';
import {debounce} from 'lodash';
import {InputSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs';
import {MonoSelectInput} from '^components/ui/inputs/MonoSelect/MonoSelectInput';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {
    InvoiceAccountSelectModal,
    InvoiceAccountCreateMethod,
    InvoiceAccountCreateMethodModal,
    InvoiceAccountManualCreateModal,
    InvoiceAccountAutoCreateModal,
} from '^clients/private/_modals/invoice-accounts';
import {toast} from 'react-hot-toast';
import {ReactNodeElement} from '^types/global.type';

interface InvoiceAccountSelectProps {
    defaultValue?: InvoiceAccountDto;
    onSelect?: (invoiceAccount?: InvoiceAccountDto) => void;
    placeholder?: ReactNodeElement;
}

export const InvoiceAccountSelect = memo(function InvoiceAccountSelect(props: InvoiceAccountSelectProps) {
    const {defaultValue, onSelect, placeholder} = props;
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const [isSelectModalOpened, setIsSelectModalOpened] = useState(false);
    const [isCreateMethodModalOpen, setIsCreateMethodModalOpen] = useState(false);
    const [isAutoCreateModalOpen, setIsAutoCreateModalOpen] = useState(false);
    const [isManualCreateModalOpen, setIsManualCreateModalOpen] = useState(false);
    const {search, result, reload, isLoading} = useInvoiceAccountListInSelectModal();

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = debounce(() => {
        return search({
            relations: ['googleTokenData', 'subscriptions'],
            itemsPerPage: 0,
            order: {googleTokenDataId: 'DESC'},
        });
    }, 500);

    const onChange = (invoiceAccount?: InvoiceAccountDto) => {
        setSelectedOption(invoiceAccount);
        onSelect && onSelect(invoiceAccount);
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
                        id="invoiceAccountSelect"
                        openModal={selectModal.show}
                        clearable
                        selectedOption={selectedOption}
                        getLabel={(option) => <InvoiceAccountProfile invoiceAccount={option} />}
                        placeholder={placeholder || '이메일 주소 선택'}
                        clearOption={() => onChange(undefined)}
                    />
                </label>
            </div>

            <InvoiceAccountSelectModal
                isOpened={isSelectModalOpened}
                onClose={() => selectModal.hide()}
                isLoading={isLoading}
                reload={reload}
                invoiceAccounts={result.items}
                defaultValue={selectedOption?.id}
                onSelect={onChange}
                onCtaButtonClick={() => setIsCreateMethodModalOpen(true)}
                onReConnect={() => setIsAutoCreateModalOpen(true)}
            />

            <InvoiceAccountCreateMethodModal
                isOpened={isCreateMethodModalOpen}
                onClose={() => setIsCreateMethodModalOpen(false)}
                onSelect={(createMethod: InvoiceAccountCreateMethod) => {
                    switch (createMethod) {
                        case InvoiceAccountCreateMethod.Auto:
                            setIsManualCreateModalOpen(false);
                            setIsAutoCreateModalOpen(true);
                            return;
                        case InvoiceAccountCreateMethod.Manual:
                        default:
                            setIsAutoCreateModalOpen(false);
                            return setIsManualCreateModalOpen(true);
                    }
                }}
            />

            <InvoiceAccountAutoCreateModal
                isOpened={isAutoCreateModalOpen}
                onClose={() => setIsAutoCreateModalOpen(false)}
                onCreate={() => {
                    toast.success('불러온 청구서 메일을 추가했어요.');
                    setIsAutoCreateModalOpen(false);
                    reload();
                }}
                onRetry={() => {
                    setIsAutoCreateModalOpen(true);
                }}
            />

            <InvoiceAccountManualCreateModal
                isOpened={isManualCreateModalOpen}
                onClose={() => setIsManualCreateModalOpen(false)}
                onCreate={() => {
                    toast.success('청구서 메일을 추가했어요.');
                    setIsManualCreateModalOpen(false);
                    reload();
                }}
                onSelect={(invoiceAccount) => {
                    onChange(invoiceAccount);
                    setIsManualCreateModalOpen(false);
                }}
            />
        </InputSection>
    );
});
