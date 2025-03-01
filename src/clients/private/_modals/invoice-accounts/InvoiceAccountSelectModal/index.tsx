import React, {memo} from 'react';
import {HiMiniInbox} from 'react-icons/hi2';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {useGoogleLoginForInvoiceAccountSelect} from '^models/InvoiceAccount/hook';
import {LoadableBox} from '^components/util/loading';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {NotSelectableInvoiceAccount} from './NotSelectableInvoiceAccount';
import {SelectableInvoiceAccount} from './SelectableInvoiceAccount';

interface InvoiceAccountSelectModalProps {
    isOpened: boolean;
    onClose: () => any;
    isLoading: boolean;
    reload: () => Promise<any>;
    invoiceAccounts: InvoiceAccountDto[];
    defaultValue?: number;
    onSelect: (invoiceAccount?: InvoiceAccountDto) => any;
    onCtaButtonClick: () => any;
    onReConnect: () => any;
}

export const InvoiceAccountSelectModal = memo((props: InvoiceAccountSelectModalProps) => {
    const {
        isOpened,
        onClose,
        isLoading,
        reload,
        invoiceAccounts,
        defaultValue,
        onSelect = console.log,
        onCtaButtonClick,
        onReConnect,
    } = props;
    const {launch} = useGoogleLoginForInvoiceAccountSelect();

    const selectedItem = invoiceAccounts.find((o) => o.id === defaultValue);
    const clickOption = (invoiceAccount?: InvoiceAccountDto) => {
        if (invoiceAccount) {
            onSelect(invoiceAccount);
            onClose();
        } else {
            onSelect();
        }
    };

    const notSelectables = invoiceAccounts.filter((item) => !item.googleTokenData && !item.isManuallyCreated);
    const selectables = invoiceAccounts.filter((item) => item.isManuallyCreated || item.googleTokenData);

    return (
        <SlideUpModal
            open={isOpened}
            onClose={onClose}
            size="md"
            minHeight="min-h-[var(--modal-height)]"
            maxHeight="max-h-[var(--modal-height)]"
            modalClassName="rounded-none sm:rounded-t-box [--modal-height:100vh] sm:[--modal-height:90vh]"
        >
            <h3 className="font-bold text-xl">청구서 메일을 선택해주세요.</h3>

            <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                <div className="py-4 max-h-full">
                    <div
                        className="no-scrollbar overflow-auto -mx-4 px-4"
                        style={{
                            maxHeight: 'calc(var(--modal-height) - 1.5rem - 28px - 1rem - 80px + 1rem)',
                        }}
                    >
                        {!!notSelectables.length && (
                            <div>
                                <p className="text-12 text-scordi mb-2">연동이 만료된 계정이에요</p>
                                {notSelectables.map((invoiceAccount, i) => (
                                    <NotSelectableInvoiceAccount
                                        key={i}
                                        invoiceAccount={invoiceAccount}
                                        onClick={() => launch(onReConnect)}
                                    />
                                ))}
                                <p className="text-12 text-scordi mb-2 mt-4">연결된 계정 {selectables.length}개</p>
                            </div>
                        )}
                        {selectables.length ? (
                            selectables.map((invoiceAccount, i) => {
                                const isSelected = !!selectedItem && selectedItem.id === invoiceAccount.id;

                                return (
                                    <SelectableInvoiceAccount
                                        key={i}
                                        invoiceAccount={invoiceAccount}
                                        onClick={() => clickOption(isSelected ? undefined : invoiceAccount)}
                                        isSelected={isSelected}
                                        onSaved={() => reload()}
                                    />
                                );
                            })
                        ) : (
                            <div
                                className="fixed w-full left-0 right-0  gap-4 h-full flex flex-col items-center justify-center"
                                style={{
                                    maxHeight: 'calc(var(--modal-height) - 28px - 1.5rem - 80px)',
                                }}
                            >
                                <HiMiniInbox className="text-slate-200" fontSize={48} />
                                <span className="text-16 font-semibold text-gray-400">
                                    등록된 청구서 메일이 없어요.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </LoadableBox>

            <div
                className="p-4 w-full fixed left-0 right-0 bottom-0"
                style={{
                    background: 'linear-gradient(0, white 0, white 80%, transparent)',
                }}
            >
                <button className="btn btn-block btn-scordi" onClick={onCtaButtonClick}>
                    청구서 메일 추가
                </button>
            </div>
        </SlideUpModal>
    );
});
InvoiceAccountSelectModal.displayName = 'InvoiceAccountSelectModal';
