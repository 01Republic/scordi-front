import {memo} from 'react';
import {atom, useRecoilState} from 'recoil';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {billingCycleTypeAtom} from '../atom';

interface BillingCycleTypeInputProps {
    // defaultValue?: BillingCycleOptions;
    // onChange: (billingCycleOption: BillingCycleOptions) => any;
}

// export const billingCycleTypeAtom = atom<BillingCycleOptions>({
//     key: 'billingCycleTypeAtom',
//     default: undefined,
// });

export const BillingCycleTypeInput = memo((props: BillingCycleTypeInputProps) => {
    const [billingCycleType, setBillingCycleType] = useRecoilState(billingCycleTypeAtom);

    return (
        <div className="mb-6">
            <h3 className="text-xl tracking-[0.25px] mb-4">결제 주기</h3>

            <div className="max-w-2xl">
                <ButtonGroupRadio
                    className="!grid-cols-1 md:!grid-cols-4"
                    onChange={(option) => setBillingCycleType(option.value)}
                    defaultValue={billingCycleType}
                    options={[
                        {label: '월간', value: BillingCycleOptions.Monthly},
                        {label: '연간', value: BillingCycleOptions.Yearly},
                        {
                            label: (
                                <span>
                                    일회성 <small>(반복 없음)</small>
                                </span>
                            ),
                            value: BillingCycleOptions.Onetime,
                        },
                        {
                            label: (
                                <span>
                                    무관 <small>(무료 포함)</small>
                                </span>
                            ),
                            value: BillingCycleOptions.None,
                        },
                    ]}
                />
            </div>
        </div>
    );
});
BillingCycleTypeInput.displayName = 'BillingCycleTypeInput';
