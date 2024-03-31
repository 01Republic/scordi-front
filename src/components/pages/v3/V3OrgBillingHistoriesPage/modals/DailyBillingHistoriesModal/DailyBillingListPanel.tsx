import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useBillingListV3} from '^hooks/useBillingList';
import {useCalendar3} from '^hooks/useCalendar';
import {yyyy_mm_dd} from '^utils/dateTime';
import {Spinner} from '^components/util/loading';
import {DayGroupedList} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryListView/DayGroupedList';
import {HistoryItem} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryListView/HistoryItem';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {ScheduleItem} from '^v3/share/modals/BillingHistoryDetailModal/BillingHistoryListView/ScheduleItem';
import {BillingScheduleShallowDto} from '^models/BillingSchedule/type';

export const DailyBillingListPanel = memo(function DailyBillingListPanel() {
    const {selectedDate} = useCalendar3();
    const {isLoadingHistories, isLoadingSchedules, groupedHistories, groupedSchedules} = useBillingListV3();

    if (!selectedDate || isLoadingHistories || isLoadingSchedules) {
        return (
            <MobileSection.Item>
                <MobileSection.Padding>
                    <ul className="w-full text-left">
                        <Spinner size={30} />
                    </ul>
                </MobileSection.Padding>
            </MobileSection.Item>
        );
    }

    const dateKey = yyyy_mm_dd(selectedDate);
    const histories = groupedHistories[dateKey] || [];
    const schedules = groupedSchedules[dateKey] || [];
    const list = [histories, schedules].flat().sort((a, b) => {
        return a.sortKey.getTime() - b.sortKey.getTime();
    });

    return (
        <MobileSection.Item className="border-b-0">
            <MobileSection.Padding>
                <ul className="w-full text-left">
                    {histories.length === 0 && schedules.length === 0 ? (
                        <li className="mb-4 px-0 flex flex-col gap-8 pt-20">
                            <p className="text-center text-xl font-semibold text-gray-500">{dateKey}</p>
                            <p className="text-center text-2xl font-semibold text-gray-400">이 날은 내역이 없네요 :)</p>
                        </li>
                    ) : (
                        <DayGroupedList date={selectedDate} showTitle={true}>
                            {list.map((item, j) => {
                                return Object.hasOwn(item, 'id') ? (
                                    <HistoryItem key={j} entry={item as BillingHistoryDto} showTitle={true} />
                                ) : (
                                    <ScheduleItem key={j} entry={item as BillingScheduleShallowDto} showTitle={true} />
                                );
                            })}
                        </DayGroupedList>
                    )}
                </ul>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
