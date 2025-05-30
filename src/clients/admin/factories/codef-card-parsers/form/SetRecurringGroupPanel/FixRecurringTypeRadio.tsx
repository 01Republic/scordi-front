import React, {memo} from 'react';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {WithChildren} from '^types/global.type';

interface FixRecurringTypeRadioProps {
    defaultChecked?: boolean;
    value: BillingCycleOptions;
    onChange: (value: BillingCycleOptions) => any;
}

export const FixRecurringTypeRadio = memo((props: FixRecurringTypeRadioProps & WithChildren) => {
    const {defaultChecked = false, value, onChange, children} = props;

    return (
        <label className="text-12 flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                name="fixedRecurringType"
                className="radio radio-xs radio-primary"
                defaultChecked={defaultChecked}
                onChange={(e) => e.target.checked && onChange(value)}
            />
            <span className="text-gray-500">{children}</span>
        </label>
    );
});
FixRecurringTypeRadio.displayName = 'FixRecurringTypeRadio';
