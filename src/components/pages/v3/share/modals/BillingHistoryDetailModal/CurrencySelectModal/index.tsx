import React, {memo} from 'react';
import {useModal} from '^v3/share/modals';
import {FcCheckmark} from 'react-icons/fc';
import {currencySelectShowModal, selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {useRecoilState} from 'recoil';
import {CurrencyListV2} from '^types/money.type';

export const CurrencySelectModal = memo(() => {
    const {close, isShow} = useModal(currencySelectShowModal);
    const [selectedCurrency, setSelectedCurrency] = useRecoilState(selectedCurrencyState);
    console.log(selectedCurrency);

    const onClick = () => {
        close();
    };

    return (
        <div
            data-modal="TeamMemberSelectModal-for-AppShowModal"
            className={`modal modal-bottom ${isShow ? 'modal-open' : ''}`}
        >
            <div className="modal-box max-w-lg p-0">
                <div className="p-4 bg-scordi">
                    <h3 className="font-bold text-lg text-white">결제된 화폐를 선택해주세요</h3>
                    <p className="text-sm text-white opacity-70">ㅎㅇㅎㅇㅎㅇㅎㅇ</p>
                </div>
                <div className="px-4 pb-4 flex flex-col h-[50vh] overflow-y-auto no-scrollbar">
                    <div className="flex-1 py-4 px-2 text-sm">
                        <ul>
                            {CurrencyOptions.map((option) => {
                                console.log('option', option);
                                console.log('selectedCurrency', selectedCurrency);
                                if (option === selectedCurrency) {
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
                                            onClick={() => setSelectedCurrency(option)}
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
                        onClick={onClick}
                    >
                        선택하기
                    </button>
                </div>
            </div>
        </div>
    );
});

const CurrencyOptions = [
    {label: 'USD', desc: 'United States Dollar'},
    {label: 'EUR', desc: 'Euro (European Union)'},
    {label: 'GBP', desc: 'British Pound Sterling'},
    {label: 'JPY', desc: 'Japanese Yen'},
    {label: 'CNY', desc: 'Chinese Yuan Renminbi'},
    {label: 'KRW', desc: 'South Korean Won'},
    {label: 'CAD', desc: 'Canadian Dollar'},
    {label: 'AUD', desc: 'Australian Dollar'},
    {label: 'INR', desc: 'Indian Rupee'},
    {label: 'RUB', desc: 'Russian Ruble'},
    {label: 'BRL', desc: 'Brazilian Real'},
    {label: 'MXN', desc: 'Mexican Peso'},
    {label: 'CHF', desc: 'Swiss Franc'},
    {label: 'HKD', desc: 'Hong Kong Dollar'},
    {label: 'SGD', desc: 'Singapore Dollar'},
    {label: 'NZD', desc: 'New Zealand Dollar'},
    {label: 'SEK', desc: 'Swedish Krona'},
    {label: 'NOK', desc: 'Norwegian Krone'},
    {label: 'DKK', desc: 'Danish Krone'},
    {label: 'TRY', desc: 'Turkish Lira'},
    {label: 'ZAR', desc: 'South African Rand'},
    {label: 'AED', desc: 'United Arab Emirates Dirham'},
    {label: 'SAR', desc: 'Saudi Riyal'},
    {label: 'IDR', desc: 'Indonesian Rupiah'},
    {label: 'THB', desc: 'Thai Baht'},
    {label: 'PHP', desc: 'Philippine Peso'},
    {label: 'MYR', desc: 'Malaysian Ringgit'},
    {label: 'ILS', desc: 'Israeli Shekel'},
    {label: 'PLN', desc: 'Polish Zloty'},
    {label: 'EGP', desc: 'Egyptian Pound'},
];

const CurrencyOptions2 = Object.values(CurrencyListV2).map((currencyInfo) => {
    return {
        label: currencyInfo.code,
        desc: currencyInfo.desc,
    };
});
