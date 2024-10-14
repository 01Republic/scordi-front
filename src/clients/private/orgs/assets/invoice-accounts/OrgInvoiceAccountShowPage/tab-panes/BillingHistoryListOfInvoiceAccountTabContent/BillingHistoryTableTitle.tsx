import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {useBillingHistoryListOfInvoiceAccount} from '^models/BillingHistory/hook';
import Tippy from '@tippyjs/react';
import {MdRefresh} from 'react-icons/md';
import {intlDateRangeShort, intlDateShort, yyyy_mm} from '^utils/dateTime';

interface BillingHistoryTableTitleProps {
    invoiceAccount: InvoiceAccountDto;
}

export const BillingHistoryTableTitle = memo((props: BillingHistoryTableTitleProps) => {
    const {invoiceAccount} = props;
    const {result, reload, isLoading} = useBillingHistoryListOfInvoiceAccount();

    const lastBillingHistory = result.items[0];

    const latestDateStr = () => {
        const {syncedStartDate, syncedEndDate} = invoiceAccount;
        if (!syncedStartDate && syncedEndDate) {
            const endDateStr = intlDateShort(syncedEndDate, {year: '2-digit'});
            return `${endDateStr} 까지 불러온 청구내역`;
        }

        if (syncedStartDate && syncedEndDate) {
            const dateRangeStr = intlDateRangeShort(syncedStartDate, syncedEndDate, {year: '2-digit'});
            return `${dateRangeStr} 까지 불러온 청구내역`;
        }

        if (!lastBillingHistory) return `아직 청구내역이 없어요`;

        const {issuedAt, paidAt} = lastBillingHistory;
        return paidAt
            ? `${paidAt.getMonth() + 1}월 ${paidAt.getDate()}일 까지의 결제내역`
            : `${issuedAt.getMonth() + 1}월 ${issuedAt.getDate()}일 까지의 청구내역`;
    };

    const {totalItemCount} = result.pagination;

    return (
        <div className="flex items-center gap-2 mb-4">
            <h3 className="text-18">
                <b className="text-scordi">{latestDateStr()}</b>
            </h3>

            <Tippy className="!text-10" content="목록 새로고침">
                <button className={`btn btn-xs btn-circle ${isLoading ? 'animate-spin' : ''}`} onClick={() => reload()}>
                    <MdRefresh fontSize={14} />
                </button>
            </Tippy>

            <div className="ml-auto">
                <div className="text-18 font-semibold text-gray-500">
                    {totalItemCount > 0 ? `전체: ${totalItemCount.toLocaleString()}개` : `조회결과가 없어요`}
                </div>
            </div>
        </div>
    );
});
BillingHistoryTableTitle.displayName = 'BillingHistoryTableTitle';
