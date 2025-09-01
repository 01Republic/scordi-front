import React, {memo} from 'react';
import {CreditCardDto} from '^models/CreditCard/type';
import {RotateCw} from 'lucide-react';
import Tippy from '@tippyjs/react';
import {intlDateRangeShort, intlDateShort} from '^utils/dateTime';
import {useOldestCodefBillingHistory} from '^models/CodefBillingHistory/hook';
import {useCodefCardsOfCreditCardShow2} from '^models/CodefCard/hook';
import {Paginated} from '^types/utils/paginated.dto';
import {BillingHistoryDto} from '^models/BillingHistory/type';

interface BillingHistoryTableTitleProps {
    creditCard: CreditCardDto;
    data: Paginated<BillingHistoryDto>;
    isLoading: boolean;
    refetch: () => any;
}

export const BillingHistoryTableTitle = memo((props: BillingHistoryTableTitleProps) => {
    const {creditCard, data, isLoading, refetch} = props;
    const {currentCodefCard} = useCodefCardsOfCreditCardShow2(creditCard.id);
    const {data: oldestBillingHistory} = useOldestCodefBillingHistory(creditCard.organizationId, currentCodefCard?.id);
    const lastBillingHistory = data.items[0];

    const latestDateStr = () => {
        // const {syncedStartDate, syncedEndDate} = creditCard;
        const syncedStartDate = oldestBillingHistory?.usedAt;
        const syncedEndDate = currentCodefCard?.syncedEndDate;

        if (!syncedStartDate && syncedEndDate) {
            const endDateStr = intlDateShort(syncedEndDate, {year: '2-digit'});
            return `${endDateStr} 까지 불러온 결제내역`;
        }

        if (syncedStartDate && syncedEndDate) {
            const dateRangeStr = intlDateRangeShort(syncedStartDate, syncedEndDate, {year: '2-digit'});
            return `${dateRangeStr} 까지 불러온 결제내역`;
        }

        if (!lastBillingHistory) return `아직 결제내역이 없어요`;

        const {issuedAt, paidAt} = lastBillingHistory;
        return paidAt
            ? `${paidAt.getMonth() + 1}월 ${paidAt.getDate()}일 까지의 결제내역`
            : `${issuedAt.getMonth() + 1}월 ${issuedAt.getDate()}일 까지의 결제내역`;
    };

    const {totalItemCount} = data.pagination;

    return (
        <div className="flex items-center gap-2 mb-4">
            <h3 className="text-18">
                <b className="text-scordi">{latestDateStr()}</b>
            </h3>

            <Tippy className="!text-10" content="목록 새로고침">
                <button
                    className={`btn btn-xs btn-circle ${isLoading ? 'animate-spin' : ''}`}
                    onClick={() => refetch()}
                >
                    <RotateCw fontSize={14} />
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
