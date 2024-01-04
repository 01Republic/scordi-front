import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {FormControl} from '^components/util/form-control';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {createBillingHistoryAtom} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';

export const DomesticSelect = memo(() => {
    const [createBillingHistory, setCreateBillingHistory] = useRecoilState(createBillingHistoryAtom);

    return (
        <FormControl topLeftLabel="국내 또는 해외 결제 여부를 선택해주세요">
            <ButtonGroupRadio
                onChange={(e) => setCreateBillingHistory((prev) => ({...prev, isDomestic: e.value}))}
                options={[
                    {label: '국내', value: true},
                    {label: '해외', value: false},
                ]}
                defaultValue={createBillingHistory.isDomestic}
            />
        </FormControl>
    );
});
