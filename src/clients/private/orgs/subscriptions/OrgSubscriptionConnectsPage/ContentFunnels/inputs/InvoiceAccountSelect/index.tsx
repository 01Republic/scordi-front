import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {MonoSelect} from '^components/ui/inputs/MonoSelect';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {
    InvoiceAccountCreateMethod,
    InvoiceAccountCreateMethodModal,
} from '../../inputs/InvoiceAccountSelect/InvoiceAccountCreateMethodModal';
import {InputSection} from '../../inputs/InputSection';
import {createSubscriptionFormData} from '../../atom';
import {InvoiceAccountAutoCreateModal} from './InvoiceAccountAutoCreateModal';

export const InvoiceAccountSelect = memo(function InvoiceAccountSelect() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const [isCreateMethodModalOpen, setIsCreateMethodModalOpen] = useState(false);
    const [isAutoCreateModalOpen, setIsAutoCreateModalOpen] = useState(false);
    const [isManualCreateModalOpen, setIsManualCreateModalOpen] = useState(false);
    const {search, result, reload, isLoading} = useInvoiceAccounts();

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = debounce((keyword?: string) => {
        return search({
            // keyword,
            relations: ['googleTokenData'],
            itemsPerPage: 0,
            order: {id: 'DESC'},
        });
    }, 500);

    return (
        <InputSection>
            <div className="form-control">
                <label className="label cursor-pointer p-0">
                    <MonoSelect
                        id="invoiceAccountSelect"
                        placeholder="ex. dev@scordi.io"
                        modalTitle="청구서 수신 계정 선택"
                        options={result.items}
                        isLoading={isLoading}
                        clearable
                        getLabel={(invoiceAccount) => <InvoiceAccountProfile invoiceAccount={invoiceAccount} />}
                        getValue={(invoiceAccount) => invoiceAccount.id}
                        size="md"
                        minHeight="min-h-[var(--modal-height)]"
                        maxHeight="max-h-[var(--modal-height)]"
                        modalClassName="rounded-none sm:rounded-t-box [--modal-height:100vh] sm:[--modal-height:90vh]"
                        scrollBoxHeight="calc(var(--modal-height) - 1.5rem - 28px - 1rem - 80px + 1rem)"
                        OptionComponent={({option}) => {
                            return <InvoiceAccountProfile invoiceAccount={option} />;
                        }}
                        defaultValue={formData.invoiceAccountId}
                        onChange={(invoiceAccount) => {
                            setFormData((f) => ({
                                ...f,
                                invoiceAccountId: invoiceAccount?.id,
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
                                onClick={() => setIsCreateMethodModalOpen(true)}
                            >
                                새로운 수신 계정 추가하기
                            </button>
                        </div>
                    </MonoSelect>
                </label>
            </div>

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
                    setIsAutoCreateModalOpen(false);
                    reload();
                }}
                onRetry={() => {
                    setIsAutoCreateModalOpen(true);
                }}
            />
        </InputSection>
    );
});
