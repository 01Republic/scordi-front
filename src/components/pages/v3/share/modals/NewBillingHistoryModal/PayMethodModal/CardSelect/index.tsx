import React, {memo} from 'react';
import {FormControl} from '^components/util/form-control';
import {useCreditCards} from '^models/CreditCard/hook';
import {CreditCardDto} from '^models/CreditCard/type';
import {useSetRecoilState} from 'recoil';
import {createBillingHistoryAtom} from '^v3/share/modals/NewBillingHistoryModal/atoms';
import {CardSelector} from 'src/components/pages/v3/share/Select/CardSelect';

export const CardSelect = memo(() => {
    const setCreateBillingHistory = useSetRecoilState(createBillingHistoryAtom);

    return (
        <FormControl
            topLeftLabel={
                <p className="flex items-center gap-1">
                    어떤 카드로 결제하셨나요? <span className="text-red-500 self-center">*</span>
                </p>
            }
        >
            <CardSelector
                onChange={(creditCardId: number | null) => {
                    if (!creditCardId) return;
                    setCreateBillingHistory((prev) => ({...prev, creditCardId}));
                }}
            />
        </FormControl>
    );
});
