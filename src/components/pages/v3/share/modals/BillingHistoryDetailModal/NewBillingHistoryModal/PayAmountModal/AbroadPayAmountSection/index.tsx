import React, {memo} from 'react';
import {DomesticSelect} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountSection/DomesticSelect';
import {AbroadPayAmount} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayAmountModal/AbroadPayAmountSection/AbroadPayAmount';
import {useRecoilValue} from 'recoil';
import {createBillingHistoryAtom} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';

export const AbroadPayAmountSection = memo(() => {
    const createBillingHistory = useRecoilValue(createBillingHistoryAtom);
    const isDomestic = createBillingHistory.isDomestic;
    return (
        <>
            {/*국내/해외 결제 선택*/}
            <DomesticSelect />
            {/*해외 결제 금액*/}
            {!isDomestic && <AbroadPayAmount />}
        </>
    );
});
