import React, {memo, useState} from 'react';
import {enterToSpace} from '^components/util/keyDownLikeClick';
import {FaTimes} from 'react-icons/fa';
import {FaCaretDown, FaCheck} from 'react-icons/fa6';
import {ReactNodeLike} from 'prop-types';
import {ModalLayoutProps} from '^components/modals/_shared/Modal.types';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {WithChildren} from '^types/global.type';
import {LoadableBox} from '^components/util/loading';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {useGoogleLoginForInvoiceAccountSelect} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/InvoiceAccountSelect/useGoogleLoginForInvoiceAccountSelect';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface InvoiceAccountSelectModalProps {
    isOpened: boolean;
    onClose: () => any;
    isLoading: boolean;
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
            <h3 className="font-bold text-xl">청구서 수신 계정 선택</h3>

            <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                <div className="py-4 max-h-full">
                    <div
                        className="no-scrollbar overflow-auto -mx-4 px-4"
                        style={{
                            maxHeight: 'max-h-[var(--modal-height)]',
                        }}
                    >
                        {!!notSelectables.length && (
                            <div>
                                <p className="text-12 text-scordi mb-2">연동이 만료된 계정이에요</p>
                                {notSelectables.map((invoiceAccount, i) => {
                                    const onClick = () => launch(onReConnect);

                                    return (
                                        <div
                                            tabIndex={0}
                                            key={i}
                                            className="-mx-4 px-4 py-2.5 cursor-pointer group hover:bg-gray-100 flex items-center justify-between rounded-box btn-animation"
                                            onKeyDown={enterToSpace(onClick)}
                                            onClick={onClick}
                                        >
                                            <div>
                                                <InvoiceAccountProfile invoiceAccount={invoiceAccount} />
                                            </div>

                                            <div>
                                                <TagUI className="bg-orange-100 text-orange-500">재연동</TagUI>
                                            </div>
                                        </div>
                                    );
                                })}
                                <p className="text-12 text-scordi mb-2 mt-4">연결된 계정 {selectables.length}개</p>
                            </div>
                        )}
                        {selectables.map((invoiceAccount, i) => {
                            const isSelected = !!selectedItem && selectedItem.id === invoiceAccount.id;
                            const onClick = () => clickOption(isSelected ? undefined : invoiceAccount);

                            return (
                                <div
                                    tabIndex={0}
                                    key={i}
                                    className="-mx-4 px-4 py-2.5 cursor-pointer group hover:bg-gray-100 flex items-center justify-between rounded-box btn-animation"
                                    onKeyDown={enterToSpace(onClick)}
                                    onClick={onClick}
                                >
                                    <div>
                                        <InvoiceAccountProfile invoiceAccount={invoiceAccount} />
                                    </div>

                                    <div>{isSelected && <FaCheck className="text-scordi" />}</div>
                                </div>
                            );
                        })}
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
                    새로운 수신 계정 추가하기
                </button>
            </div>
        </SlideUpModal>
    );
});
InvoiceAccountSelectModal.displayName = 'InvoiceAccountSelectModal';
