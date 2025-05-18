import React, {memo, useState} from 'react';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {FixRecurringTypeRadio} from './FixRecurringTypeRadio';

interface FixRecurringTypeHandlerProps {
    onChange: (fixedRecurringType?: BillingCycleOptions) => any;
}

export const FixRecurringTypeHandler = memo((props: FixRecurringTypeHandlerProps) => {
    const {onChange} = props;
    const [recurringTypeFixMode, setRecurringTypeFixMode] = useState(false);

    return (
        <div className="bg-red-50 p-2 rounded-lg flex flex-col gap-2">
            <label className="text-13 flex items-center justify-between gap-2 cursor-pointer">
                <span className="no-selectable">잠깐, 반복주기를 측정하지 않는 서비스인가요?</span>
                <input
                    type="checkbox"
                    className="toggle toggle-xs toggle-primary"
                    onChange={(e) => {
                        const checked = e.target.checked;
                        setRecurringTypeFixMode(checked);
                        if (!checked) onChange(undefined); // reset
                    }}
                />
            </label>
            {recurringTypeFixMode && (
                <div className="grid sm:grid-cols-2">
                    <div>
                        <FixRecurringTypeRadio value={BillingCycleOptions.Onetime} onChange={onChange}>
                            <mark>일회성</mark> 결제로 고정하기
                        </FixRecurringTypeRadio>
                    </div>
                    <div>
                        <FixRecurringTypeRadio value={BillingCycleOptions.None} onChange={onChange}>
                            <mark>일반</mark> 결제로 고정하기
                        </FixRecurringTypeRadio>
                    </div>
                </div>
            )}
        </div>
    );
});
FixRecurringTypeHandler.displayName = 'FixRecurringTypeHandler';
