import React, {memo} from 'react';
import {CurrencyCode, CurrencyInfoWithExchangeRate} from '^models/Money';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {enterToSpace} from '^components/util/keyDownLikeClick';
import {Check} from 'lucide-react';

interface CurrencySelectModalProps extends ModalProps {
    entries?: CurrencyInfoWithExchangeRate[];
    onChange: (selected: CurrencyInfoWithExchangeRate) => any;
    defaultValue?: string;
}

export const CurrencySelectModal = memo((props: CurrencySelectModalProps) => {
    const {isOpened, onClose, onChange, entries = currencyListV4, defaultValue} = props;

    return (
        <SlideUpModal open={isOpened} onClose={onClose}>
            <h3 className="font-bold text-xl">화폐 단위를 선택해주세요</h3>

            <div className="py-4">
                {entries.map((currency, i) => (
                    <div
                        tabIndex={0}
                        key={i}
                        className="-mx-4 px-4 py-2.5 cursor-pointer group hover:bg-gray-100 flex items-center justify-between rounded-box btn-animation"
                        onKeyDown={enterToSpace(() => onChange && onChange(currency))}
                        onClick={() => onChange && onChange(currency)}
                    >
                        <div>
                            <p className="font-medium text-16">{currency.name}</p>
                            {currency.isDefault ? (
                                <p className="text-14">기본 화폐 단위</p>
                            ) : (
                                <p className="text-14">
                                    1{currency.unit} 당 {currency.exchangeRate.toLocaleString()}원
                                </p>
                            )}
                        </div>
                        <div>{defaultValue && defaultValue === currency.code && <Check className="text-scordi" />}</div>
                    </div>
                ))}
            </div>
        </SlideUpModal>
    );
});
// CurrencySelectModal.displayName = 'CurrencySelectModal';

export const currencyListV4: CurrencyInfoWithExchangeRate[] = [
    {
        name: '원',
        unit: '원',
        code: CurrencyCode.KRW,
        exchangeRate: 1,
        isDefault: true,
    },
    {
        name: 'US 달러',
        unit: '달러',
        code: CurrencyCode.USD,
        exchangeRate: 1268,
        isDefault: false,
    },
    {
        name: '유로',
        unit: '유로',
        code: CurrencyCode.EUR,
        exchangeRate: 1332.68,
        isDefault: false,
    },
    {
        name: '엔',
        unit: '엔',
        code: CurrencyCode.JPY,
        exchangeRate: 9.65,
        isDefault: false,
    },
];
