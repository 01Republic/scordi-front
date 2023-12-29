import React, {memo, useState} from 'react';
import {useModal, UseModalOption} from '^v3/share/modals';
import {FcCheckmark} from 'react-icons/fc';
import {
    currencySelectShowModal,
    SelectedCurrency,
    selectedCurrencyState,
} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {RecoilState, useRecoilState} from 'recoil';
import {CurrencyCode, CurrencyListV2} from '^types/money.type';
import {CurrencyType} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/report-item-form.dto';
import {useToast} from '^hooks/useToast';

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
    const [selected, setSelected] = useState<CurrencyOption>(defaultValue);
    const {toast} = useToast();

    const onClick = () => {
        console.log('12345', selected);
        if (!selected) {
            console.log('필수 선택 사항 입니다.');
            toast.error('필수 선택 사항 입니다.');
            return;
        }
        console.log('onChange', onChange);
        onChange(selected);
        close();
    };

    return (
        <div
            data-modal="CurrencySelectModal-for-AppShowModal"
            className={`modal modal-bottom ${isShow ? 'modal-open' : ''}`}
        >
            <div className="modal-box max-w-lg p-0">
                <div className="p-4 bg-scordi">
                    <h3 className="font-bold text-lg text-white">결제된 화폐를 선택해주세요</h3>
                </div>
                <div className="px-4 pb-4 flex flex-col h-[50vh] overflow-y-auto no-scrollbar">
                    <div className="flex-1 py-4 px-2 text-sm">
                        <ul>
                            {CurrencyOptions2.map((option) => {
                                if (option.label === selected.label) {
                                    return (
                                        <li
                                            className="flex justify-between items-center font-bold mb-3"
                                            key={option.label}
                                        >
                                            <span className="btn btn-sm text-green-600">{option.label}</span>
                                            <div className="flex gap-2">
                                                <span>{option.desc}</span>
                                                <FcCheckmark size={18} />
                                            </div>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li
                                            onClick={() => setSelected(option)}
                                            className="flex justify-between items-center font-bold mb-2 cursor-pointer"
                                            key={option.label}
                                        >
                                            <span className="btn btn-sm">{option.label}</span>
                                            <span>{option.desc}</span>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <button
                        // disabled={selectedIds.length < 1}
                        className="btn btn-lg btn-scordi btn-block rounded-box disabled:border-indigo-100 disabled:bg-indigo-100 disabled:text-indigo-300"
                        onClick={() => onClick()}
                    >
                        선택하기
                    </button>
                </div>
            </div>
        </div>
    );
});

const CurrencyOptions2 = Object.values(CurrencyListV2).map((currencyInfo) => {
    return {
        label: currencyInfo.code,
        desc: currencyInfo.desc,
    };
});
