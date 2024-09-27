import {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useCurrentInvoiceAccount} from '../../atom';
import {useBillingHistoryListOfInvoiceAccount} from '^models/BillingHistory/hook';
import {FcVlc} from 'react-icons/fc';

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
            <div className="flex items-center justify-center py-10">
                <div className="flex flex-col items-center justify-center gap-4">
                    <FcVlc fontSize={40} className="opacity-60" />
                    <div className="font-bold text-2xl text-gray-300">공사중이에요</div>
                </div>
            </div>
        </section>
    );
});
