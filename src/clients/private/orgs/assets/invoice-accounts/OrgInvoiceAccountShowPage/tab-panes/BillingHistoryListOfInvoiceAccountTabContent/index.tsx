import {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useCurrentInvoiceAccount} from '../../atom';
import {useBillingHistoryListOfInvoiceAccount} from '^models/BillingHistory/hook';

export const BillingHistoryListOfInvoiceAccountTabContent = memo(function () {
    const orgId = useRecoilValue(orgIdParamState);
    const {currentInvoiceAccount} = useCurrentInvoiceAccount();
    const {isLoading, isEmptyResult, search, result, reload, movePage, changePageSize, orderBy} =
        useBillingHistoryListOfInvoiceAccount();

    const onReady = () => {
        if (!currentInvoiceAccount) return;
    };

    useEffect(() => {
        onReady();
    }, [currentInvoiceAccount]);

    if (!currentInvoiceAccount) return <></>;

    return (
        <section className="py-4">
            <div>BillingHistoryListOfInvoiceAccountTabContent</div>
        </section>
    );
});
