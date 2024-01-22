import React, {memo} from 'react';
import {FormControl} from '^components/util/form-control';
import {useRecoilState} from 'recoil';
import {createBillingHistoryAtom} from '^v3/share/modals/NewBillingHistoryModal/atoms';

export const DateSelectInput = memo(() => {
    const [createBillingHistory, setCreateBillingHistory] = useRecoilState(createBillingHistoryAtom);

    const onChange = (date: Date) => {
        if (!date) return;
        setCreateBillingHistory((prev) => ({...prev, paidAt: date}));
    };
    return (
        <FormControl
            topLeftLabel={
                <p className="flex items-center gap-1">
                    언제 결제하셨나요? <span className="text-red-500 self-center">*</span>
                </p>
            }
        >
            <input
                defaultValue={createBillingHistory.paidAt?.toString()}
                onChange={(e) => onChange(new Date(e.target.value))}
                type="datetime-local"
                className="input input-bordered w-full text-sm font-semibold text-neutral-500"
                max="9999-12-31T23:59"
                min="2000-01-01T00:00"
            />
        </FormControl>
    );
});
