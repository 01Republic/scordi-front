import {memo} from 'react';
import {DayGroupedList} from './DayGroupedList';
import {BillingHistoryManager} from '^models/BillingHistory/manager';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {ContentEmpty} from '^v3/share/ContentEmpty';
import {useModal} from '^v3/share/modals';
import {payMethodModalState} from '^v3/share/modals/NewBillingHistoryModal/atoms';

interface BillingHistoryListViewProps {
    billingHistories: BillingHistoryDto[];
}

export const BillingHistoryListView = memo((props: BillingHistoryListViewProps) => {
    const {open} = useModal(payMethodModalState);

    const {billingHistories} = props;
    const groupedHistories = BillingHistoryManager.init(billingHistories)
        .validateToListing()
        .uniqByIdentity()
        .groupByIssuedAtYMD();

    const groupedHistoriesArray = Object.entries(groupedHistories);

    return (
        <ul className="w-full text-left">
            {groupedHistoriesArray.length ? (
                groupedHistoriesArray.map(([date, histories], i) => (
                    <DayGroupedList key={i} date={new Date(date)} entries={histories} showTitle={true} />
                ))
            ) : (
                <ContentEmpty onClick={() => open()} text="등록된 결제 내역이 없어요" subtext="눌러서 결제 내역 추가" />
            )}
        </ul>
    );
});
