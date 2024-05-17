import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {debounce} from 'lodash';
import {toast} from 'react-hot-toast';
import {FaTimes} from 'react-icons/fa';
import {FaCaretDown} from 'react-icons/fa6';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {enterToSpace} from '^components/util/keyDownLikeClick';
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

    return (
        <InputSection>
            <div className="form-control">
                <label className="label cursor-pointer p-0">
                    <div
                        id="invoiceAccountSelect"
                        tabIndex={0}
                        className="input border-gray-200 w-full bg-gray-100 text-16 flex items-center justify-between cursor-pointer"
                        onKeyDown={enterToSpace(() => setIsSelectModalOpened(true))}
                        onClick={() => setIsSelectModalOpened(true)}
                    >
                        {!formData.invoiceAccountId ? (
                            <div className="text-gray-400">ex. dev@scordi.io</div>
                        ) : (
                            <div>{selectedOption && <InvoiceAccountProfile invoiceAccount={selectedOption} />}</div>
                        )}

                        <div className="flex items-center gap-4">
                            {selectedOption && (
                                <FaTimes
                                    size={16}
                                    className="cursor-pointer text-gray-400 hover:text-gray-800 transition-all"
                                    onClick={(e) => {
                                        onChange();
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }}
                                />
                            )}
                            <FaCaretDown size={14} className="text-gray-400" />
                        </div>
                    </div>
                </label>
            </div>

            <InvoiceAccountSelectModal
                isOpened={isSelectModalOpened}
                onClose={() => setIsSelectModalOpened(false)}
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
