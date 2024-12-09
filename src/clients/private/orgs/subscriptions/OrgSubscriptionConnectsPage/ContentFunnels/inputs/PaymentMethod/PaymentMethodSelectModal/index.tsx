import React, {memo} from 'react';
import {CreditCardDto} from '^models/CreditCard/type';
import {LoadableBox} from '^components/util/loading';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {SelectablePaymentMethodItem} from './SelectablePaymentMethodItem';
import {HiMiniInbox} from 'react-icons/hi2';

interface PaymentMethodSelectModalProps {
    isOpened: boolean;
    onClose: () => any;
    isLoading: boolean;
    reload: () => Promise<any>;
    entries: CreditCardDto[];
    defaultValue?: number | null;
    onSelect: (creditCard?: CreditCardDto) => any;
    onCtaButtonClick: () => any;
}

export const PaymentMethodSelectModal = memo((props: PaymentMethodSelectModalProps) => {
    const {
        isOpened,
        onClose,
        isLoading,
        reload,
        entries,
        defaultValue,
        onSelect = console.log,
        onCtaButtonClick,
    } = props;

    const selectedItem = entries.find((o) => o.id === defaultValue);
    const clickOption = (creditCard?: CreditCardDto) => {
        if (creditCard) {
            onSelect(creditCard);
            onClose();
        } else {
            onSelect();
        }
    };

    console.log(entries);

    return (
        <SlideUpModal
            open={isOpened}
            onClose={onClose}
            size="md"
            minHeight="min-h-[var(--modal-height)]"
            maxHeight="max-h-[var(--modal-height)]"
            modalClassName="rounded-none sm:rounded-t-box [--modal-height:100vh] sm:[--modal-height:90vh]"
        >
            <h3 className="font-bold text-xl">결제 수단을 선택해주세요.</h3>

            {entries.length > 0 ? (
                <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                    <div className="py-4 max-h-full">
                        <div
                            className="no-scrollbar overflow-auto -mx-4 px-4"
                            style={{
                                maxHeight: 'calc(var(--modal-height) - 1.5rem - 28px - 1rem - 80px + 1rem)',
                            }}
                        >
                            <>
                                {entries.map((creditCard, i) => {
                                    const isSelected = !!selectedItem && selectedItem.id === creditCard.id;

                                    return (
                                        <SelectablePaymentMethodItem
                                            key={i}
                                            item={creditCard}
                                            onClick={() => clickOption(isSelected ? undefined : creditCard)}
                                            isSelected={isSelected}
                                            onSaved={() => reload()}
                                        />
                                    );
                                })}
                            </>
                        </div>
                    </div>
                </LoadableBox>
            ) : (
                <div
                    className="fixed w-full left-0 right-0  gap-4 h-full flex flex-col items-center justify-center"
                    style={{
                        maxHeight: 'calc(var(--modal-height) - 28px - 1.5rem - 80px)',
                    }}
                >
                    <HiMiniInbox className="text-slate-200" fontSize={48} />
                    <span className="text-16 font-semibold text-gray-400">등록된 결제수단이 없어요.</span>
                </div>
            )}
            <div
                className="p-4 w-full fixed left-0 right-0 bottom-0"
                style={{
                    background: 'linear-gradient(0, white 0, white 80%, transparent)',
                }}
            >
                <button className="btn btn-block btn-scordi" onClick={onCtaButtonClick}>
                    카드 또는 계좌 추가
                </button>
            </div>
        </SlideUpModal>
    );
});
PaymentMethodSelectModal.displayName = 'PaymentMethodSelectModal';
