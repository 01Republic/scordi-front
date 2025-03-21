import React, {memo, useEffect, useState} from 'react';
import {InvoiceAccountProfileCompact} from '^models/InvoiceAccount/components/InvoiceAccountProfile';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {deleteInvoiceAccount, useInvoiceAccountListInSelectModal} from '^models/InvoiceAccount/hook';
import {MultiSelectColumn} from '^clients/private/_components/table/columns/MultiSelectColumn';

interface InvoiceAccountSelectForTableViewProps {
    defaultValue?: InvoiceAccountDto[];
    onChange: (invoiceAccount?: InvoiceAccountDto[]) => any;
    ValueComponent?: (props: {value: InvoiceAccountDto | string}) => JSX.Element;
    removable?: boolean;
}

export const InvoiceAccountSelectForTableView = memo((props: InvoiceAccountSelectForTableViewProps) => {
    const {defaultValue, onChange, ValueComponent = DefaultValueComponent} = props;
    const {search, result, reload, isLoading} = useInvoiceAccountListInSelectModal();
    const [selectedValues, setSelectedValues] = useState<InvoiceAccountDto[]>(defaultValue || []);

    const getOptions = async (keyword?: string) => {
        return search(
            {
                keyword,
                itemsPerPage: 0,
            },
            false,
            true,
        ).then((res) => res?.items || []);
    };

    const onSelect = async (invoiceAccount: InvoiceAccountDto) => {
        if (selectedValues.some((item) => item.id === invoiceAccount.id)) return;
        const newSelected = [...selectedValues, invoiceAccount];
        setSelectedValues(newSelected);
        return onChange(newSelected);
    };

    const optionDetach = async (invoiceAccount: InvoiceAccountDto) => {
        const newSelected = selectedValues.filter((item) => item.id !== invoiceAccount.id);
        setSelectedValues(newSelected);
        return onChange(newSelected);
    };

    return (
        <div className="overflow-x-hidden">
            <MultiSelectColumn
                fullWidth={false}
                value={selectedValues}
                getOptions={getOptions}
                ValueComponent={ValueComponent}
                valueOfOption={(invoiceAccount) => invoiceAccount.id}
                textOfOption={(invoiceAccount) => invoiceAccount.email || ''}
                onSelect={onSelect}
                inputDisplay
                inputPlainText
                optionListBoxTitle="청구서메일을 변경할까요?"
                optionDetach={optionDetach}
                detachableOptionBoxTitle="연결된 청구서메일"
                EmptyComponent={() => <TagUI className="text-gray-300 w-60 !justify-start">비어있음</TagUI>}
            />
        </div>
    );
});

interface DefaultValueComponentProps {
    invoiceAccount?: InvoiceAccountDto;
}

const DefaultValueComponent = memo((props: DefaultValueComponentProps) => {
    const {invoiceAccount} = props;
    if (!invoiceAccount) return <></>;

    return <InvoiceAccountProfileCompact invoiceAccount={invoiceAccount} />;
});
