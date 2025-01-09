import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {inputTextToCurrencyFormat} from '^utils/input-helper';
import {CurrencyCode} from '^models/Money';
import {createSubscriptionFormData} from '../../atom';

interface RecurringAmountProps {
    defaultValue?: number;
    onChange?: (amount: number) => void;
}

export const RecurringAmount = memo((props: RecurringAmountProps) => {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);

    return (
        <label>
            <p className="text-11 text-gray-500 mb-1">결제금액</p>
            <input
                type="text"
                className="input border-gray-200 bg-gray-100 text-16 w-full"
                placeholder="결제 금액"
                defaultValue={
                    props.defaultValue?.toLocaleString() ?? formData.currentBillingAmount?.amount?.toLocaleString()
                }
                tabIndex={0}
                onChange={(e) => {
                    const amount = inputTextToCurrencyFormat(e);
                    props.onChange?.(amount);
                    setFormData((f) => ({
                        ...f,
                        currentBillingAmount: {
                            amount,
                            currency: f.currentBillingAmount?.currency || CurrencyCode.KRW,
                        },
                    }));
                }}
            />
        </label>
    );
});
RecurringAmount.displayName = 'RecurringAmount';

// const SelectCurrency2 = memo(() => {
//     const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
//     const currencyCode = formData.currentBillingAmount?.currency;
//     const currency = currencyListV4.find((c) => c.code === currencyCode) || currencyListV4[0];
//     const [selectedCurrency, selectCurrency] = useState(currency);
//     const [currencyModalOpened, setCurrencyModalOpened] = useState(false);
//
//     return (
//         <>
//             <div
//                 tabIndex={0}
//                 className="input border-gray-200 bg-gray-100 text-16 flex items-center justify-between cursor-pointer"
//                 onKeyDown={enterToSpace(() => setCurrencyModalOpened(true))}
//                 onClick={() => setCurrencyModalOpened(true)}
//             >
//                 <div>{selectedCurrency.unit}</div>
//                 <FaCaretDown size={14} className="text-gray-400" />
//             </div>
//
//             <CurrencySelectModal
//                 isOpened={currencyModalOpened}
//                 onClose={() => setCurrencyModalOpened(false)}
//                 defaultValue={selectedCurrency.code}
//                 onChange={(selected) => {
//                     selectCurrency(selected);
//                     setFormData((f) => ({
//                         ...f,
//                         currentBillingAmount: {
//                             amount: f.currentBillingAmount?.amount || 0,
//                             currency: selected.code,
//                         },
//                     }));
//                     setCurrencyModalOpened(false);
//                 }}
//             />
//         </>
//     );
// });
