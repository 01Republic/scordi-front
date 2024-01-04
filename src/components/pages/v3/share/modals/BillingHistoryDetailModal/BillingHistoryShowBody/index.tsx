import React, {memo} from 'react';
import {isBillingHistoryEditModeAtom} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {useRecoilValue} from 'recoil';
import {BillingHistoryEditPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryShowBody/BillingHistoryEditPanel';
import {BillingHistoryInformationPanel} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryShowBody/BillingHistoryInformationPanel';
import {useBillingHistoryInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';

export const BillingHistoryShowBody = memo(() => {
    const {isLoading, billingHistory} = useBillingHistoryInModal();
    const isEditMode = useRecoilValue(isBillingHistoryEditModeAtom);

    if (!billingHistory) return <></>;
    return (
        <>
            {isLoading ? (
                <p className="text-center">loading ...</p>
            ) : (
                <>{isEditMode ? <BillingHistoryEditPanel /> : <BillingHistoryInformationPanel />}</>
            )}
        </>
    );
});
