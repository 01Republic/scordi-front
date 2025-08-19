import React, {memo, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {BillingHistoryStatus} from '^models/BillingHistory/type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {DropdownContent} from '^v3/share/Dropdown';
import {useElementWidth} from '^hooks/useElementWidth';
import {CurrencyCode, CurrencyListV2} from '^models/Money';

interface PayCurrencySelectProps {
    defaultValue?: CurrencyCode;
    onSelect: (currencyCode: CurrencyCode) => void;
}

export const PayCurrencySelect = memo((props: PayCurrencySelectProps) => {
    const {defaultValue, onSelect} = props;

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<CurrencyCode | null>(null);
    const [triggerRef, width] = useElementWidth<HTMLDivElement>();

    const billingHistoryStatusToShow = selected ? selected : defaultValue ? defaultValue : null;

    const currencyOptions: CurrencyCode[] = [CurrencyCode.USD, CurrencyCode.EUR, CurrencyCode.KRW, CurrencyCode.JPY];

    const handleSelect = (currencyCode: CurrencyCode) => {
        setSelected(currencyCode);
        onSelect(currencyCode);
        setOpen(false);
    };
    return (
        <>
            <div
                ref={triggerRef}
                className="flex items-center justify-between cursor-pointer rounded-lg px-3 py-4 text-14 whitespace-nowrap ring-1 ring-inset ring-gray-300"
                onClick={() => {
                    setOpen((open) => !open);
                }}
            >
                {billingHistoryStatusToShow ? (
                    <>{billingHistoryStatusToShow}</>
                ) : (
                    <span className="text-gray-500">결제통화 선택</span>
                )}
                <ChevronDown className="size-4" />
            </div>
            <DropdownContent
                visible={open}
                hide={() => setOpen(false)}
                triggerRef={triggerRef}
                backdrop
                allowScroll
                placement="bottom-start"
            >
                <ul
                    style={{width: width}}
                    className="dropdown-portal-content relative z-10 bg-white border border-gray-300 w-full rounded-lg max-h-60 overflow-auto p-4 space-y-1"
                >
                    {currencyOptions.map((code) => {
                        const info = CurrencyListV2[code];
                        return (
                            <li
                                key={code}
                                className="hover:bg-primaryColor-weak active:bg-primaryColor-900 active:text-white cursor-pointer text-12 p-1 rounded-md group"
                            >
                                <div
                                    className="cursor-pointer w-full text-left flex gap-1 items-center"
                                    onClick={() => handleSelect(code)}
                                >
                                    <span className="text-14 w-4 text-center">{info.symbol}</span>
                                    <span className="text-12 text-gray-500 group-active:text-white">
                                        {info.code} {info.unit}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </DropdownContent>
        </>
    );
});
