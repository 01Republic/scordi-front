import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {billingHistoriesPageModal} from '^v3/V3OrgBillingHistoriesPage/modals/BillingHistoriesPageModal';

export const CalendarOpenButton = memo(() => {
    const {open: billingHistoriesPageModalOpen} = useModal(billingHistoriesPageModal);

    return (
        <button className="btn btn-sm btn-scordi" onClick={billingHistoriesPageModalOpen}>
            내역
        </button>
    );
});
