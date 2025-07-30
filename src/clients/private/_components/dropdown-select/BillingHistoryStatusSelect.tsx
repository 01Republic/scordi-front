import React, {memo, useLayoutEffect, useRef, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {BillingHistoryStatus} from '^models/BillingHistory/type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {DropdownContent} from '^v3/share/Dropdown';
import {useElementWidth} from '^hooks/useElementWidth';

interface BillingHistoryStatusSelectProps {
    defaultValue?: BillingHistoryStatus;
    onSelect: (status: BillingHistoryStatus) => void;
}

export const BillingHistoryStatusSelect = memo((props: BillingHistoryStatusSelectProps) => {
    const {defaultValue, onSelect} = props;

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<BillingHistoryStatus | null>(null);
    const [triggerRef, dropdownWidth] = useElementWidth<HTMLDivElement>();

    const billingHistoryStatusToShow = selected ? selected : defaultValue ? defaultValue : null;

    const handleSelect = (status: BillingHistoryStatus) => {
        setSelected(status);
        onSelect(status);
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
                    selected === BillingHistoryStatus.PaySuccess ? (
                        <TagUI className="bg-green-200 text-14">결제됨</TagUI>
                    ) : (
                        <TagUI className="bg-red-400 text-white text-14">실패</TagUI>
                    )
                ) : (
                    <span className="text-gray-500">결제상태 선택</span>
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
                    style={{width: dropdownWidth}}
                    className="dropdown-portal-content relative z-10 bg-white border border-gray-300 w-full rounded-lg max-h-60 overflow-auto p-2"
                >
                    <li
                        className="w-full text-start cursor-pointer hover:bg-primaryColor-weak p-0.5 rounded-sm"
                        onClick={() => handleSelect(BillingHistoryStatus.PaySuccess)}
                    >
                        <TagUI className="bg-green-200">결제됨</TagUI>
                    </li>
                    <li
                        className="w-full text-start cursor-pointer hover:bg-primaryColor-weak p-0.5 rounded-sm"
                        onClick={() => handleSelect(BillingHistoryStatus.PayFail)}
                    >
                        <TagUI className="bg-red-400 text-white">실패</TagUI>
                    </li>
                </ul>
            </DropdownContent>
        </>
    );
});
