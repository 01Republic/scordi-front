import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {toast} from 'react-hot-toast';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {MonoSelectInput} from '^components/ui/inputs/MonoSelect/MonoSelectInput';
import {createSubscriptionFormData} from '../../atom';
import {InputSection} from '../../inputs/InputSection';
import {InvoiceAccountSelectModal} from './InvoiceAccountSelectModal';
import {InvoiceAccountCreateMethod, InvoiceAccountCreateMethodModal} from './InvoiceAccountCreateMethodModal';
import {InvoiceAccountAutoCreateModal} from './InvoiceAccountAutoCreateModal';
import {InvoiceAccountManualCreateModal} from './InvoiceAccountManualCreateModal';

export const InvoiceAccountSelect = memo(function InvoiceAccountSelect() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const [isSelectModalOpened, setIsSelectModalOpened] = useState(false);

    const [isCreateMethodModalOpen, setIsCreateMethodModalOpen] = useState(false);
    const [isAutoCreateModalOpen, setIsAutoCreateModalOpen] = useState(false);
    const [isManualCreateModalOpen, setIsManualCreateModalOpen] = useState(false);
    const {search, result, reload, isLoading} = useInvoiceAccounts();
    const selectedOption = result.items.find((o) => o.id === formData.invoiceAccountId);

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
        setFormData((f) => ({
            ...f,
            invoiceAccountId: invoiceAccount?.id,
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
                        id="invoiceAccountSelect"
                        openModal={selectModal.show}
                        clearable
                        selectedOption={selectedOption}
                        getLabel={(option) => <InvoiceAccountProfile invoiceAccount={option} />}
                        placeholder="ex. dev@scordi.io"
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
                defaultValue={formData.invoiceAccountId}
                onSelect={onChange}
                onCtaButtonClick={() => setIsCreateMethodModalOpen(true)}
                onReConnect={() => setIsAutoCreateModalOpen(true)}
            />

            <InvoiceAccountCreateMethodModal
                isOpened={isCreateMethodModalOpen}
                onClose={() => setIsCreateMethodModalOpen(false)}
                onSelect={(createMethod) => {
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
                    toast.success('계정을 저장했어요');
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
                    toast.success('계정을 저장했어요');
                    setIsManualCreateModalOpen(false);
                    reload();
                }}
            />
        </InputSection>
    );
});
