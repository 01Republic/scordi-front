import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {OutLink} from '^components/OutLink';
import {inputTextToCurrencyFormat} from '^utils/input-helper';
import {CurrencyCode} from '^models/Money';
import {createSubscriptionFormData} from '../../atom';
import {FadeUp} from '../../_common/FadeUp';
import {useCurrentConnectingProduct} from '../../useCurrentConnectingProduct';
import {InputSection} from '../InputSection';
import {PricingTypeSelect} from './PricingTypeSelect';
import {CurrencySelect} from './CurrencySelect';

export const RecurringAmount = memo(() => {
    const {currentConnectingProduct} = useCurrentConnectingProduct();
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);

    return (
        <>
            <InputSection className="max-w-lg">
                <div className="grid grid-cols-8 gap-2 mb-6">
                    <div className="col-span-3">
                        <PricingTypeSelect />
                    </div>

                    <div className="col-span-3">
                        <label>
                            <p className="text-11 text-gray-500 mb-1">결제금액</p>
                            <input
                                type="text"
                                className="input border-gray-200 bg-gray-100 text-16 w-full"
                                placeholder="결제 금액"
                                defaultValue={
                                    formData.currentBillingAmount?.amount
                                        ? formData.currentBillingAmount?.amount.toLocaleString()
                                        : undefined
                                }
                                tabIndex={0}
                                onChange={(e) => {
                                    const amount = inputTextToCurrencyFormat(e);
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
                    </div>

                    <div className="col-span-2">
                        <CurrencySelect />
                    </div>
                </div>

                {currentConnectingProduct?.pricingPageUrl && (
                    <div>
                        <OutLink
                            text="사이트에서 내 플랜 확인하기"
                            href={currentConnectingProduct.pricingPageUrl}
                            className="text-14"
                        />
                    </div>
                )}
            </InputSection>

            <InputSection className="max-w-lg">
                <FadeUp show={!formData.isFreeTier} delay="delay-[100ms]">
                    <div className="form-control">
                        <label className="label cursor-pointer flex items-start justify-between p-0">
                            <div>
                                <h4 className="text-16 font-medium tracking-[0.25px]">계속해서 변경되는 금액</h4>
                                <p className="text-14 tracking-[0.25px] text-gray-500">
                                    사용량 과금과 같이 매번 금액이 조금씩 바뀐다면, <br />
                                    약간의 오차를 감안해 비용 변동 등에 대한 알림을 전해드릴게요.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                // defaultChecked={isFree}
                                onChange={(e) => {
                                    // setIsFree(e.target.checked);
                                }}
                            />
                        </label>
                        {/*사용량 과금과 같이 매번 금액이 조금씩 바뀐다면,*/}
                        {/*약간의 오차를 감안해 비용 변동 등에 대한 알림을 전해드릴게요.*/}
                    </div>
                </FadeUp>
            </InputSection>
        </>
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
