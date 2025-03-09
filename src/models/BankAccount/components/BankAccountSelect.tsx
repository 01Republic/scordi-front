import React, {memo, useState} from 'react';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {BankAccountDto} from '../type';
import {useBankAccountListForListPage} from '../hook';
import {BankAccountProfileOption2} from '^models/BankAccount/components/BankAccountProfile';

interface BankAccountSelectProps {
    defaultValue?: BankAccountDto;
    onChange: (bankAccount?: BankAccountDto) => any;
    ValueComponent?: (props: {value: BankAccountDto | string}) => JSX.Element;
    removable?: boolean;
}

export const BankAccountSelect = memo((props: BankAccountSelectProps) => {
    const {defaultValue, onChange, ValueComponent = DefaultValueComponent, removable = false} = props;
    const {search, deleteBankAccount} = useBankAccountListForListPage();
    const [selectedValue, setSelectedValue] = useState(defaultValue);

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

    const selectValue = (bankAccount?: BankAccountDto) => {
        setSelectedValue(bankAccount);
        return onChange(bankAccount);
    };

    const onSelect = async (bankAccount: BankAccountDto) => {
        if (bankAccount.id === selectedValue?.id) return;
        return selectValue(bankAccount);
    };

    const optionDetach = async () => {
        return selectValue();
    };

    return (
        <div className="">
            <div className="overflow-x-hidden">
                <SelectColumn
                    fullWidth={false}
                    value={selectedValue}
                    getOptions={getOptions}
                    ValueComponent={ValueComponent}
                    valueOfOption={(bankAccount) => bankAccount.id}
                    textOfOption={(bankAccount) => bankAccount.name || ''}
                    onSelect={onSelect}
                    inputDisplay
                    inputPlainText
                    optionListBoxTitle="결제수단을 변경할까요?"
                    optionDetach={optionDetach}
                    detachableOptionBoxTitle="연결된 결제수단"
                    optionDestroy={
                        removable
                            ? (bankAccount) => {
                                  const orgId = bankAccount.organizationId;
                                  return deleteBankAccount(bankAccount, orgId).then((res) => {
                                      if (res) selectValue();
                                      return true;
                                  });
                              }
                            : undefined
                    }
                    EmptyComponent={() => <TagUI className="text-gray-300 w-60 !justify-start">비어있음</TagUI>}
                />
            </div>
            {/*{isShow && (*/}
            {/*    <div className="tooltip tooltip-error" data-tip="카드가 바뀌었는지 확인해보세요.">*/}
            {/*        <BsExclamation size={28} className="text-error animate-pulse" />*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
});

const DefaultValueComponent = memo((props: {value: BankAccountDto | string}) => {
    const {value} = props;

    if (typeof value === 'string') {
        return <p>{value}</p>;
    }

    return <BankAccountProfileOption2 item={value} />;
});
