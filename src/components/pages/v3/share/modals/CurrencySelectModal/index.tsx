import React, {memo} from 'react';
import {useModal, UseModalOption} from '^v3/share/modals';
import {CurrencyCode, CurrencyListV2} from '^models/Money';
import {SelectOneModal} from '^v3/share/modals/_containers/SelectOneModal';

type CurrencyOption = {label: CurrencyCode; desc: string};

interface CurrencySelectModalProps {
    modalAtom: UseModalOption;
    defaultValue: CurrencyOption;
    onChange: (selectedOption: CurrencyOption) => any;
    // required?: boolean;
}

export const CurrencySelectModal = memo((props: CurrencySelectModalProps) => {
    const {modalAtom, onChange, defaultValue} = props;
    const {close, isShow} = useModal(modalAtom);

    return (
        <SelectOneModal
            title="결제된 화폐를 선택해주세요"
            modalId="CurrencySelectModal-for-AppShowModal"
            isShow={isShow}
            size="lg"
            onClose={() => close()}
            getOptions={() => CurrencyOptions2}
            defaultValue={defaultValue}
            valueOfOption={(option) => option.label}
            onSelect={onChange}
            OptionComponent={memo((props) => {
                const option = props.value as {label: CurrencyCode; desc: string};

                return (
                    <div className="flex justify-between items-center font-bold py-1.5">
                        <span className="btn btn-sm text-green-600">{option.label}</span>
                        <div className="flex gap-2">
                            <span>{option.desc}</span>
                        </div>
                    </div>
                );
            })}
        />
    );
});

const CurrencyOptions2 = Object.values(CurrencyListV2).map((currencyInfo) => {
    return {
        label: currencyInfo.code,
        desc: currencyInfo.desc,
    };
});
