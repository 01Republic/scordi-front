import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {toast} from 'react-hot-toast';
import {useInvoiceAccountListInSelectModal} from '^models/InvoiceAccount/hook';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {
    InvoiceAccountAutoCreateModal,
    InvoiceAccountCreateMethod,
    InvoiceAccountManualCreateModal,
} from '^clients/private/_modals/invoice-accounts';
import {createSubscriptionForInvoiceAccountFormData} from '../../atom';
import {InputSection} from '../../inputs/InputSection';
import {InvoiceAccountCreateMethodModal} from './InvoiceAccountCreateMethodModal';
import {SlideUpSelectModal} from '^clients/private/_modals/SlideUpSelectModal';
import {InvoiceAccountSelectItem} from '^models/InvoiceAccount/components/InvoiceAccountSelectItem';
import {ChevronDown, CircleX} from 'lucide-react';

interface InvoiceAccountSelectProps {
    defaultValue?: InvoiceAccountDto;
    onSelect?: (invoiceAccount?: InvoiceAccountDto) => void;
}

export const InvoiceAccountSelect = memo(function InvoiceAccountSelect(props: InvoiceAccountSelectProps) {
    const [invoiceAccountData, setInvoiceAccountData] = useRecoilState(createSubscriptionForInvoiceAccountFormData);
    const [isSelectModalOpened, setIsSelectModalOpened] = useState(false);
    const [isCreateMethodModalOpen, setIsCreateMethodModalOpen] = useState(false);
    const [isAutoCreateModalOpen, setIsAutoCreateModalOpen] = useState(false);
    const [isManualCreateModalOpen, setIsManualCreateModalOpen] = useState(false);
    const {search, result, reload, isLoading} = useInvoiceAccountListInSelectModal();
    const selectedInvoiceAccounts = invoiceAccountData.invoiceAccounts;
    const selectedInvoiceAccountIds = invoiceAccountData.invoiceAccountIds;

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

    const filterInvoiceAccount =
        selectedInvoiceAccountIds.length > 0
            ? result.items.filter((item) => !selectedInvoiceAccountIds.includes(item.id))
            : result.items;

    const onSelected = (selectedIds: number[]) => {
        const filteredInvoiceAccounts = filterInvoiceAccount.filter((item: InvoiceAccountDto) =>
            selectedIds.includes(item.id),
        );

        setInvoiceAccountData((prev) => ({
            ...prev,
            invoiceAccounts: [...prev.invoiceAccounts, ...filteredInvoiceAccounts],
            invoiceAccountIds: [...prev.invoiceAccountIds, ...selectedIds],
        }));
    };

    const onChange = (invoiceAccount?: InvoiceAccountDto) => {
        props.onSelect?.(invoiceAccount);
        setInvoiceAccountData((prev) => ({
            ...prev,
            invoiceAccountId: invoiceAccount?.id,
        }));
    };

    const onDelete = (invoiceAccount?: InvoiceAccountDto) => {
        if (!invoiceAccount) return;

        setInvoiceAccountData((prev) => ({
            ...prev,
            invoiceAccounts: prev.invoiceAccounts.filter((acc) => acc.id !== invoiceAccount.id),
            invoiceAccountIds: prev.invoiceAccountIds.filter((id) => id !== invoiceAccount.id),
        }));
    };

    const selectModal = {
        show: () => {
            setIsSelectModalOpened(true);
            reload();
        },
        hide: () => setIsSelectModalOpened(false),
    };

    const CreateInvoiceAccountButton = () => {
        return (
            <button
                type="button"
                onClick={() => setIsCreateMethodModalOpen(true)}
                className="btn btn-white btn-block flex items-center justify-center"
            >
                청구서 메일 추가
            </button>
        );
    };

    return (
        <InputSection>
            <div className="form-control">
                <label className="label cursor-pointer flex flex-col gap-5">
                    <div
                        onClick={selectModal.show}
                        className="input border-gray-200 w-full bg-gray-100 text-16 flex items-center justify-between cursor-pointer text-gray-400"
                    >
                        이메일 주소 선택
                        <ChevronDown size={14} className="text-gray-400" />
                    </div>
                    {selectedInvoiceAccountIds?.length > 0 && (
                        <ul className="w-full flex flex-col gap-4 px-1">
                            {selectedInvoiceAccounts.map((invoiceAccount) => (
                                <li key={invoiceAccount.id} className="w-full flex items-center justify-between">
                                    <InvoiceAccountProfile invoiceAccount={invoiceAccount} />
                                    <CircleX
                                        onClick={() => onDelete(invoiceAccount)}
                                        className="text-gray-400 text-20"
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </label>
            </div>

            <SlideUpSelectModal
                isOpened={isSelectModalOpened}
                onClose={() => setIsSelectModalOpened(false)}
                onCreate={() => {
                    setIsSelectModalOpened(false);
                    reload();
                }}
                items={filterInvoiceAccount}
                getId={(item) => item.id}
                Row={({item, onClick, isSelected}) => (
                    <InvoiceAccountSelectItem invoiceAccount={item} onClick={onClick} isSelected={isSelected} />
                )}
                Button={() => <CreateInvoiceAccountButton />}
                onSubmit={onSelected}
                title="연결할 청구서 메일을 모두 선택해 주세요."
                ctaInactiveText="청구서 메일을 선택해주세요."
                ctaActiveText="%n개의 선택된 청구서 메일 연결하기"
                successMessage="선택한 청구서 메일을 연결했어요."
                emptyText="연결할 결제수단이 없어요"
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
