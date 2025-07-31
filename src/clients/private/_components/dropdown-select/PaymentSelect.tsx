import React, {memo, useRef, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountDto} from '^models/BankAccount/type';
import {Loading} from '^v3/share/Loading';
import {DropdownContent} from '^v3/share/Dropdown';
import {CreditCardProfileCompact} from '^models/CreditCard/components';
import {BankAccountProfileCompact} from '^models/BankAccount/components';

export interface PaymentSelectProps {
    defaultValue?: CreditCardDto | BankAccountDto;
    creditCards?: CreditCardDto[];
    bankAccounts?: BankAccountDto[];
    readonly?: boolean;
    isLoading?: boolean;
    onSelect: (item: CreditCardDto | BankAccountDto) => void;
    onOpen?: () => void;
}

export const PaymentSelect = memo((props: PaymentSelectProps) => {
    const {defaultValue, creditCards = [], bankAccounts = []} = props;
    const {readonly, isLoading, onSelect, onOpen} = props;

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<CreditCardDto | BankAccountDto | null>(defaultValue || null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleSelect = (item: CreditCardDto | BankAccountDto) => {
        setSelected(item);
        onSelect(item);
        setOpen(false);
    };

    return (
        <div>
            <div
                ref={triggerRef}
                className={`flex items-center justify-between cursor-pointer rounded-lg px-3 py-4 text-14 whitespace-nowrap ${
                    readonly ? 'bg-gray-100 pointer-events-none' : 'ring-1 ring-inset ring-gray-300'
                }`}
                onClick={() => {
                    if (readonly) return;
                    if (!open) onOpen?.();
                    setOpen((open) => !open);
                }}
            >
                {selected ? (
                    <DefaultValueComponent value={selected} />
                ) : (
                    <span className="text-gray-500">결제수단 선택</span>
                )}
                {!readonly && <ChevronDown className="size-4" />}
            </div>

            {!readonly && (
                <DropdownContent
                    visible={open}
                    hide={() => setOpen(false)}
                    triggerRef={triggerRef}
                    backdrop
                    allowScroll
                    placement="bottom-start"
                >
                    <ul className="bg-white border rounded-lg max-h-60 overflow-auto px-4 py-2 space-y-2">
                        {isLoading ? (
                            <div className="flex justify-center p-4 min-w-60 ">
                                <Loading />
                            </div>
                        ) : (
                            <>
                                <section className="space-y-1">
                                    <span className="text-12 text-gray-500 font-base">카드</span>
                                    {creditCards?.map((creditCard) => (
                                        <li
                                            key={creditCard.id}
                                            className="hover:bg-neutral-100 active:bg-primaryColor-900 active:text-white cursor-pointer text-12 p-1 rounded-md"
                                            onClick={() => handleSelect(creditCard)}
                                        >
                                            <CreditCardProfileCompact item={creditCard} className="text-14" />
                                        </li>
                                    ))}
                                </section>
                                <hr className="my-0.5 border-gray-300" />
                                <section className="space-y-1">
                                    <span className="text-12 text-gray-500 font-base">계좌</span>
                                    {bankAccounts?.map((bankAccount) => (
                                        <li
                                            key={bankAccount.id}
                                            className="hover:bg-neutral-100 active:bg-primaryColor-900 active:text-white cursor-pointer text-12 p-1 rounded-md"
                                            onClick={() => handleSelect(bankAccount)}
                                        >
                                            <BankAccountProfileCompact item={bankAccount} className="text-14" />
                                        </li>
                                    ))}
                                </section>
                            </>
                        )}
                    </ul>
                </DropdownContent>
            )}
        </div>
    );
});

const DefaultValueComponent = memo((props: {value: CreditCardDto | BankAccountDto | string}) => {
    const {value} = props;

    if (typeof value === 'string') {
        return <p>{value}</p>;
    }

    return value instanceof CreditCardDto ? (
        <CreditCardProfileCompact item={value} />
    ) : (
        <BankAccountProfileCompact item={value} />
    );
});
