import React, {memo, useState} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {InvoiceAccountManualCreateModalHeader} from './InvoiceAccountManualCreateModalHeader';
import {InvoiceAccountManualCreateSubmitButton} from './InvoiceAccountManualCreateSubmitButton';
import {useForm} from 'react-hook-form';
import {debounce} from 'lodash';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {CreateInvoiceAccountDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {useInvoiceAccountsSearch} from '^models/InvoiceAccount/hook';
import {SelectableInvoiceAccount} from '../InvoiceAccountSelectModal/SelectableInvoiceAccount';
import {LoadableBox} from '^components/util/loading';
import {HiCursorClick} from '^components/react-icons';

interface InvoiceAccountManualCreateModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
    onSelect: (invoiceAccount: InvoiceAccountDto) => any;
}

export const InvoiceAccountManualCreateModal = memo((props: InvoiceAccountManualCreateModalProps) => {
    const {isOpened, onClose, onCreate, onSelect} = props;
    const orgId = useOrgIdParam();
    const {isLoading, search, result, reload, reset} = useInvoiceAccountsSearch();
    const form = useForm<CreateInvoiceAccountDto>();
    const [errorMessage, setErrorMessage] = useState<string>();

    const clearAll = () => {
        setErrorMessage(undefined);
        form.reset();
        reset();
    };

    const isValidEmail = async (email?: string) => {
        if (!email) return true;
        return search(
            {
                // relations: ['googleTokenData', 'subscriptions'],
                where: {email},
                itemsPerPage: 0,
                order: {googleTokenDataId: 'DESC'},
            },
            false,
            true,
        ).then((res) => {
            return res?.pagination.totalItemCount === 0;
        });
    };

    const onSubmit = debounce(async (dto: CreateInvoiceAccountDto) => {
        const validEmail = await isValidEmail(dto.email);

        if (validEmail) {
            invoiceAccountApi.createV3(orgId, dto).then(() => {
                onCreate();
                clearAll();
            });
        } else {
            setErrorMessage('이미 등록된 이메일이에요!');
        }
    }, 500);

    const emailInputPuts = form.register('email', {required: true});

    return (
        <SlideUpModal
            open={isOpened}
            onClose={onClose}
            size="md"
            minHeight="min-h-screen sm:min-h-[90%]"
            maxHeight="max-h-screen sm:max-h-[90%]"
            modalClassName="rounded-none sm:rounded-t-box"
        >
            <InvoiceAccountManualCreateModalHeader onClose={onClose} />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="py-4 flex flex-col gap-4 items-stretch">
                    <div>
                        <label>
                            <p className="text-12 text-gray-500 mb-1.5">이메일</p>
                            <input
                                type="email"
                                placeholder="tech@01republic.io"
                                className={`input bg-gray-100 text-16 w-full ${
                                    errorMessage ? 'input-error' : 'border-gray-200'
                                }`}
                                {...emailInputPuts}
                                onChange={(e) => {
                                    setErrorMessage(undefined);
                                    return emailInputPuts.onChange(e);
                                }}
                                required
                            />
                            {errorMessage && <p className="text-12 text-error mt-1.5 text-right">{errorMessage}</p>}
                        </label>
                    </div>

                    <div>
                        {!!result.items.length && (
                            <p className="text-12 text-gray-500 mb-1 flex items-center gap-1">
                                <span>찾으시는 계정이 있다면 선택해주세요</span> <HiCursorClick />
                            </p>
                        )}
                        <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                            <div className="max-h-full">
                                <div
                                    className="no-scrollbar overflow-auto -mx-4 px-4"
                                    style={{
                                        maxHeight: 'calc(var(--modal-height) - 1.5rem - 28px - 1rem - 80px + 1rem)',
                                    }}
                                >
                                    {result.items.map((invoiceAccount, i) => (
                                        <SelectableInvoiceAccount
                                            key={i}
                                            invoiceAccount={invoiceAccount}
                                            onClick={() => {
                                                onSelect(invoiceAccount);
                                                clearAll();
                                            }}
                                            isSelected={false}
                                            onSaved={() => reload()}
                                        />
                                    ))}
                                </div>
                            </div>
                        </LoadableBox>
                    </div>
                </div>
                <InvoiceAccountManualCreateSubmitButton />
            </form>
        </SlideUpModal>
    );
});
InvoiceAccountManualCreateModal.displayName = 'InvoiceAccountManualCreateModal';
