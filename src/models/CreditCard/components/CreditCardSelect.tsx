import React, {memo, useState} from 'react';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {CreditCardDto} from '../type';
import {useCreditCards} from '../hook';
import {CreditCardProfileOption2} from './CreditCardProfile';

interface CreditCardSelectProps {
    defaultValue?: CreditCardDto;
    onChange: (creditCard?: CreditCardDto) => any;
    ValueComponent?: (props: {value: CreditCardDto | string}) => JSX.Element;
    removable?: boolean;
}

export const CreditCardSelect = memo((props: CreditCardSelectProps) => {
    const {defaultValue, onChange, ValueComponent = DefaultValueComponent, removable = false} = props;
    const {search, deleteCreditCard} = useCreditCards();
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

    const selectValue = (creditCard?: CreditCardDto) => {
        setSelectedValue(creditCard);
        return onChange(creditCard);
    };

    const onSelect = async (creditCard: CreditCardDto) => {
        if (creditCard.id === selectedValue?.id) return;
        return selectValue(creditCard);
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
                    valueOfOption={(creditCard) => creditCard.id}
                    textOfOption={(creditCard) => creditCard.name || ''}
                    onSelect={onSelect}
                    inputDisplay
                    inputPlainText
                    optionListBoxTitle="결제수단을 변경할까요?"
                    optionDetach={optionDetach}
                    detachableOptionBoxTitle="연결된 결제수단"
                    optionDestroy={
                        removable
                            ? (creditCard) => {
                                  const orgId = creditCard.organizationId;
                                  return deleteCreditCard(creditCard, orgId).then((res) => {
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

const DefaultValueComponent = memo((props: {value: CreditCardDto | string}) => {
    const {value} = props;

    if (typeof value === 'string') {
        return <p>{value}</p>;
    }

    return <CreditCardProfileOption2 item={value} />;
});
